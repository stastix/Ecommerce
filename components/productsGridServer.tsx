"use server";
import { Product } from "@/lib/db/schema";
import ProductsGridClient from "./products-grid";

export default async function ProductsGridServer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const url = category
    ? `${process.env.API_BASE_URL}/api/products/category/${encodeURIComponent(
        category
      )}`
    : `${process.env.API_BASE_URL}/api/products`;

  const res = await fetch(url, { cache: "no-store" }); // Or use revalidate tags
  const products: Product[] = await res.json();

  return (
    <ProductsGridClient
      products={products}
      category={category}
      searchQuery={search}
    />
  );
}
