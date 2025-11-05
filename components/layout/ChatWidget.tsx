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
  const [open, setOpen] = useState(false);

  // Optional: if you want to remember last state across refreshes
  useEffect(() => {
    try {
      const remembered = localStorage.getItem("glowify-chat-open");
      if (remembered === "true") setOpen(false); // start closed by default
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("glowify-chat-open", String(open));
    } catch {}
  }, [open]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Chat with Glowify"
        className="fixed bottom-4 right-4 z-30 rounded-full bg-pink-600 text-white shadow-lg px-4 py-3 flex items-center gap-2 hover:bg-pink-700"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Chat with Glowify</span>
        <span className="sm:hidden" aria-hidden>
          💬
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
