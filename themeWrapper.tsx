"use client";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "./app/context/CartContext";
import dynamic from "next/dynamic";

const CartSidebar = dynamic(() => import("./components/CartSidebar"), {
  ssr: false,
});

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <div className="relative z-[9999]">
          <CartSidebar />
        </div>
        {children}
      </CartProvider>
    </ThemeProvider>
  );
}
