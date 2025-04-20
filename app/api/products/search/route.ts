import { type NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/db/queries";

export const runtime = "edge";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse pagination parameters
    const page = Number.parseInt(searchParams.get("page") || "0", 10);
    const limit = Number.parseInt(searchParams.get("limit") || "12", 10);
    const sortBy = searchParams.get("sort") || "created_at";
    const order = searchParams.get("order") || "desc";

    // Use the enhanced getProducts function with pagination
    const result = await getProducts({ page, limit, sortBy, order });

    // Return data with pagination metadata
    return NextResponse.json(
      {
        data: result.data,
        pagination: result.pagination,
      },
      {
        headers: {
          // Add cache control headers
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
