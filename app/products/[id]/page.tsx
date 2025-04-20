import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "./product-detail";
import ProductDetailLoading from "./loading";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  try {
    const id = (await params).id;
    const url = `http://localhost:3000/api/products/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }

    const product = await response.json();

    if (!product) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<ProductDetailLoading />}>
            <ProductDetail product={product} />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
