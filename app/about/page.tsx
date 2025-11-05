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

      {/* Values */}
      <section className="mt-16">
        <h2 className="f-text-h2 font-bold text-gray-800 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Transparency</h3>
            <p className="text-gray-700">Clear labels, clear intentions — we share what’s inside and why it’s there.</p>
          </div>
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Kindness</h3>
            <p className="text-gray-700">To skin and planet — gentle formulas and mindful packaging choices.</p>
          </div>
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Results</h3>
            <p className="text-gray-700">We aim for meaningful, consistent results you can feel and see.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mt-16">
        <h2 className="f-text-h2 font-bold text-gray-800 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[{ name: "Aiman Khan", role: "Founder & CEO" }, { name: "Rina Nahar", role: "Formulation Lead" }, { name: "Samir Sayeed", role: "Community & Care" }].map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border p-6 shadow-sm text-center">
              <div className="mx-auto mb-3 w-20 h-20 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xl font-bold">
                {t.name.split(" ").map((p) => p[0]).slice(0,2).join("")}
              </div>
              <div className="font-semibold text-gray-800">{t.name}</div>
              <div className="text-sm text-gray-600">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-16">
        <h2 className="f-text-h2 font-bold text-gray-800 mb-6">Our Journey</h2>
        <ol className="relative border-l pl-6">
          {[{ year: "2023", text: "Glowify idea and first lab samples." }, { year: "2024", text: "Beta community and first three products." }, { year: "2025", text: "Full store launch with serums and cleansers." }, { year: "2026", text: "Expanding routines and international shipping." }].map((i) => (
            <li key={i.year} className="mb-6">
              <span className="absolute -left-2 mt-1 w-3 h-3 rounded-full bg-pink-600" aria-hidden />
              <div className="text-sm text-gray-500">{i.year}</div>
              <div className="text-gray-800">{i.text}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="f-text-h2 font-bold text-gray-800 mb-6">FAQ</h2>
        <div className="space-y-3">
          {[
            { q: "Are your products suitable for sensitive skin?", a: "Yes. We formulate for tolerance and recommend patch testing if you’re reactive." },
            { q: "Do you test on animals?", a: "No. We are committed to cruelty-free development." },
            { q: "Where are you based?", a: "We’re based in Bangladesh with partners across the region." },
          ].map((f) => (
            <details key={f.q} className="rounded-xl border p-4 bg-white">
              <summary className="cursor-pointer font-medium text-gray-800 list-none">{f.q}</summary>
              <p className="mt-2 text-gray-700 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <div className="rounded-2xl border shadow-sm bg-pink-50 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="f-text-h3 font-semibold text-pink-700">Ready to build your routine?</h3>
            <p className="text-gray-700">Explore our best-sellers and find your new essentials.</p>
          </div>
          <Link href="/products" className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700">Shop Now</Link>
        </div>
      </section>
    </main>
  );
}
