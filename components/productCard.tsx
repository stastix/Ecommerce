"use client";

import Image from "next/image";
import type React from "react";
import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/app/context/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState<Record<string, boolean>>(
    {}
  );

  const handleAddToCart = useCallback(
    (e: React.MouseEvent, product: Product) => {
      e.preventDefault(); // Prevent navigation when clicking the button
      e.stopPropagation(); // Prevent event bubbling

      addToCart(product);
      setAddedProducts((prev) => ({
        ...prev,
        [product.id]: true,
      }));

      const timeoutId = setTimeout(() => {
        setAddedProducts((prev) => ({
          ...prev,
          [product.id]: false,
        }));
      }, 1500);

      return () => clearTimeout(timeoutId);
    },
    [addToCart]
  );

  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-xl dark:border-gray-700 flex flex-col overflow-hidden rounded-xl">
      <div className="relative w-full pt-[75%] sm:pt-[100%] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-3 sm:p-4 md:p-5 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2 sm:mb-4 font-medium">
            {product.price}
          </p>
        </div>
        <Button
          className="w-full transition-all duration-300 relative overflow-hidden text-xs sm:text-sm"
          onClick={(e) => handleAddToCart(e, product)}
          variant={addedProducts[product.id] ? "secondary" : "default"}
        >
          {addedProducts[product.id] ? (
            <motion.span
              className="flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Added to Cart
            </motion.span>
          ) : (
            <span className="flex items-center justify-center">
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Add to Cart
            </span>
          )}
          <motion.span
            className={`absolute inset-0 bg-white/20 ${
              addedProducts[product.id] ? "opacity-100" : "opacity-0"
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              addedProducts[product.id]
                ? { scale: 10, opacity: 0 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.8 }}
          />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
