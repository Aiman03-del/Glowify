import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Glowify - Cosmetic Store",
  description: "Discover your glow with premium skincare products",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-800">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
