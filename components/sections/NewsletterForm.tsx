"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterForm({ onSuccess, compact = false }: { onSuccess?: () => void; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (e: string) => /.+@.+\..+/.test(e);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      setLoading(true);
      // Simulate network
      await new Promise((r) => setTimeout(r, 700));
      localStorage.setItem("glowify-newsletter-subscribed", "true");
      toast.success("Thanks for joining Glowify Club! 🎉");
      setEmail("");
      onSuccess?.();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className={`flex ${compact ? "flex-col sm:flex-row gap-2" : "flex-col md:flex-row gap-3"}`}>
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 border rounded-full px-4 py-2 ${compact ? "text-sm" : "text-base"}`}
      />
      <button
        type="submit"
        disabled={loading}
        aria-label="Join Glowify Club"
        className={`rounded-full bg-pink-600 text-white px-5 py-2 hover:bg-pink-700 disabled:opacity-60 ${compact ? "text-sm" : "text-base"}`}
      >
        {loading ? "Joining…" : "Join Now"}
      </button>
    </form>
  );
}
