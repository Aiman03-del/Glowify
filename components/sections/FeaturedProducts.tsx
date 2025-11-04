"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "HydraGlow Serum",
    price: 29,
    image: "/assets/serum.jpg",
  },
  {
    id: 2,
    name: "Rose Radiance Cream",
    price: 35,
    image: "/assets/cream.jpg",
  },
  {
    id: 3,
    name: "Lush Lips Balm",
    price: 15,
    image: "/assets/lip-balm.jpg",
  },
];

export default function FeaturedProducts() {
  const { addToCart } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img src={p.image} alt={p.name} className="w-full h-64 object-cover" />
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
              <p className="text-pink-600 font-bold mb-4">${p.price}</p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => addToCart(p)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
                >
                  Add to Cart
                </button>

                <Link
                  href={`/products/${p.id}`}
                  className="text-sm underline text-pink-600 hover:text-pink-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
