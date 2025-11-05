"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const [logoError, setLogoError] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>("/assets/logo.png");

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center px-6 py-4 bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50"
      >
        <Link href="/" className="flex items-center gap-3">
          {!logoError ? (
            // try loading logo from /assets (preferred). if it fails, try /logo.png, then fall back to text
            <img
              src={logoSrc}
              alt="Glowify"
              className="w-20 h-10 object-contain"
              onError={() => {
                if (logoSrc === "/assets/logo.png") {
                  setLogoSrc("/logo.png");
                } else {
                  setLogoError(true);
                }
              }}
            />
          ) : (
            <span className="text-2xl font-bold text-pink-600">Glowify</span>
          )}
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/products" className="hover:text-pink-600 transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-pink-600 transition">
            About
          </Link>
          <Button
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
