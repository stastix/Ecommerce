"use client";

import type React from "react";
import Image from "next/image";
import { useCallback, useState, memo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/lib/db/schema";
import SizeSelectionModal from "./size-selection-modal";
import Link from "next/link";
import placeholder from "../public/4619810-200.png";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard = memo(({ product, priority = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const formattedPrice = new Intl.NumberFormat("en-FR", {
    style: "currency",
    currency: "TND",
  }).format(
    typeof product.price === "string"
      ? Number.parseFloat(product.price)
      : product.price
  );

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent navigation from Link
      if (!product.size || !(product.size.length > 0)) {
        addToCart(product, null);
        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
        }, 1500);
      } else {
        setSelectedProduct(product);
        setModalOpen(true);
      }
    },
    [addToCart, product]
  );

  return (
    <>
      <Link href={`/products/${product.id}`} className="block h-full">
        <Card className="group h-full transition-all duration-300 hover:shadow-xl dark:border-gray-700 flex flex-col overflow-hidden rounded-xl">
          <div
            ref={imageRef}
            className="relative w-full pt-[75%] sm:pt-[100%] overflow-hidden bg-gray-100 dark:bg-gray-800"
          >
            <Image
              src={product.image || placeholder}
              alt={product.name || "Product image"}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              quality={80}
              placeholder="empty"
              unoptimized={false}
            />
          </div>
          <CardContent className="p-3 sm:p-4 md:p-5 flex flex-col justify-between flex-grow">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors duration-200">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2 sm:mb-4 font-medium">
                {formattedPrice}
              </p>
            </div>
            <Button
              className="w-full transition-all duration-300 relative overflow-hidden text-xs sm:text-sm z-10"
              onClick={handleAddToCart}
              variant={isAdded ? "secondary" : "default"}
            >
              {isAdded ? (
                <span className="flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Added to Cart
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Add to Cart
                </span>
              )}
            </Button>
          </CardContent>
        </Card>
      </Link>

      {/* Modal rendered outside of the Link */}
      <SizeSelectionModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        addToCart={addToCart}
      />
    </>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
