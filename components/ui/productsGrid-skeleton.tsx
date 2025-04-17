export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm"
        >
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="p-4">
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 animate-pulse mb-2" />
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 animate-pulse mb-4" />
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
