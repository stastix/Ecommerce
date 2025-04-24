"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";
import { CartProduct } from "@/lib/db/schema";
import { useCart } from "@/app/context/CartContext";
import { supabase } from "@/lib/db/queries";

interface CheckoutButtonProps {
  cartProducts: CartProduct[];
}

export function CheckoutButton({ cartProducts }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { toggleCart } = useCart();

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        localStorage.setItem(
          "pendingCart",
          JSON.stringify({ products: cartProducts })
        );
        router.push(`/login?returnUrl=${encodeURIComponent("/checkout")}`);
        toggleCart();
        return;
      }
      const { data: session } = await supabaseClient.auth.getSession();

      
      const token = session?.session?.access_token;

      if (!token) {
        throw new Error("Authentication token not found");
      }
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ products: cartProducts }),
      });

      if (!response.ok) {
        throw new Error("Failed to save cart");
      }
      router.push("/checkout");
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading || cartProducts.length === 0}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Proceed to Checkout"
      )}
    </Button>
  );
}
