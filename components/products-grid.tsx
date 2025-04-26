"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo, useCallback, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "./productCard";

const PRODUCTS_PER_PAGE = 12;

function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-40 w-full rounded-md" />
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

function NoProductsFound({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
        {isLoading ? (
          <div className="h-8 w-8 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {isLoading && "Loading products..."}
      </h3>
    </div>
  );
}

export default function ProductsGrid() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : null;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : null;
  const inStock = searchParams.get("inStock") === "true";

  const queryKey = useMemo(
    () => ["products", { category, minPrice, maxPrice, inStock }],
    [category, minPrice, maxPrice, inStock]
  );

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "200px",
  });

  const buildQueryString = useCallback(
    (pageParam: number) => {
      const params = new URLSearchParams();
      params.append("page", pageParam.toString());
      params.append("limit", PRODUCTS_PER_PAGE.toString());

      if (minPrice !== null) params.append("minPrice", minPrice.toString());
      if (maxPrice !== null) params.append("maxPrice", maxPrice.toString());
      if (inStock) params.append("inStock", "true");

      return params.toString();
    },
    [minPrice, maxPrice, inStock]
  );

  const fetchProducts = useCallback(
    async ({ pageParam = 0 }) => {
      let baseUrl = "/api/products";
      if (category) {
        baseUrl = `/api/products/category/${encodeURIComponent(category)}`;
      }
      const queryString = buildQueryString(pageParam);
      const url = `${baseUrl}?${queryString}`;

      const res = await fetch(url, {
        cache: category ? "no-store" : "force-cache",
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const json = await res.json();
      return json.data || [];
    },
    [category, buildQueryString]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey,
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < PRODUCTS_PER_PAGE ? undefined : allPages.length;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allProducts = useMemo(() => data?.pages.flat() || [], [data]);

  if (status === "error") {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Error loading products
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <NoProductsFound isLoading={true} />;
  }

  if (allProducts.length === 0) {
    return <NoProductsFound isLoading={false} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {allProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className="h-full">
            {index < 8 ? (
              <ProductCard product={product} priority={index < 4} />
            ) : (
              <Suspense fallback={<ProductCardSkeleton />}>
                <ProductCard product={product} />
              </Suspense>
            )}
          </div>
        ))}
      </div>

      {/* Load more trigger element */}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center items-center py-8 w-full">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Loading more products...
              </p>
            </div>
          ) : (
            <div className="h-10 w-full" />
          )}
        </div>
      )}
    </>
  );
}
