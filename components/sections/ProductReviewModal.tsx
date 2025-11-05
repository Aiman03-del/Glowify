"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Star } from "lucide-react";
import { Review } from "@/lib/reviews";

function Stars({ value }: { value: number }) {
  const rounded = Math.round(value * 2) / 2; // allow halves visually if needed
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.round(rounded) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  );
}

export default function ProductReviewModal({
  open,
  onClose,
  productName,
  reviews,
}: {
  open: boolean;
  onClose: () => void;
  productName: string;
  reviews: Review[];
}) {
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reviews-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 id="reviews-title" className="font-semibold text-gray-800">
                  Reviews • {productName}
                </h3>
                <button onClick={onClose} aria-label="Close reviews" className="p-1 rounded hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="px-4 py-3 border-b flex items-center gap-3">
                <Stars value={avg} />
                <span className="text-sm text-gray-600">{avg.toFixed(1)} average • {reviews.length} review{reviews.length!==1?"s":""}</span>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center">No reviews yet.</p>
                ) : (
                  reviews.map((r, idx) => (
                    <div key={idx} className="border rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-gray-800">{r.user}</div>
                        <Stars value={r.rating} />
                      </div>
                      <p className="text-sm text-gray-700">{r.comment}</p>
                      <p className="mt-1 text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
