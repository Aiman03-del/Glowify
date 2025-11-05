"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { products } from "@/lib/products";
import { toast } from "sonner";
import { useUI } from "@/context/UIContext";
import { Eye } from "lucide-react";

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const { openCart } = useUI();
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which content block is closest to viewport center
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-feature-id]")
    );

    if (!nodes.length) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;
        let closest = 0;
        let minDist = Infinity;
        nodes.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;
          const dist = Math.abs(elCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        setActiveIndex(closest);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // small helper for motion animation when active image changes

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="f-text-h2 font-bold text-center mb-8 text-gray-800">Featured Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left column (lg only): sticky image for active item */}
        <aside className="hidden md:flex sticky top-24 h-[60vh] items-center justify-center order-first md:order-0">
            <div className="w-80 h-80 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full h-full"
              >
                <Image
                  src={products[activeIndex]?.images?.[0] || "/assets/hero-model.jpg"}
                  alt={products[activeIndex]?.name || "Product image"}
                  width={320}
                  height={320}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
        </aside>

        {/* Right column: stacked content (scroll normally) */}
        <div className="space-y-8">
          {products.map((p, index) => (
            <motion.article
              key={p.id}
              data-feature-id
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4, once: false }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              {/* Mobile image (only small screens) */}
              {p.images?.[0] && (
                <div className="md:hidden -mx-6 -mt-6 mb-4">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    width={800}
                    height={480}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                  />
                </div>
              )}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <Link
                  href={`/products/${p.id}`}
                  aria-label={`View details: ${p.name}`}
                  title="View details"
                  className="p-1 rounded-full text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                >
                  <Eye className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-pink-600 font-bold mb-2">${p.price}</p>
              <p className="text-gray-600 mb-4">{p.description}</p>

              <div className="flex items-center gap-3">
                <button
                  aria-label={`Add ${p.name} to cart`}
                  onClick={() => {
                    addToCart({ product: p, quantity: 1 });
                    toast.success(`${p.name} added to cart`);
                    openCart();
                  }}
                  className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
                >
                  Add to Cart
                </button>

                {/* Removed large text link; eye icon near the title now handles navigation */}
              </div>
            </motion.article>
          ))}
        </div>

        
      </div>
    </section>
  );
}
