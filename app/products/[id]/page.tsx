"use client";

import { Suspense, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "./product-detail";
import ProductDetailLoading from "./loading";
import { Product } from "@/lib/db/schema";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = (await params).id;
        const url = `/api/products/${id}`;
        const response = await fetch(url, {
          next: {
            revalidate: 3600,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product with id ${id}`);
        }

        const productData: Product = await response.json();
        if (!productData) {
          notFound();
        }

        setProduct(productData);
      } catch (error) {
        console.error(error);
        notFound();
      }
    };

    fetchProduct();
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<ProductDetailLoading />}>
          {product && <ProductDetail product={product} />}
        </Suspense>
      </div>
    </div>
  );
}
