"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  // optional helpers: some product sources use `image` while others use `images` array
  image?: string;
  images?: string[];
}

interface CartItem {
  // unique cart entry id (product id + options)
  cartItemId: string;
  productId: number;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  quantity: number;
  options?: Record<string, string>;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (payload: { product: Product; quantity?: number; options?: Record<string, string> }) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
      const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];
        try {
          const stored = localStorage.getItem("glowify-cart");
          return stored ? (JSON.parse(stored) as CartItem[]) : [];
        } catch (e) {
          console.error("Failed to load cart from localStorage", e);
          return [];
        }
      });
  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("glowify-cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = ({ product, quantity = 1, options }: { product: Product; quantity?: number; options?: Record<string, string> }) => {
    setCart((prev) => {
      const optionsKey = options && Object.keys(options).length ? JSON.stringify(options) : "{}";
      const cartItemId = `${product.id}:${optionsKey}`;

      const exists = prev.find((p) => p.cartItemId === cartItemId);
      if (exists) {
        return prev.map((p) =>
          p.cartItemId === cartItemId ? { ...p, quantity: p.quantity + quantity } : p
        );
      }

      const normalized: CartItem = {
        cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        image: product.image || (product.images ? product.images[0] : undefined),
        quantity,
        options,
      };

      return [...prev, normalized];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((p) => p.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
