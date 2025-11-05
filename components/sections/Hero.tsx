"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <h1 className="f-text-hero font-bold text-gray-800 mb-6">
          Let Your <span className="text-pink-600">Beauty</span> Glow Naturally
        </h1>
        <p className="f-text-body-lg text-gray-600 mb-8">
          Explore our exclusive collection of skincare and beauty essentials crafted with love and care.
        </p>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 text-lg rounded-full">
          Shop Collection
        </Button>
      </motion.div>

      <motion.img
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        src="/assets/hero-model.jpg"
        alt="Glowify Model"
        className="w-full md:w-1/2 rounded-2xl shadow-lg"
      />
    </section>
  );
}
