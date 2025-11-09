"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, Mail, Sparkles } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

import { auth } from "@/lib/firebase";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to log in. Please try again.";
      setError(message);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-6rem)] w-full items-center justify-center bg-gradient-to-b from-pink-50 via-white to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-pink-100/80 bg-white px-6 py-8 shadow-xl shadow-pink-100/70 sm:px-8 sm:py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Sign in to Glowify</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">Welcome back! Enter your details to continue.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-100">
              <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="flex-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-100">
              <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="flex-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-sm font-medium text-pink-600 transition hover:text-pink-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-400" />
              Remember me
            </label>
            <Link href="/contact" className="font-medium text-pink-600 transition hover:text-pink-700">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-pink-200/60 transition hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Sign in
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to Glowify?{" "}
          <Link href="/sign-up" className="font-semibold text-pink-600 transition hover:text-pink-700">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
