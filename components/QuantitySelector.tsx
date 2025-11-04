"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuantitySelector({ onAdd }: { onAdd: (qty: number) => void }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4 mt-6">
      <div className="flex items-center border rounded-full overflow-hidden">
        <button
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
      </div>

      <Button className="bg-pink-600 hover:bg-pink-700 text-white" onClick={() => onAdd(quantity)}>
        Add {quantity} to Cart
      </Button>
    </div>
  );
}
