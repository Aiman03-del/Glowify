"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const products = [
  {
    id: 1,
    name: "HydraGlow Serum",
    price: 29,
    description:
      "HydraGlow Serum deeply hydrates your skin and enhances natural radiance. Perfect for all skin types.",
    image: "/assets/serum.jpg",
  },
  {
    id: 2,
    name: "Rose Radiance Cream",
    price: 35,
    description:
      "Rose Radiance Cream nourishes your skin while giving a subtle rosy glow. Ideal for daily use.",
    image: "/assets/cream.jpg",
  },
  {
    id: 3,
    name: "Lush Lips Balm",
    price: 15,
    description:
      "Lush Lips Balm moisturizes and protects your lips, leaving them soft and luscious all day.",
    image: "/assets/lip-balm.jpg",
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  if (!product)
    return (
      <p className="text-center mt-20 text-gray-500">Product not found</p>
    );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12"
    >
      {/* Product Image */}
      <motion.img
        src={product.image}
        alt={product.name}
        className="w-full rounded-2xl shadow-lg object-cover"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Product Details */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-between"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-pink-600">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-pink-600">${product.price}</p>
        </div>

        <Button
          className="bg-pink-600 hover:bg-pink-700 text-white mt-6 w-full py-3 text-lg"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </motion.div>
    </motion.main>
  );
}
