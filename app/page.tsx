
import { Suspense } from "react";
import { ProductsGridSkeleton } from "@/components/ui/productsGrid-skeleton";
import nextDynamic from "next/dynamic";
import ProductsFilter from "@/components/products-filter";
const ProductsGrid = nextDynamic(() => import("@/components/products-grid"), {
  loading: () => <ProductsGridSkeleton />,
});

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 tracking-tight">
            Shop Products
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 max-w-2xl">
            Browse our collection of high-quality products designed for style
            and comfort.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Suspense>
            <ProductsFilter />
          </Suspense>

          <div className="flex-1">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
