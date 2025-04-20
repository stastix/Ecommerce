"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  Check,
  Minus,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/lib/db/schema";
import Link from "next/link";
import RelatedProducts from "./related-products";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSizeError, setShowSizeError] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TND",
  }).format(product.price);

  const originalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TND",
  }).format(product.price * 1.2);

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) {
      setShowSizeError(true);
      return;
    }

    setShowSizeError(false);
    setIsAdding(true);

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }

    // Reset after animation
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isImageZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setMousePosition({ x, y });
  };

  const needsSize = Array.isArray(product.size) && product.size.length > 0;

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8"
      >
        <Link href="/" passHref>
          <button className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors">
            Back to Products
          </button>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/?category=${product.category}`} passHref>
          <span>{product.category}</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </motion.nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div
            className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 cursor-zoom-in"
            onClick={() => setIsImageZoomed(!isImageZoomed)}
            onMouseMove={handleImageMouseMove}
            onMouseLeave={() => setIsImageZoomed(false)}
          >
            <div
              className={`relative w-full h-full transition-all duration-200 ${
                isImageZoomed ? "scale-150" : "scale-100"
              }`}
              style={
                isImageZoomed
                  ? {
                      transformOrigin: `${mousePosition.x * 100}% ${
                        mousePosition.y * 100
                      }%`,
                    }
                  : {}
              }
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {isImageZoomed && (
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                Click to exit zoom
              </div>
            )}
          </div>
          <RelatedProducts
            currentProductId={product.id}
            categoryName={product.category}
          ></RelatedProducts>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="mb-2">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge
                variant="outline"
                className="text-[#c2152a] border-[#c2152a]/30 mb-2"
              >
                {product.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center mb-4"
            ></motion.div>

            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formattedPrice}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {originalPrice}
              </span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 ml-2">
                20% OFF
              </Badge>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {product.description ||
                  "High-quality product designed for performance and comfort. Made with premium materials that ensure durability and style."}
              </p>

              {/* Stock information */}
              <div className="mb-6">
                <p className="text-sm flex items-center">
                  <span
                    className={
                      product.quantity > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {product.quantity > 0 ? (
                      <Check className="inline-block mr-1 h-4 w-4" />
                    ) : (
                      <X className="inline-block mr-1 h-4 w-4" />
                    )}
                  </span>
                  <span>
                    {product.quantity > 0
                      ? `In Stock (${product.quantity} available)`
                      : "Out of Stock"}
                  </span>
                </p>
              </div>
            </motion.div>

            {needsSize && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <Label
                    htmlFor="size-selection"
                    className="text-sm font-medium"
                  >
                    Select Size
                  </Label>
                  <Link
                    href="#size-guide"
                    className="text-xs text-[#c2152a] hover:underline"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.size?.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => {
                        setSelectedSize(size);
                        setShowSizeError(false);
                      }}
                      className={cn(
                        "h-10 px-4 rounded-md",
                        selectedSize === size &&
                          "bg-[#c2152a] hover:bg-[#a01020]"
                      )}
                    >
                      {size}
                    </Button>
                  ))}
                </div>

                {showSizeError && (
                  <div className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Please select a size before adding to cart
                  </div>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-md">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 rounded-l-md"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </motion.button>
                <div className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 flex items-center justify-center min-w-[3rem]">
                  {quantity}
                </div>
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 rounded-r-md"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.quantity}
                >
                  <Plus className="h-4 w-4" />
                </motion.button>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  className="w-full bg-[#c2152a] hover:bg-[#a01020] text-white relative overflow-hidden"
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                >
                  {isAdding ? (
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex items-center"
                    >
                      Added to Cart
                    </motion.span>
                  ) : product.quantity === 0 ? (
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex items-center"
                    >
                      Out of Stock
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex items-center"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </motion.span>
                  )}
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isAdding
                        ? { scale: 10, opacity: 0 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.8 }}
                  />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="flex items-center gap-2"
              >
                <div className="bg-white dark:bg-gray-700 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-[#c2152a]" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Free shipping over $50
                </span>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="flex items-center gap-2"
              >
                <div className="bg-white dark:bg-gray-700 p-2 rounded-full">
                  <RotateCcw className="h-5 w-5 text-[#c2152a]" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  30-day returns
                </span>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="flex items-center gap-2"
              >
                <div className="bg-white dark:bg-gray-700 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-[#c2152a]" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  2-year warranty
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
