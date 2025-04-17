import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center mb-8">
          <Skeleton className="h-5 w-32 mr-2" />
          <Skeleton className="h-5 w-5 mx-2" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-5 mx-2" />
          <Skeleton className="h-5 w-48" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info skeleton */}
          <div className="flex flex-col">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4 mr-1" />
                ))}
              </div>
              <Skeleton className="h-4 w-32 ml-2" />
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-20 w-full mb-6" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-8" />
            <Skeleton className="h-32 w-full mb-6" />
          </div>
        </div>

        {/* Related Products skeleton */}
        <div className="mt-16">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="h-px w-full bg-gray-200 dark:bg-gray-700 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
        </div>
      </div>
    </div>
  );
}
