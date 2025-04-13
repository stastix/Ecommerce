"use server";

export async function registerPayment(amount: number, orderNumber?: string) {
  const params = new URLSearchParams({
    userName: process.env.CLICTOPAY_USERNAME!,
    password: process.env.CLICTOPAY_PASSWORD!,
    orderNumber: orderNumber || Date.now().toString(),
    amount: (amount * 100).toString(),
    currency: "788",
    returnUrl: "https://localhost:3000/payment-success",
    failUrl: "https://localhost:3000/payment-fail",
    description: "Order payment",
    language: "en",
  });

  const res = await fetch(
    "https://test.clictopay.com/payment/rest/register.do",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    }
  );

  const data = await res.json();

  if (!res.ok || !data.formUrl) {
    throw new Error(data?.errorMessage || "Payment registration failed");
  }

  return data;
}
