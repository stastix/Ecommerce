import { type NextRequest, NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/db/queries";

export const runtime = "edge";

export const revalidate = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const category = (await params).category;

    const page = Number.parseInt(searchParams.get("page") || "0", 10);
    const limit = Number.parseInt(searchParams.get("limit") || "12", 10);
    const sortBy = searchParams.get("sort") || "created_at";
    const order = searchParams.get("order") || "desc";
    const result = await getProductsByCategory(category, {
      page,
      limit,
      sortBy,
      order,
    });
    return NextResponse.json(
      {
        data: result.data,
        pagination: result.pagination,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error(
      `Error fetching products for category ${(await params).category}:`,
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch products by category" },
      { status: 500 }
    );
  }
}
