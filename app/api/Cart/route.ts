import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { upsertCart, getCart, deleteCart } from "@/lib/db/queries";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getCurrentUser(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return null;
  }

  return user;
}

// GET /api/cart - Get the current user's cart
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cart = await getCart(user.id);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

// POST /api/cart - Create or update the current user's cart
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { products } = await req.json();

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: "Invalid products data" },
        { status: 400 }
      );
    }

    const cart = await upsertCart(user.id, products);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error creating/updating cart:", error);
    return NextResponse.json(
      { error: "Failed to create/update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await deleteCart(user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json(
      { error: "Failed to delete cart" },
      { status: 500 }
    );
  }
}
