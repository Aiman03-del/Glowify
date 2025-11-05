"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/lib/products";

export default function RelatedProducts({ currentId }: { currentId: number }) {
  const related = products.filter((p) => p.id !== currentId).slice(0, 3);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <motion.div className="bg-white rounded-2xl shadow hover:shadow-lg p-4 cursor-pointer" whileHover={{ scale: 1.05 }}>
              <Image src={p.images[0]} alt={p.name} width={600} height={360} loading="lazy" className="w-full h-48 object-cover rounded-xl mb-2" />
              <p className="font-medium text-gray-700">{p.name}</p>
              <p className="font-semibold text-pink-600">${p.price}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
