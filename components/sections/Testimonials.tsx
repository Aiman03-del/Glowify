"use client";

import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  text: string;
  rating?: number;
};

const testimonials: Testimonial[] = [
  { name: "Aisha", text: "HydraGlow changed my routine — skin feels hydrated and bouncy!", rating: 5 },
  { name: "Rafi", text: "Light texture, absorbs so fast. Love the glow.", rating: 4 },
  { name: "Nadia", text: "Gentle on my sensitive skin and smells amazing.", rating: 5 },
  { name: "Imran", text: "Great daily cream. My skin tone looks more even.", rating: 4 },
  { name: "Sara", text: "The lip balm is my winter essential now.", rating: 5 },
  { name: "Lamia", text: "Noticeable results in just a week!", rating: 5 },
  { name: "Tanvir", text: "Berry flavor balm is perfect — not sticky.", rating: 4 },
];

function Row({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  // Duplicate visible items to create a seamless loop
  const loop = [...items, ...items];
  const distance = items.length * 280; // approximate single-set width
  return (
    <div className="overflow-hidden">
      <motion.div
        aria-label="Customer testimonials marquee"
        className="flex gap-4"
        initial={{ x: 0 }}
        animate={{ x: reverse ? distance : -distance }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {loop.map((t, i) => (
          <figure
            key={i}
            className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow p-4 border"
          >
            <blockquote className="text-sm text-gray-700">“{t.text}”</blockquote>
            <figcaption className="mt-3 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-800">{t.name}</span>
              {typeof t.rating === "number" && (
                <span className="text-xs text-yellow-600">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</span>
              )}
            </figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  // Ensure equal number of cards in top and bottom rows
  const base = [...testimonials];
  if (base.length % 2 !== 0) {
    // duplicate last item to make even count
    base.push(base[base.length - 1]);
  }
  const half = base.length / 2;
  const topItems = base.slice(0, half);
  const bottomItems = base.slice(half);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="f-text-h2 font-bold text-center mb-8 text-gray-800">What our customers say</h2>
      <div className="space-y-6">
        <Row items={topItems} />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Row items={bottomItems} reverse />
        </motion.div>
      </div>
    </section>
  );
}
