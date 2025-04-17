import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/db/queries";

export async function GET(
  request: Request,
  context: { params: { category: string } }
) {
  try {
    const category = context.params.category;

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    const products = await getProductsByCategory(category);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
