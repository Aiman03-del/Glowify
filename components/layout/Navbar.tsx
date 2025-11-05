"use client";

import Link from "next/link";
import { ShoppingBag, Heart, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { openCart } = useUI();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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

  // Listen for auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
    } catch {
      toast.error("Failed to log out");
    }
  };

  // Close on Escape for mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className={`fixed z-50 left-1/2 -translate-x-1/2 top-3 w-[calc(100%-0.5rem)] max-w-7xl transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
  <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center px-5 py-3 bg-white/70 backdrop-blur-md shadow-md rounded-full border border-white/60 gap-2">
  <Link href="/" className="flex items-center gap-3 col-start-1 row-start-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="Glowify"
            width={45}
            height={22}
            className="object-contain"
          />
        </Link>

          {/* Desktop center menu */}
          <div className="hidden md:flex items-center md:justify-self-center gap-4 md:gap-6 md:col-start-2 md:row-start-1 min-w-0">
            <Link href="/" className={`transition ${isActive("/") ? "text-pink-700 " : "hover:text-pink-600"}`}>Home</Link>
            <Link href="/about" className={`transition ${isActive("/about") ? "text-pink-700 " : "hover:text-pink-600"}`}>About</Link>
            <Link href="/products" className={`transition ${isActive("/products") ? "text-pink-700 " : "hover:text-pink-600"}`}>Products</Link>
            <Link href="/contact" className={`transition ${isActive("/contact") ? "text-pink-700 " : "hover:text-pink-600"}`}>Contact</Link>
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center justify-end gap-4 md:justify-self-end md:col-start-3 md:row-start-1">
            <Link
              href="/favorites"
              aria-label="Open favorites"
              aria-current={isActive("/favorites") ? "page" : undefined}
              className={`relative transition ${isActive("/favorites") ? "text-pink-700" : "text-pink-600 hover:text-pink-700"}`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              aria-label="Open cart"
              onClick={openCart}
              className="relative text-pink-600 hover:text-pink-700 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>

            <span className="h-5 w-px bg-pink-200" aria-hidden="true" />

            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-pink-600 hover:text-pink-700 transition"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="px-3 py-1.5 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition"
                >
                  Sign up
                </Link>
                <Link
                  href="/sign-in"
                  aria-label="Login"
                  className="text-pink-600 hover:text-pink-700 transition"
                >
                  <UserIcon className="w-5 h-5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2 col-start-3 row-start-1 justify-self-end">
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-md border text-pink-600 border-pink-600 hover:bg-pink-600 hover:text-white transition"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl p-5 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-pink-600">Glowify</span>
                <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="p-1 rounded hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                <Link href="/" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded ${isActive("/") ? "bg-pink-50 text-pink-700" : "hover:bg-gray-100"}`}>Home</Link>
                <Link href="/about" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded ${isActive("/about") ? "bg-pink-50 text-pink-700" : "hover:bg-gray-100"}`}>About</Link>
                <Link href="/products" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded ${isActive("/products") ? "bg-pink-50 text-pink-700" : "hover:bg-gray-100"}`}>Products</Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded ${isActive("/contact") ? "bg-pink-50 text-pink-700" : "hover:bg-gray-100"}`}>Contact</Link>
                <Link href="/favorites" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded ${isActive("/favorites") ? "bg-pink-50 text-pink-700" : "hover:bg-gray-100"}`}>Favorites</Link>
                {user ? (
                  <button
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                    className="w-full text-left px-3 py-2 rounded border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/sign-in" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded ${isActive("/sign-in") ? "bg-pink-50 text-pink-700" : "hover:bg-gray-100"}`}>Sign in</Link>
                    <Link href="/sign-up" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded ${isActive("/sign-up") ? "bg-pink-50 text-pink-700" : "hover:bg-gray-100"}`}>Sign up</Link>
                  </>
                )}
              </nav>

              <div className="mt-auto space-y-2">
                <button
                  onClick={() => { setMobileOpen(false); openCart(); }}
                  className="w-full border border-pink-600 text-pink-600 rounded-full px-4 py-2 hover:bg-pink-600 hover:text-white transition"
                >
                  Open Cart {cart.length > 0 ? `(${cart.length})` : ""}
                </button>
                <Link
                  href="/favorites"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center border border-pink-600 text-pink-600 rounded-full px-4 py-2 hover:bg-pink-600 hover:text-white transition block"
                >
                  Favorites {wishlist.length > 0 ? `(${wishlist.length})` : ""}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
