import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }

  return data || [];
}

export const getCategories = cache(
  async (): Promise<{ category: string }[]> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("category");

      if (error) {
        console.error("Supabase error:", error);
        throw new Error("Failed to fetch categories");
      }

      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      ).map((category) => ({ category }));

      return uniqueCategories;
    } catch (error) {
      console.error("Unexpected error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  }
);
export async function getProductsByCategory(category: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw new Error(`Failed to fetch products in category ${category}`);
  }

  return data || [];
}

export async function getProductById(id: string) {
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

export async function searchProducts(query: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error searching products with query ${query}:`, error);
    throw new Error("Failed to search products");
  }

  return data || [];
}
