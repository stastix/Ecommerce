"use client";

import type { Product } from "@/lib/db/schema";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Props = {
  currentProductId: number;
  categoryName: string;
};

async function fetchRelatedProducts(
  category: string,
  excludeId: number
): Promise<Product[]> {
  const res = await fetch(`/api/getRelatedProducts/${category}/${excludeId}`);
  if (!res.ok) throw new Error("Failed to fetch related products");

  const data: Product[] = await res.json();

  const unique = Array.from(new Map(data.map((p) => [p.id, p])).values());
  return unique.filter((p) => p.id !== excludeId).slice(0, 4);
}

export default function RelatedProducts({
  currentProductId,
  categoryName,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const { data: relatedProducts = [], isLoading } = useQuery({
    queryKey: ["relatedProducts", categoryName, currentProductId],
    queryFn: () => fetchRelatedProducts(categoryName, currentProductId),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProducts.length) return null;

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-xl font-semibold">Related Products</h2>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      >
        {relatedProducts.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="block"
            passHref
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                selectedImage === index
                  ? "border-[#c2152a] shadow-lg ring-2 ring-[#c2152a]/30"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name || `Related product ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-sm text-white truncate">{product.name}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
