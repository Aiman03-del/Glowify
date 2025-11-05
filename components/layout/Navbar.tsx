"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center px-6 py-4 bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50"
      >
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="Glowify"
            width={45}
            height={22}
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/products" className="hover:text-pink-600 transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-pink-600 transition">
            About
          </Link>
          <Link
            href="/favorites"
            aria-label="Open favorites"
            className="relative rounded-md border border-pink-600 text-pink-600 px-3 py-1.5 hover:bg-pink-600 hover:text-white transition flex items-center"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Button
            aria-label="Open cart"
            size="sm"
            variant="outline"
            onClick={() => setOpen(true)}
            className="relative border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </motion.nav>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
