"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { products as productList } from "@/lib/products";
import QuantitySelector from "@/components/QuantitySelector";
import RelatedProducts from "@/components/sections/RelatedProducts";
import { toast } from "sonner";

export default function ProductPage() {
  const { id } = useParams();
  const product = productList.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  const [mainImage, setMainImage] = useState<string | undefined>(product?.images?.[0]);

  if (!product) return <p className="text-center mt-20 text-gray-500">Product not found</p>;

  return (
    <motion.main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Main Image */}
      <div>
        <motion.img
          src={mainImage}
          alt={product.name}
          className="w-full rounded-2xl shadow-lg object-cover mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Thumbnail Gallery */}
        <div className="flex gap-3">
          {product.images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 rounded-lg cursor-pointer border ${img === mainImage ? "border-pink-600" : "border-gray-200"}`}
              onClick={() => setMainImage(img)}
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-pink-600">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-pink-600">${product.price}</p>
        </div>

        {/* Quantity Selector */}
        <QuantitySelector
          onAdd={(qty) => {
            addToCart({ ...product, quantity: qty });
            toast.success(`${product.name} (${qty}) added to cart`);
          }}
        />
      </div>

      <div className="md:col-span-2">
        <RelatedProducts currentId={product.id} />
      </div>
    </motion.main>
  );
}
