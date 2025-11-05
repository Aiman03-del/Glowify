"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { toast } from "sonner";
import { X } from "lucide-react";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, clearCart } = useCart();

  function formatCurrency(num: number) {
    return `$${num.toFixed(2)}`;
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-pink-600">Your Cart</h2>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-2">
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 px-3 text-left">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                      <p className="text-pink-600 font-bold">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.success(`${item.name} removed from cart`);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <>
                <div className="p-4 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>

                  <Link href="/checkout">
                    <button
                      onClick={() => {
                        onClose();
                      }}
                      className="w-full bg-pink-600 text-white py-2 rounded-full hover:bg-pink-700"
                    >
                      Proceed to Checkout
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      clearCart();
                      toast.success("Cart cleared");
                    }}
                    className="w-full bg-red-100 text-red-600 py-2 rounded-full hover:bg-red-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
