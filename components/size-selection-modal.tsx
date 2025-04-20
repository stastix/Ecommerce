"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/db/schema";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";

interface SizeSelectionModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  addToCart: (product: Product, selectedSize: string | null) => void;
}

export default function SizeSelectionModal({
  product,
  isOpen,
  onClose,
  onSuccess,
}: SizeSelectionModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  // Reset state when modal opens with a new product
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }

    // Reset state when modal closes
    if (!open) {
      setSelectedSize(null);
      setShowError(false);
      setIsAdding(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize) {
      setShowError(true);
      return;
    }

    setIsAdding(true);

    // Add to cart with selected size
    addToCart(product, selectedSize);

    // Show success state briefly
    setTimeout(() => {
      setIsAdding(false);
      onSuccess?.();
      onClose();

      // Reset state
      setSelectedSize(null);
      setShowError(false);
    }, 800);
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Select Size</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
              {product.image && (
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  height={64}
                  width={64}
                />
              )}
            </div>
            <div className="ml-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Intl.NumberFormat("en-FR", {
                  style: "currency",
                  currency: "TND",
                }).format(
                  typeof product.price === "string"
                    ? Number.parseFloat(product.price)
                    : product.price
                )}
              </p>
            </div>
          </div>

          {product.size && product.size.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2 justify-center mb-2">
                {product.size.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowError(false);
                    }}
                    className={cn("h-10 px-4 rounded-md")}
                  >
                    {size}
                  </Button>
                ))}
              </div>

              {showError && (
                <div className="mt-2 text-sm text-red-500 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Please select a size
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              No size options available for this product.
            </p>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={onClose} className="sm:w-1/2">
            Cancel
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="sm:w-1/2"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
