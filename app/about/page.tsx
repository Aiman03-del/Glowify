import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About • Glowify",
  description: "Learn about Glowify — our mission, ingredients philosophy, and the people behind the glow.",
};

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="f-text-h1 font-bold text-gray-800 mb-4">About Glowify</h1>
          <p className="text-gray-700 mb-4">
            We started Glowify with a simple idea: effective skincare should be gentle, joyful, and
            accessible. Our formulas are thoughtfully crafted to nourish and protect your skin barrier —
            without the fuss.
          </p>
          <p className="text-gray-700 mb-4">
            From everyday cleansers to targeted serums, we obsess over texture, stability, and sourcing.
            Each product is designed to integrate seamlessly into your routine and deliver real results.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
            <li>Dermatologist-informed, sensitive-skin friendly.</li>
            <li>Responsible sourcing and recyclable packaging where possible.</li>
            <li>Fragrance-conscious options and transparent ingredient lists.</li>
          </ul>

          <div className="flex gap-3">
            <Link
              href="/products"
              className="inline-block bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition"
              aria-label="Browse products"
            >
              Shop Products
            </Link>
            <Link
              href="/"
              className="inline-block border border-pink-600 text-pink-600 px-5 py-2 rounded-full hover:bg-pink-600 hover:text-white transition"
              aria-label="Go to home"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/assets/hero-model.jpg"
              alt="Glowify team championing healthy, glowing skin"
              width={900}
              height={700}
              className="w-full h-auto object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="f-text-h3 font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-700">To help you build a routine that you love — simple, effective, and kind to your skin.</p>
        </div>
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="f-text-h3 font-semibold text-gray-800 mb-2">Ingredients</h2>
          <p className="text-gray-700">We prioritize proven actives and barrier-supporting bases, and we avoid unnecessary irritants.</p>
        </div>
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="f-text-h3 font-semibold text-gray-800 mb-2">Community</h2>
          <p className="text-gray-700">Your feedback shapes our roadmap. Tell us what you want to see next — we’re listening.</p>
        </div>
      </section>
    </main>
  );
}
