"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const redirected = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user === undefined) return; // still loading first auth state
    if (!user && !redirected.current) {
      redirected.current = true;
      toast.info("Please log in to continue");
  const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
  router.push(`/sign-in${next}`);
    }
  }, [user, pathname, router]);

  if (user === undefined) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="size-4 rounded-full border-2 border-pink-600 border-t-transparent animate-spin inline-block" />
          <span>Checking authentication…</span>
        </div>
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}
