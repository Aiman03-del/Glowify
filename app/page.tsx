"use client";

import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import dynamic from "next/dynamic";
import Testimonials from "@/components/sections/Testimonials";

const BeforeAfter = dynamic(() => import("@/components/sections/BeforeAfter"), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BeforeAfter />
      <Testimonials />
      <FeaturedProducts />
    </main>
  );
}
