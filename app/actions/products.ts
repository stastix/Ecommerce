"use server";

import { createClient } from "@/app/supabase/server";

export async function fetchProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data;
}
