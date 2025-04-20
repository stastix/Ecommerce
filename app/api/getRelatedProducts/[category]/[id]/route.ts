import { getRelatedProducts } from "@/lib/db/queries";
import { Product } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export const revalidate = 600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; id: number }> }
) {
  try {
    const category = (await params).category;
    const id = (await params).id;

    const products: Product[] = await getRelatedProducts(category, id);
    if (!products) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(products, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("Error in product API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
