import { NextResponse } from "next/server";
import { getCategories } from "@/lib/db/queries";

export async function GET() {
  try {
    const categories = await getCategories();
    const response = NextResponse.json(categories);
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );

    return response;
  } catch (error) {
    console.error("Error in categories API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
