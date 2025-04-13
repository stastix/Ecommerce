"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { registerPayment } from "@/app/actions/registerPayment";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    const router = useRouter();

    try {
      const { formUrl } = await registerPayment(10, "ORDER12345");
      router.push(formUrl);
    } catch (err) {
      console.error("Payment failed:", err);
      setError("Something went wrong with the payment process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page container mx-auto p-4">
      <Card className="max-w-md mx-auto p-6">
        <h3 className="text-center text-2xl font-semibold mb-4">Checkout</h3>

        <div className="order-summary mb-4">
          <p className="font-semibold">Order Number: ORDER12345</p>
          <p>Total: 10 TND</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <p>{error}</p>
          </Alert>
        )}

        <Button
          onClick={handleCheckout}
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? "Processing Payment..." : "Proceed to Payment"}
        </Button>
      </Card>
    </div>
  );
}
