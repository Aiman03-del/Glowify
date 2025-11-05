"use client";

import Link from "next/link";
import Image from "next/image";
import { useCompare } from "@/context/CompareContext";
import { products } from "@/lib/products";
import { X } from "lucide-react";

export default function CompareBar() {
  const { selected, remove, clear } = useCompare();
  if (selected.length === 0) return null;

  const items = selected
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const url = `/compare?ids=${selected.join(",")}`;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-1rem)] md:w-auto">
      <div className="mx-auto md:mx-0 md:min-w-[580px] bg-white shadow-xl border rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {items.map((p) => (
            <div key={p!.id} className="flex items-center gap-2 border rounded-xl px-2 py-1">
              <Image
                src={p!.images?.[0] || "/assets/hero-model.jpg"}
                alt={p!.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded object-cover"
              />
              <span className="text-sm text-gray-700 max-w-[120px] truncate">{p!.name}</span>
              <button
                onClick={() => remove(p!.id)}
                aria-label={`Remove ${p!.name} from compare`}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={clear} className="text-xs text-gray-500 underline" aria-label="Clear compare list">
            Clear
          </button>
          <Link href={url} className={`px-4 py-2 rounded-full text-white ${selected.length >= 2 ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-300 cursor-not-allowed"}`} aria-disabled={selected.length < 2}>
            Compare {selected.length}/2
          </Link>
        </div>
      </div>
    </div>
  );
}
