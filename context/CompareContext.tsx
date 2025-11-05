"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface CompareContextType {
  selected: number[]; // product IDs (max 2)
  isSelected: (id: number) => boolean;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("glowify-compare");
      if (raw) setSelected(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("glowify-compare", JSON.stringify(selected));
    } catch {}
  }, [selected]);

  const api: CompareContextType = useMemo(
    () => ({
      selected,
      isSelected: (id) => selected.includes(id),
      toggle: (id) =>
        setSelected((prev) => {
          if (prev.includes(id)) return prev.filter((x) => x !== id);
          if (prev.length >= 2) return [prev[1], id]; // keep most recent one + new
          return [...prev, id];
        }),
      remove: (id) => setSelected((prev) => prev.filter((x) => x !== id)),
      clear: () => setSelected([]),
    }),
    [selected]
  );

  return <CompareContext.Provider value={api}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within a CompareProvider");
  return ctx;
}
