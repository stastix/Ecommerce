import { NextResponse } from "next/server";
import { getProductById } from "@/lib/db/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const id = (await params).id;
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Add caching headers for the response
    const response = NextResponse.json(product);

    // Set cache headers
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=3600"
    );

    return response;
  } catch (error) {
    console.error("Error in product API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
