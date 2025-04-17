"use client";

import ProductCard from "@/components/productCard";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/db/schema";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RelatedProducts({
  currentProductId,
  categoryName,
}: {
  currentProductId: number;
  categoryName: string;
}) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch(`/api/category/${categoryName}`);
        const data: Product[] = await res.json();

        const filtered = data
          .filter((product) => product.id !== currentProductId)
          .slice(0, 4);

        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    }

    fetchRelated();
  }, [categoryName, currentProductId]);

  if (relatedProducts.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="mt-16"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        You might also like
      </h2>
      <Separator className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
