import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// This endpoint can be called to revalidate specific paths
// For example, when a product is updated in Supabase
export async function POST(request: NextRequest) {
  try {
    const { path, token } = await request.json();

    // Validate the request
    const expectedToken = process.env.REVALIDATION_TOKEN;
    if (!expectedToken || token !== expectedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Revalidate the path
    revalidatePath(path);

    return NextResponse.json({ revalidated: true, path });
  } catch (error) {
    return NextResponse.json({ error: console.error(error) }, { status: 400 });
  }
}
