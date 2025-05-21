"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { cart, toggleCart } = useCart();

  useEffect(() => {
    const checkAuthStatus = async () => {};

    checkAuthStatus();
  }, []);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      router.push("/checkout");
      if (toggleCart) {
        toggleCart();
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      className={`w-full mt-2 bg-[#c2152a] hover:bg-[#a01020] text-white `}
      disabled={isLoading || cart.length === 0}
      onClick={handleCheckout}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Proceed to Checkout
        </>
      )}
    </Button>
  );
}
