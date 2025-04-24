"use client";

import type React from "react";
import Image from "next/image";
import { useCallback, useState, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/lib/db/schema";
import Link from "next/link";
import SizeSelectionModal from "./size-selection-modal"; // Import directly for critical component

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  index?: number;
}

const ProductCard = memo(
  ({ product, priority = false, index = 0 }: ProductCardProps) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const [showSizeModal, setShowSizeModal] = useState(false);

    // Format price once to avoid recalculations
    const formattedPrice = new Intl.NumberFormat("en-FR", {
      style: "currency",
      currency: "TND",
    }).format(
      typeof product.price === "string"
        ? Number.parseFloat(product.price)
        : product.price
    );

    // Check if product has sizes
    const needsSize = Array.isArray(product.size) && product.size.length > 0;

    // Optimize add to cart handler
    const handleAddToCart = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (needsSize) {
          // Show size selection modal if product has sizes
          setShowSizeModal(true);
        } else {
          // Add directly to cart if no sizes
          addToCart(product, null);
          setIsAdded(true);

          setTimeout(() => {
            setIsAdded(false);
          }, 1500);
        }
      },
      [addToCart, product, needsSize]
    );

    // Handle modal success
    const handleSizeModalSuccess = () => {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    };

    // Determine if this product should be high priority (first 4 products)
    const isHighPriority = priority || index < 4;

    return (
      <>
        <Card className="group h-full transition-all duration-300 hover:shadow-xl dark:border-gray-700 flex flex-col overflow-hidden rounded-xl">
          <Link
            href={`/products/${product.id}`}
            className="flex flex-col flex-grow"
          >
            <div className="relative w-full pb-[100%] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name || "Product image"}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={isHighPriority}
                loading={isHighPriority ? "eager" : "lazy"}
                fetchPriority={isHighPriority ? "high" : "auto"}
                quality={isHighPriority ? 85 : 60}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
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
            </CardContent>
          </Link>

          {/* Keep button outside of Link to prevent navigation when clicking */}
          <div className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-5 md:pb-5">
            <Button
              className="w-full transition-all duration-300 relative overflow-hidden text-xs sm:text-sm"
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
          </div>
        </Card>

        {/* Size Selection Modal */}
        <SizeSelectionModal
          product={product}
          isOpen={showSizeModal}
          onClose={() => setShowSizeModal(false)}
          onSuccess={handleSizeModalSuccess}
          addToCart={addToCart}
        />
      </>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
