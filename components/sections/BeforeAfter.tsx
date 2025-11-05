"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export default function BeforeAfter() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Real Results</h2>
      <p className="text-center text-gray-600 mb-8">See the glow — before and after using our skincare.</p>

      <div className="rounded-2xl overflow-hidden shadow-lg">
        <div className="relative">
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src="/assets/compare-2.jpeg" alt="Before skincare results" loading="lazy" />}
            itemTwo={<ReactCompareSliderImage src="/assets/compare-1.jpeg" alt="After skincare results" loading="lazy" />}
            position={50}
            className="w-full h-[380px] md:h-[460px]"
          />

          {/* Labels */}
          <span className="absolute left-3 top-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-700">Before</span>
          <span className="absolute right-3 top-3 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">After</span>
        </div>
      </div>
    </section>
  );
}
