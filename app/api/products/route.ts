import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db/queries";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "0", 10);
    const limit = Number.parseInt(searchParams.get("limit") || "12", 10);
    const sortBy = searchParams.get("sort") || "created_at";
    const order = searchParams.get("order") || "desc";

    const from = page * limit;
    const to = from + limit - 1;

    const [productsResponse, countResponse] = await Promise.all([
      supabase
        .from("products")
        .select("id, name, price, image, category, quantity, size")
        .order(sortBy, { ascending: order === "asc" })
        .range(from, to),

      supabase.from("products").select("id", { count: "exact", head: true }),
    ]);

    if (productsResponse.error) {
      console.error("❌ Error fetching products data:", productsResponse.error);
      throw productsResponse.error;
    }

    if (countResponse.error) {
      console.error("❌ Error fetching products count:", countResponse.error);
      throw countResponse.error;
    }

    const result = productsResponse.data || [];
    const count = countResponse.count || 0;

    return NextResponse.json(
      {
        data: result,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
          hasMore: to < count - 1,
        },
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("🔥 Error in GET /api/products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
