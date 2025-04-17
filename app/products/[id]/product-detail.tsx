"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  Check,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/lib/db/schema";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TND",
  }).format(product.price);

  // Calculate discounted price (20% off)
  const originalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TND",
  }).format(product.price * 1.2);

  const handleAddToCart = () => {
    setIsAdding(true);

    // Add the product to cart (multiple times based on quantity)
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
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

  // Mock product images (in a real app, these would come from the product data)
  const productImages = [
    product.image || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8"
      >
        <button
          onClick={() => router.push("/products")}
          className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </button>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span>{product.category}</span>
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
          {/* Main Image */}
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

          {/* Thumbnail Images */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-4 gap-2"
          >
            {productImages.map((img, index) => (
              <motion.button
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index
                    ? "border-[#c2152a] ring-2 ring-[#c2152a]/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} - view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Product Info */}
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

            {/* Rating */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center mb-4"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Price */}
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
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {product.stock > 0 ? (
                      <Check className="inline-block mr-1 h-4 w-4" />
                    ) : (
                      <X className="inline-block mr-1 h-4 w-4" />
                    )}
                  </span>
                  <span>
                    {product.stock > 0
                      ? `In Stock (${product.stock} available)`
                      : "Out of Stock"}
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Add to Cart */}
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
                  disabled={quantity >= product.stock}
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
                  disabled={product.stock === 0}
                >
                  {isAdding ? (
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex items-center"
                    >
                      Added to Cart
                    </motion.span>
                  ) : product.stock === 0 ? (
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
