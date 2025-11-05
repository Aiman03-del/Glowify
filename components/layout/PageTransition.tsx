"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();

  // Optional: ensure we start at top on route change after animation begins
  useEffect(() => {
    // Queue to next frame to avoid jumping during exit animation
    const id = requestAnimationFrame(() => {
      if (typeof window !== "undefined") {
        // Use a valid behavior value; "instant" is not part of ScrollBehavior and can throw in some browsers
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Temporarily disable route transition animations to avoid any blank-state edge cases.
  // We can re-enable simple transitions later once fully stable.
  return <div key={pathname}>{children}</div>;
}
