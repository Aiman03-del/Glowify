"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  // optional helpers: some product sources use `image` while others use `images` array
  image?: string;
  images?: string[];
  quantity?: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("glowify-cart");
      if (stored) setCart(JSON.parse(stored));
    } catch (e) {
      // ignore parse errors
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("glowify-cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      const qtyToAdd = product.quantity && product.quantity > 0 ? product.quantity : 1;
      if (exists) {
        // increment existing quantity
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + qtyToAdd } : p
        );
      }

      // normalize stored product: prefer images[0] -> image
      const normalized: Product = {
        ...product,
        quantity: qtyToAdd,
        image: product.image || (product.images ? product.images[0] : undefined),
      };

      return [...prev, normalized];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
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
