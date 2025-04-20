"use client";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "./app/context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import dynamic from "next/dynamic";
import { useState } from "react";

const CartSidebar = dynamic(() => import("./components/CartSidebar"), {
  ssr: false,
});
// Create a client with aggressive caching

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 60, // 1 hour
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <div className="relative z-[9999]">
            <CartSidebar />
          </div>
          {children}
        </QueryClientProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
