"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

function formatCurrency(num: number) {
  return `$${num.toFixed(2)}`;
}

export default function OrderSummary() {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const shipping = subtotal > 0 ? 4.99 : 0; // flat shipping for demo
  const taxRate = 0.06; // 6% tax example
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full md:w-96 bg-white rounded-2xl shadow p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="space-y-3 mb-4">
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">No items in cart</p>
        ) : (
          cart.map((it) => (
            <div key={it.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={it.image || it.images?.[0]} alt={it.name} className="w-12 h-12 rounded object-cover" />
                <div>
                  <p className="text-sm font-medium">{it.name}</p>
                  <p className="text-xs text-gray-500">Qty: {it.quantity || 1}</p>
                </div>
              </div>
              <p className="font-medium">{formatCurrency((it.price || 0) * (it.quantity || 1))}</p>
            </div>
          ))
        )}
      </div>

      <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (6%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-2">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </motion.aside>
  );
}
