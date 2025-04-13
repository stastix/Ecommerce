"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Product } from "@/data/products";

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  totalAmount: number;
  isCartOpen: boolean;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    });
  };

  const totalAmount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );
  }, [cart]);

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalAmount,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
