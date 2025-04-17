"use client";
import { Suspense } from "react";
import ProductsGrid from "@/components/products-grid";
import { Skeleton } from "@/components/ui/skeleton";
import ProductsFilter from "@/components/products-filter";

export default function HomePage() {
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
          <ProductsFilter />
          <div className="flex-1">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid  />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm"
        >
          <Skeleton className="w-full h-64" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
