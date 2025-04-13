"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import {
  X,
  ShoppingCartIcon as CartIcon,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const CartSidebar = () => {
  const {
    cart,
    totalAmount,
    removeFromCart,
    isCartOpen,
    toggleCart,
    updateQuantity,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  const router = useRouter();

  const handlePlusClick = (productId: number) => {
    updateQuantity(productId, 1);
    console.log(productId);
  };

  const handleMinusClick = (productId: number) => {
    updateQuantity(productId, -1);
  };

  const handleCheckoutClick = () => {
    console.log("Checkout clicked");
    router.push("/checkout");
    toggleCart();
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleCart}
        className="fixed bottom-6 right-6 z-10 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        aria-label="Open cart"
      >
        <CartIcon className="h-6 w-6 text-gray-900 dark:text-white" />
        {cart.length > 0 && (
          <Badge
            className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-[#c2152a] text-white text-xs"
            variant="destructive"
          >
            {cart.length}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={toggleCart}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 z-50 overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: isCartOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{ boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.1)" }}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CartIcon className="h-5 w-5" />
              Your Cart
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                ({cart.length} {cart.length === 1 ? "item" : "items"})
              </span>
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 text-gray-900 dark:text-white" />
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto px-4 py-2">
            <AnimatePresence initial={false}>
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center p-6"
                >
                  <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Looks like you havent added any products to your cart yet.
                  </p>
                  <Button variant="outline" onClick={toggleCart}>
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 -mx-4">
                  {cart.map((product) => (
                    <motion.li
                      key={product.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex gap-3">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>

                        <div className="flex-grow min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {product.price}
                          </p>
                          <div className="flex items-center mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-md"
                              onClick={() => handleMinusClick(product.id)}
                              disabled={product.quantity === 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-2 text-sm font-medium text-gray-900 dark:text-white">
                              {product.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-md"
                              onClick={() => handlePlusClick(product.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(product.id)}
                          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 self-start"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Subtotal
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Shipping
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Calculated at checkout
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Total
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <Button
                variant="default"
                className="w-full mt-2 bg-[#c2152a] hover:bg-[#a01020] text-white dark:bg-red-600 dark:hover:bg-red-700"
                disabled={cart.length === 0}
                onClick={handleCheckoutClick}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                className="w-full mt-2 dark:text-gray-300 dark:border-gray-600"
                onClick={toggleCart}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CartSidebar;
