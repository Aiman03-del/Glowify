"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock, Mail, Shield, ShieldCheck } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { AuthShell } from "@/components/auth/AuthShell";

type PasswordStrength = "weak" | "fair" | "strong";

const strengthCopy: Record<PasswordStrength, { label: string; color: string }> = {
  weak: { label: "Weak — add more characters", color: "bg-pink-200" },
  fair: { label: "Fair — add numbers & symbols", color: "bg-pink-300" },
  strong: { label: "Great — ready to glow!", color: "bg-emerald-500" },
};

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordStrength = useMemo<PasswordStrength>(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return "weak";
    if (score === 2) return "fair";
    return "strong";
  }, [password]);

  const passwordsMatch = confirm.length > 0 && confirm === password;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please provide email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully");
      router.push("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to register. Please try again.";
      setError(message);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Glow starts with your first ritual"
      subtitle="Create your Glowify account to unlock personalized regimens, expert tips, and rewards."
      footer={
        <p>
          Already a member?{" "}
          <Link href="/sign-in" className="font-semibold text-pink-600 transition hover:text-pink-700">
            Sign in
          </Link>
        </p>
      }
      highlight="Glowify Plus"
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-3">
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-xs font-semibold text-pink-600 transition hover:text-pink-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-100">
            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="flex-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Make it memorable & secure"
              required
            />
            <Shield className="h-5 w-5 text-pink-400" aria-hidden="true" />
          </div>
          {password.length > 0 && (
            <div className="space-y-2 rounded-2xl border border-pink-100 bg-pink-50/60 px-4 py-3 text-xs text-gray-600">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                Strength check
              </div>
              <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <span
                  className={cn(
                    "transition-all duration-500",
                    strengthCopy[passwordStrength].color,
                    passwordStrength === "weak" && "w-1/3",
                    passwordStrength === "fair" && "w-2/3",
                    passwordStrength === "strong" && "w-full",
                  )}
                />
              </div>
              <p className="flex items-center gap-2 text-gray-600">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                {strengthCopy[passwordStrength].label}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="confirm" className="text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="text-xs font-semibold text-pink-600 transition hover:text-pink-700"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-100">
            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              id="confirm"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              className="flex-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your password"
              required
            />
            {passwordsMatch && <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />}
          </div>
        </div>

        <ul className="space-y-2 rounded-2xl border border-pink-100 bg-pink-50/60 px-4 py-4 text-xs text-gray-600">
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Minimum 8 characters with upper & lowercase letters.
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Include at least one number or symbol for optimal strength.
          </li>
        </ul>

        {error && (
          <div className="rounded-2xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-pink-200/60 transition hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating..." : "Create my account"}
        </button>
      </form>
    </AuthShell>
  );
}
