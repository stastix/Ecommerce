"use client";
import ProductCard from "@/components/productCard";
import { Product } from "@/lib/db/schema";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ProductsGridSkeleton } from "./ui/productsGrid-skeleton";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsGrid() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchProducts() {
      const currentCategory = searchParams.get("category") || "";
      try {
        setLoading(true);
        const url = currentCategory
          ? `/api/products/category/${encodeURIComponent(currentCategory)}`
          : "/api/products";

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [searchParams]);

  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  if (loading) {
    return <ProductsGridSkeleton />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
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
          {searchQuery
            ? `We couldn't find any products matching "${searchQuery}".`
            : category
            ? `We couldn't find any products in the "${category}" category.`
            : "We couldn't find any products."}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <Link href={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Skeleton loader for the products grid
