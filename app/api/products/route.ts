import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db/queries";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

function handleApiError(error: Error, message: string) {
  console.error(message, error);
  return NextResponse.json({ error: message }, { status: 500 });
}

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

    // Error handling for the product fetch response
    if (productsResponse.error) {
      return handleApiError(
        productsResponse.error,
        "❌ Error fetching products data"
      );
    }

    // Error handling for the count fetch response
    if (countResponse.error) {
      return handleApiError(
        countResponse.error,
        "❌ Error fetching products count"
      );
    }

    const result = productsResponse.data || [];
    const count = countResponse.count || 0;

    // Enhanced pagination logic with additional details
    const totalPages = Math.ceil(count / limit);
    const hasMore = page < totalPages - 1;

    return NextResponse.json(
      {
        data: result,
        pagination: {
          total: count,
          page,
          limit,
          totalPages,
          hasMore,
        },
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400", // Cache for 1 hour, revalidate after 24 hours
        },
      }
    );
  } catch (error) {
    return handleApiError(error as Error, "🔥 Error in GET /api/products");
  }
}
