import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
import { CartProduct } from "./schema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getCart(userId: string) {
  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Failed to get cart:", error.message);
    throw new Error("Failed to get cart");
  }

  return data;
}

export async function getProductsByCategory(
  category: string,
  { page = 0, limit = 12, sortBy = "created_at", order = "desc" } = {}
) {
  const from = page * limit;
  const to = from + limit - 1;

  const [productsResponse, countResponse] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order(sortBy, { ascending: order === "asc" })
      .range(from, to),

    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("category", category),
  ]);

  if (productsResponse.error) {
    console.error(
      `Error fetching products in category ${category}:`,
      productsResponse.error
    );
    throw new Error(`Failed to fetch products in category ${category}`);
  }

  if (countResponse.error) {
    console.error(
      `Error counting products in category ${category}:`,
      countResponse.error
    );
    throw new Error(`Failed to count products in category ${category}`);
  }

  return {
    data: productsResponse.data || [],
    count: countResponse.count || 0,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil((countResponse.count || 0) / limit),
      hasMore: to < (countResponse.count || 0) - 1,
    },
  };
}

export async function upsertCart(userId: string, products: CartProduct[]) {
  const existingCart = await getCart(userId);

  if (existingCart) {
    return updateCart(userId, products);
  } else {
    return createCart(userId, products);
  }
}

export async function createCart(userId: string, products: CartProduct[]) {
  const { data, error } = await supabase
    .from("carts")
    .insert([
      {
        user_id: userId,
        products: products,
      },
    ])
    .select("*")
    .single();

  if (error) {
    console.error("Failed to create cart:", error.message);
    throw new Error("Cart creation failed");
  }

  return data;
}
export async function deleteCart(userId: string) {
  const { error } = await supabase.from("carts").delete().eq("user_id", userId);

  if (error) {
    console.error("Failed to delete cart:", error.message);
    throw new Error("Cart deletion failed");
  }

  return true;
}

export async function updateCart(userId: string, products: CartProduct[]) {
  const { data, error } = await supabase
    .from("carts")
    .update({ products })
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    console.error("Failed to update cart:", error.message);
    throw new Error("Cart update failed");
  }

  return data;
}

export const getRelatedProducts = cache(
  async (categoryName: string, id: number, limit = 4) => {
    const { data: related, error: relatedError } = await supabase
      .from("products")
      .select("*")
      .eq("category", categoryName)
      .order("created_at", { ascending: false })
      .limit(limit)
      .neq("id", id);

    if (relatedError) {
      console.error("Error fetching related products:", relatedError);
      throw new Error("Failed to fetch related products");
    }

    if (!related || related.length < 4) {
      const { data: fallback, error: fallbackError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit)
        .neq("id", id);

      if (fallbackError) {
        console.error("Error fetching fallback products:", fallbackError);
        throw new Error("Failed to fetch fallback products");
      }

      return fallback || [];
    }

    return related;
  }
);

export const getCategories = cache(async () => {
  try {
    const { data, error } = await supabase.from("products").select("category");

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to fetch categories");
    }

    // remove duplicates
    const uniqueCategories = Array.from(
      new Set(data.map((item) => item.category))
    ).map((category) => ({ category }));

    return uniqueCategories;
  } catch (error) {
    console.error("Unexpected error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
});

export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product ${id}`);
  }

  return data;
}

// Enhanced searchProducts with pagination support
export async function searchProducts(
  query: string,
  { page = 0, limit = 12, sortBy = "created_at", order = "desc" } = {}
) {
  const from = page * limit;
  const to = from + limit - 1;
  const [productsResponse, countResponse] = await Promise.all([
    // Query with pagination and search filter
    supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order(sortBy, { ascending: order === "asc" })
      .range(from, to),

    // Get total count for the search
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`),
  ]);

  if (productsResponse.error) {
    console.error(
      `Error searching products with query ${query}:`,
      productsResponse.error
    );
    throw new Error("Failed to search products");
  }

  if (countResponse.error) {
    console.error(
      `Error counting search results with query ${query}:`,
      countResponse.error
    );
    throw new Error("Failed to count search results");
  }

  return {
    data: productsResponse.data || [],
    count: countResponse.count || 0,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil((countResponse.count || 0) / limit),
      hasMore: to < (countResponse.count || 0) - 1,
    },
  };
}
