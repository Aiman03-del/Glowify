"use client";

import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import dynamic from "next/dynamic";
import Testimonials from "@/components/sections/Testimonials";
import { Leaf, ShieldCheck, Beaker, Truck } from "lucide-react";

const BeforeAfter = dynamic(() => import("@/components/sections/BeforeAfter"), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="f-text-h2 font-bold text-center mb-8 text-gray-800">Why Glowify</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{
            icon: Leaf,
            title: "Gentle by Design",
            text: "Barrier-friendly bases and fragrance-conscious options.",
          }, {
            icon: Beaker,
            title: "Proven Actives",
            text: "Thoughtful levels for meaningful, consistent results.",
          }, {
            icon: ShieldCheck,
            title: "Derm-leaning",
            text: "Formulated with sensitive skin in mind.",
          }, {
            icon: Truck,
            title: "Fast Shipping",
            text: "Quick dispatch and easy returns.",
          }].map((b) => (
            <div key={b.title} className="bg-white rounded-2xl border p-6 shadow-sm">
              <b.icon className="w-6 h-6 text-pink-600" aria-hidden />
              <h3 className="mt-3 font-semibold text-gray-800">{b.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{b.text}</p>
            </div>
          ))}
        </div>
      </section>
      <BeforeAfter />
      <Testimonials />
      <FeaturedProducts />
      {/* CTA banner */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-2xl border shadow-sm bg-pink-50 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="f-text-h3 font-semibold text-pink-700">Save 10% on your first order</h3>
            <p className="text-gray-700">Join Glowify Club and get exclusive deals and tips.</p>
          </div>
          <a href="#newsletter" className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700">Subscribe</a>
        </div>
      </section>
    </main>
  );
}
