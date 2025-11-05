"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Using the same Product type from products.ts, but redefined here for module independence
// In a larger app, this would be in a shared types file.
interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  description?: string;
  variants?: { [key: string]: string[] };
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("glowify-wishlist");
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("glowify-wishlist", JSON.stringify(wishlist));
    } catch (e)
    {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev; // Already exists
      }
      toast.success(`${product.name} added to favorites!`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => {
      const item = prev.find(p => p.id === id);
      if (item) {
        toast.error(`${item.name} removed from favorites.`);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const isWishlisted = (id: number) => {
    return wishlist.some((p) => p.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
