"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const faqs = [
  {
    q: "How long is shipping?",
    a: "Orders typically ship within 1–2 business days. Delivery takes 3–7 business days depending on your location.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return window for unopened products. If something isn’t right, contact support@glowify.com.",
  },
  {
    q: "Is HydraGlow Serum safe for sensitive skin?",
    a: "Yes. It’s formulated to be gentle. We still recommend a patch test first if you have very reactive skin.",
  },
  {
    q: "How can I reach support?",
    a: "Email support@glowify.com or chat with us here during business hours.",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("glowify-chat-open") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("glowify-chat-open", String(open));
    } catch {}
  }, [open]);

  return (
    <>
      {/* Floating Button: icon-only by default, expands on hover/focus */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Chat with Glowify"
        className="group fixed bottom-4 right-4 z-30 rounded-full bg-pink-600 text-white shadow-lg h-12 w-12 overflow-hidden flex items-center justify-center transition-all duration-300 hover:w-48 focus:w-48 hover:bg-pink-700 focus:bg-pink-700"
      >
  <MessageCircle className="w-5 h-5 shrink-0 text-white" aria-hidden />
        <span
          className="ml-2 opacity-0 translate-x-2 whitespace-nowrap transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus:opacity-100 group-focus:translate-x-0"
          aria-hidden
        >
          Chat with Glowify
        </span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 right-0 left-0 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[380px] z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="chat-title"
            >
              <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b bg-pink-50">
                  <h3 id="chat-title" className="font-semibold text-gray-800">
                    💬 Chat with Glowify
                  </h3>
                  <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1 rounded hover:bg-gray-100">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
                  <p className="text-sm text-gray-600">
                    We’re here to help! Check our quick FAQs below. Live chat and AI assistant coming soon.
                  </p>
                  {faqs.map((f, i) => (
                    <details key={i} className="rounded-xl border p-3 group">
                      <summary className="cursor-pointer font-medium text-gray-800 list-none flex items-center justify-between">
                        <span>{f.q}</span>
                        <span className="text-pink-600 ml-2">+</span>
                      </summary>
                      <p className="mt-2 text-sm text-gray-700">{f.a}</p>
                    </details>
                  ))}
                </div>

                <div className="px-4 py-3 border-t text-right">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-sm text-pink-600 hover:text-pink-700 underline"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
