"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import NewsletterForm from "@/components/sections/NewsletterForm";

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const subscribed = localStorage.getItem("glowify-newsletter-subscribed") === "true";
      const dismissed = localStorage.getItem("glowify-newsletter-dismissed") === "true";
      if (subscribed || dismissed) return;
      const t = setTimeout(() => setOpen(true), 2500);
      return () => clearTimeout(t);
    } catch {
      // no-op
    }
  }, []);

  const close = () => {
    setOpen(false);
    try { localStorage.setItem("glowify-newsletter-dismissed", "true"); } catch {}
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 id="newsletter-title" className="font-semibold text-gray-800">Join Glowify Club for 10% off</h3>
                <button onClick={close} aria-label="Close" className="p-1 rounded hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-600">Subscribe to get exclusive deals, skincare tips, and your welcome discount.</p>
                <NewsletterForm onSuccess={() => setOpen(false)} />
                <button
                  onClick={close}
                  className="text-xs text-gray-500 underline"
                  aria-label="No thanks"
                >
                  No thanks
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
