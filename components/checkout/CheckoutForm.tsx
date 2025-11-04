"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { mockStripeCharge } from "@/lib/mockStripe";
import { motion } from "framer-motion";

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const tax = +(subtotal * 0.06).toFixed(2); // 6% tax
  const total = +(subtotal + shipping + tax).toFixed(2);
  const totalCents = Math.round(total * 100);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (cart.length === 0) {
      setMessage("Cart is empty — add some products first.");
      return;
    }
    if (!name || !email || !address) {
      setMessage("Please fill in your shipping details.");
      return;
    }

    // Basic card validation (mock-friendly)
    if (cardNumber.length < 12 || cardCvc.length < 3) {
      setMessage("Please provide valid card information.");
      return;
    }

    setLoading(true);

    try {
      const result = await mockStripeCharge(totalCents, {
        number: cardNumber,
        exp: cardExp,
        cvc: cardCvc,
        name,
      });

      if (!result.success) {
        setMessage(`Payment failed: ${result.error}`);
        setLoading(false);
        return;
      }

      // Success
      setMessage(`Payment succeeded — charge id: ${result.chargeId}`);
      clearCart();
      // optionally reset inputs
      setName("");
      setEmail("");
      setAddress("");
      setCardNumber("");
      setCardExp("");
      setCardCvc("");
    } catch (err) {
      setMessage("Unexpected error during payment (mock).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow p-6 space-y-4 md:flex-1"
    >
      <h3 className="text-lg font-semibold">Shipping Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="input input-bordered w-full"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input input-bordered w-full"
        />
      </div>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Shipping address"
        className="input input-bordered w-full h-24 resize-none"
      />

      <h3 className="text-lg font-semibold mt-2">Payment</h3>
      <div className="grid grid-cols-1 gap-3">
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Card number (mock)"
          className="input input-bordered w-full"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            value={cardExp}
            onChange={(e) => setCardExp(e.target.value)}
            placeholder="MM/YY"
            className="input input-bordered w-full"
          />
          <input
            value={cardCvc}
            onChange={(e) => setCardCvc(e.target.value)}
            placeholder="CVC"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="text-sm text-gray-600">Total to charge</p>
          <p className="text-xl font-semibold text-pink-600">${total.toFixed(2)}</p>
        </div>

        <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white" disabled={loading}>
          {loading ? "Processing..." : "Pay now"}
        </Button>
      </div>

      {message && (
        <div className="text-sm p-3 rounded-md bg-gray-50 border">
          <p>{message}</p>
        </div>
      )}

      <p className="text-xs text-gray-400">This is a mock payment — no real charges will occur.</p>
    </motion.form>
  );
}

// Note: input/input-bordered classes are left as simple Tailwind utilities assuming daisyUI/shadcn; adapt if you use a different design system.
