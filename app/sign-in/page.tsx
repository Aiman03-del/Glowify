"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please provide email and password.");
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
  const search = typeof window !== "undefined" ? window.location.search : "";
  const next = search ? new URLSearchParams(search).get("next") : null;
  router.push(next || "/");
    } catch (err: any) {
      setError(err?.message || "Failed to log in. Please try again.");
  toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <h1 className="f-text-h1 font-bold text-gray-800 mb-2">Sign in</h1>
      <p className="text-gray-600 mb-6">Welcome back to Glowify.</p>

      <form onSubmit={onSubmit} className="space-y-4 bg-white rounded-2xl border p-6 shadow-sm">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            className="w-full input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            className="w-full input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        New here? <a href="/sign-up" className="text-pink-600 underline">Create an account</a>
      </p>
    </main>
  );
}
