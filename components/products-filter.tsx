"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data.map((item: { category: string }) => item.category));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
    setMobileFiltersOpen(false);
  };

  return (
    <>
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filter
          {selectedCategory && (
            <Badge variant="secondary" className="ml-1">
              1
            </Badge>
          )}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-56 flex-shrink-0">
        <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 className="font-medium text-lg mb-3 text-gray-900 dark:text-white">
            Categories
          </h2>
          <Separator className="mb-3" />

          <div className="space-y-1">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                !selectedCategory
                  ? "bg-[#c2152a]/10 text-[#c2152a] font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              All Products
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-[#c2152a]/10 text-[#c2152a] font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-800 p-4 overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl text-gray-900 dark:text-white">
                Filters
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Separator className="mb-4" />

            <div className="space-y-1">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  !selectedCategory
                    ? "bg-[#c2152a]/10 text-[#c2152a] font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                All Products
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-[#c2152a]/10 text-[#c2152a] font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
