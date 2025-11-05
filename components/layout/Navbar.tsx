"use client";

import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { openCart } = useUI();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      const threshold = 8; // ignore tiny scrolls
      if (Math.abs(delta) > threshold) {
        if (y <= 0) {
          setVisible(true);
        } else if (delta > 0) {
          // scrolling down -> hide
          setVisible(false);
        } else {
          // scrolling up -> show
          setVisible(true);
        }
        lastY.current = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed z-50 left-1/2 -translate-x-1/2 top-3 w-[calc(100%-0.5rem)] max-w-7xl transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-3 bg-white/70 backdrop-blur-md shadow-md rounded-full border border-white/60">
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

          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/" className="hover:text-pink-600 transition">
              Home
            </Link>
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
            onClick={openCart}
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
        </div>
      </nav>

      <CartDrawer />
    </>
  );
}
