"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthShellProps = {
  title: string;
  subtitle: string;
  highlight?: string;
  footer: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AuthShell({
  title,
  subtitle,
  highlight = "Glowify",
  footer,
  children,
  className,
}: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 via-white to-white px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-pink-100/80 bg-white shadow-xl shadow-pink-100/40 sm:rounded-[2.25rem]",
          className,
        )}
      >
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_0.95fr]">
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-pink-100 via-white to-pink-200 lg:flex lg:flex-col">
            <div className="absolute inset-0">
              <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-pink-200/70 blur-[110px]" />
              <div className="absolute bottom-20 right-16 h-52 w-52 rounded-full bg-pink-300/60 blur-[130px]" />
              <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-white/70 blur-[120px]" />
              <div className="absolute top-1/2 left-1/3 h-32 w-32 -translate-y-1/2 rotate-12 rounded-[2.75rem] border border-white/60 bg-white/40 backdrop-blur-md" />
              <div className="absolute top-[18%] right-[18%] h-20 w-20 rounded-full border border-pink-300/70 bg-white/60 backdrop-blur" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between p-8 text-pink-900 xl:p-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-pink-600 shadow-sm shadow-pink-200/50">
                  ✨ Ritual ready
                </span>
                <h2 className="mt-6 text-4xl font-semibold leading-tight text-pink-900 lg:text-5xl">
                  Radiant skin starts with {highlight}
                </h2>
                <p className="mt-4 max-w-md text-base text-pink-900/80">
                  Discover tailored routines, expert insights, and a community championing confident self-care.
                </p>
              </div>
              <div className="space-y-3">
                <blockquote className="rounded-2xl bg-white/80 p-5 text-sm leading-relaxed text-pink-900 shadow-lg shadow-pink-200/50 backdrop-blur">
                  “Glowify completely transformed the way I nurture my skin. The ritual reminders are everything!”
                </blockquote>
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-pink-700">
                  <span className="h-px w-10 bg-pink-400/70" />
                  Loved by 20k+ beauty enthusiasts
                </div>
              </div>
            </div>
          </div>

            <div className="relative flex flex-1 flex-col justify-center bg-white px-5 py-8 sm:px-7 lg:px-10">
            <div className="absolute right-5 top-5 hidden text-sm font-semibold text-pink-500 lg:inline-flex">
              {highlight}
            </div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-600 shadow-sm shadow-pink-100/60 lg:hidden">
              {highlight}
            </div>
            <div className="mx-auto w-full max-w-md space-y-4 sm:space-y-5">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl">{title}</h1>
                <p className="mt-1.5 text-sm text-gray-600 sm:text-base">{subtitle}</p>
              </div>

              <div className="space-y-4 sm:space-y-5">{children}</div>

              <div className="pt-3 text-center text-xs text-gray-600 sm:pt-4 sm:text-sm">{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

