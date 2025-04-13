"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/productCard";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, []);

  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 },
      },
    }),
    []
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="products-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 tracking-tight">
                  Shop Products
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 max-w-2xl">
                  Browse our collection of high-quality products designed for
                  style and comfort.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 md:hidden"
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
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Category Sidebar */}
            <div className="hidden md:block w-56 flex-shrink-0">
              <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <h2 className="font-medium text-lg mb-3 text-gray-900 dark:text-white">
                  Categories
                </h2>
                <Separator className="mb-3" />
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === null
                        ? "bg-[#c2152a]/10 text-[#c2152a] font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    All Products
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                      ({products.length})
                    </span>
                  </button>

                  {categories.map((category) => {
                    const count = products.filter(
                      (p) => p.category === category
                    ).length;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-[#c2152a]/10 text-[#c2152a] font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {category}
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {mobileFiltersOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 z-40 md:hidden"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 25 }}
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
                        onClick={() => {
                          setSelectedCategory(null);
                          setMobileFiltersOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === null
                            ? "bg-[#c2152a]/10 text-[#c2152a] font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        All Products
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                          ({products.length})
                        </span>
                      </button>

                      {categories.map((category) => {
                        const count = products.filter(
                          (p) => p.category === category
                        ).length;
                        return (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setMobileFiltersOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              selectedCategory === category
                                ? "bg-[#c2152a]/10 text-[#c2152a] font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {category}
                            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                              ({count})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Active filters (mobile & desktop) */}
              {selectedCategory && (
                <div className="flex items-center mb-4 bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                    Filters:
                  </span>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-[#c2152a]/10 text-[#c2152a] hover:bg-[#c2152a]/20"
                  >
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="ml-1 rounded-full hover:bg-[#c2152a]/10 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory || "all"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={itemVariants}
                        layout
                      >
                        <Link href={`/products/${product.id}`} passHref>
                          <ProductCard product={product} />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Empty State */}
                  {filteredProducts.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
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
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        We couldnt find any products in this category.
                      </p>
                      <Button
                        onClick={() => setSelectedCategory(null)}
                        className="bg-[#c2152a] hover:bg-[#a01020] text-white"
                      >
                        View all products
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
