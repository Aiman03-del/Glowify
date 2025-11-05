import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Glowify - Cosmetic Store",
  description: "Discover your glow with premium skincare products",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Momo+Trust+Display&display=swap" rel="stylesheet" />
      </head>
  <body suppressHydrationWarning className="min-h-screen bg-linear-to-b from-pink-50 to-white text-gray-800">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            {/* Sonner Toaster (positioned bottom-left) */}
            <Toaster position="bottom-left" />
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
