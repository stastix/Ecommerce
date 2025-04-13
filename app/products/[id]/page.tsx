"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/app/context/CartContext";
import { products, type Product } from "@/data/products";
import ProductCard from "@/components/productCard";

// Size options based on category
const sizeOptions = {
  Clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  Footwear: ["38", "39", "40", "41", "42", "43", "44", "45"],
};

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get related products (same category, excluding current product)
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find((p) => p.id === Number(params.id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default size if applicable
      if (foundProduct.category in sizeOptions) {
        setSelectedSize(null); // Reset size when product changes
      }
    } else {
      // Redirect to products page if product not found
      router.push("/products");
    }
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.category in sizeOptions && !selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 3000);
      return;
    }

    setIsAdding(true);

    // Add the product to cart (multiple times based on quantity)
    for (let i = 0; i < quantity; i++) {
      // Include selected size in the product data
      addToCart({
        ...product,
        selectedSize: selectedSize,
      });
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Mock product images (in a real app, these would come from the product data)
  const productImages = [
    product.image || "/placeholder.svg",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ];

  // Check if product category has size options
  const hasSizes = product.category in sizeOptions;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
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
                  src={productImages[selectedImage] || "/placeholder.svg"}
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
              ></motion.div>

              {/* Price */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {product.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  {typeof product.price === "string"
                    ? product.price.replace(
                        /\$(\d+(\.\d+)?)/,
                        (_, num) =>
                          `$${(Number.parseFloat(num) * 1.2).toFixed(2)}`
                      )
                    : product.price}
                </span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 ml-2">
                  20% OFF
                </Badge>
              </motion.div>

              {/* Short Description */}
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 dark:text-gray-300 mb-6"
              >
                High-quality product designed for performance and comfort. Made
                with premium materials that ensure durability and style.
              </motion.p>

              {/* Size Selection */}
              <AnimatePresence>
                {hasSizes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Size
                      </span>
                      {showSizeError && (
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-[#c2152a]"
                        >
                          Please select a size
                        </motion.span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {sizeOptions[
                        product.category as keyof typeof sizeOptions
                      ]?.map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-3 rounded-md text-sm font-medium border transition-all ${
                            selectedSize === size
                              ? "border-[#c2152a] bg-[#c2152a]/5 text-[#c2152a]"
                              : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          {size}
                          {selectedSize === size && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-1 inline-flex"
                            >
                              <Check className="h-3 w-3" />
                            </motion.span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                    -
                  </motion.button>
                  <div className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 flex items-center justify-center min-w-[3rem]">
                    {quantity}
                  </div>
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 rounded-r-md"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
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
                  >
                    {isAdding ? (
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex items-center"
                      >
                        Added to Cart
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

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>

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

              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-6"
              >
                <h2 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  Description
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  This premium product is designed to provide exceptional
                  performance and comfort. Made with high-quality materials, it
                  offers durability and style for everyday use. The ergonomic
                  design ensures a comfortable experience, while the sleek
                  aesthetics make it a perfect addition to your collection.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  Features include advanced technology for improved performance,
                  premium materials for durability, and a stylish design that
                  stands out from the competition.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
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
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
