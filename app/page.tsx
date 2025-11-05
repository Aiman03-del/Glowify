"use client";

import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import dynamic from "next/dynamic";

const BeforeAfter = dynamic(() => import("@/components/sections/BeforeAfter"), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BeforeAfter />
      <FeaturedProducts />
    </main>
  );
}
