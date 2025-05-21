"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalAmount } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          onClick={() => router.push("/products")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Order Summary */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold">
                  Order Summary
                </CardTitle>
                <CardDescription>
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your
                  cart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.length > 0 ? (
                    <>
                      {cart.map((item, index) => (
                        <div
                          key={`${index}`}
                          className="flex justify-between items-center py-2"
                        >
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-800 mr-4"></div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Qty: 1
                              </p>
                            </div>
                          </div>
                          <p className="font-medium">{item.price}</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-center py-6 text-gray-500 dark:text-gray-400">
                      Your cart is empty
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Separator className="mb-4" />
                <div className="w-full space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tax
                    </span>
                    <span>${(totalAmount * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      ${(totalAmount + totalAmount * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Demo End Message */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">
                  Demo Complete
                </CardTitle>
                <CardDescription>This is the end of this demo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Thank you for exploring my e-commerce demo. This project was
                  created for a client and showcases the core functionality of
                  an online store.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  In a real implementation, this checkout page would include:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-1 mb-4">
                  <li>Payment processing integration</li>
                  <li>Address collection and validation</li>
                  <li>Shipping options</li>
                  <li>Order confirmation</li>
                </ul>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  For more information or job offers, please contact me.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      router.push("/");
                    }, 500);
                  }}
                >
                  Return to Home
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is a demo project created for a client. No actual purchases
            will be processed.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link
              href="/"
              className="text-sm text-primary hover:underline flex items-center"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to Home
            </Link>
            <Link
              href="/products"
              className="text-sm text-primary hover:underline flex items-center"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>

      {isAnimating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-primary z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white text-center"
          >
            <CheckCircle2 className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Demo Complete</h2>
            <p className="mt-2">Thank you for exploring our e-commerce demo!</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
