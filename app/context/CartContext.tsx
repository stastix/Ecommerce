"use client";
import { CartProduct, Product } from "@/lib/db/schema";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

type CartContextType = {
  cart: CartProduct[];
  addToCart: (product: Product, selectedSize: string | null) => void;
  removeFromCart: (productId: number) => void;
  totalAmount: number;
  isCartOpen: boolean;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, selectedSize: string | null) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) =>
          item.productId === product.id && item.selectedSize === selectedSize
      );

      if (existingProduct) {
        // If the product already exists, just increase its quantity
        return prevCart.map((item) =>
          item.productId === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: CartProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          selectedSize,
          category: "",
          productId: 0,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };
  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    });
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
