"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    router.replace(`/sign-in${search || ""}`);
  }, [router]);

  return null;
}
