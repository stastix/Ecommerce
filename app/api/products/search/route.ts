import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/db/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await searchProducts(query);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error in search API route:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
