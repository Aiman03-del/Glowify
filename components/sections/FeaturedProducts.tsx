"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { products } from "@/lib/products";
import { toast } from "sonner";

export default function FeaturedProducts() {
  const { addToCart } = useCart();
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
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left column: sticky image for active item */}
  <aside className="sticky top-24 h-[60vh] flex items-center justify-center order-first md:order-0">
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
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-pink-600 font-bold mb-2">${p.price}</p>
              <p className="text-gray-600 mb-4">{p.description}</p>

              <div className="flex items-center gap-3">
                <button
                  aria-label={`Add ${p.name} to cart`}
                  onClick={() => {
                    addToCart(p);
                    toast.success(`${p.name} added to cart`);
                  }}
                  className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
                >
                  Add to Cart
                </button>

                <Link href={`/products/${p.id}`} className="text-sm underline text-pink-600 hover:text-pink-700">
                  View Details
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        
      </div>
    </section>
  );
}
