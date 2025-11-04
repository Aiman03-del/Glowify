"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { mockStripeCharge } from "@/lib/mockStripe";
import { motion } from "framer-motion";
import { toast } from "sonner";

function luhnCheck(cardNumber: string) {
  // remove non-digits
  const digits = cardNumber.replace(/\D/g, "");
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 19); // support up to 19
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

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

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const tax = +(subtotal * 0.06).toFixed(2); // 6% tax
  const total = +(subtotal + shipping + tax).toFixed(2);
  const totalCents = Math.round(total * 100);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (cart.length === 0) {
      setMessage("Cart is empty — add some products first.");
      toast.error("Cart is empty — add some products first.");
      return;
    }
    if (!name || !email || !address) {
      setMessage("Please fill in your shipping details.");
      toast.error("Please fill in your shipping details.");
      return;
    }

    // Normalize inputs
    const plainCard = cardNumber.replace(/\s+/g, "").replace(/[^0-9]/g, "");
    const plainCvc = cardCvc.replace(/\D/g, "");

    // Basic validations
    if (plainCard.length < 12 || plainCard.length > 19 || !luhnCheck(plainCard)) {
      setMessage("Please provide a valid card number.");
      toast.error("Please provide a valid card number.");
      return;
    }
    if (!/^\d{3,4}$/.test(plainCvc)) {
      setMessage("Please provide a valid CVC.");
      toast.error("Please provide a valid CVC.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardExp)) {
      setMessage("Expiry date must be in MM/YY format.");
      toast.error("Expiry date must be in MM/YY format.");
      return;
    }

    setLoading(true);

    try {
      const result = await mockStripeCharge(totalCents, {
        number: plainCard,
        exp: cardExp,
        cvc: plainCvc,
        name,
      });

      if (!result.success) {
        setMessage(`Payment failed: ${result.error}`);
        toast.error(`Payment failed: ${result.error}`);
        setLoading(false);
        return;
      }

      // Success
      setMessage(`Payment succeeded — charge id: ${result.chargeId}`);
      toast.success("Payment succeeded — thank you!");
      clearCart();
      // reset inputs
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
      className="bg-white rounded-2xl shadow p-6 space-y-6 md:flex-1"
    >
      <h3 className="text-lg font-semibold">Shipping Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className="text-sm text-gray-600 mb-1">Full name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="input input-bordered w-full"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-gray-600 mb-1">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full"
            type="email"
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className="text-sm text-gray-600 mb-1">Shipping address</span>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Street, city, postal code, country"
          className="input input-bordered w-full h-24 resize-none"
        />
      </label>

      <h3 className="text-lg font-semibold mt-2">Payment</h3>

      {/* Card visual */}
      <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-300 text-white p-4 shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <div className="text-sm opacity-90">Glowify</div>
          <div className="text-xs opacity-90">Debit • Credit</div>
        </div>
        <div className="mt-6 tracking-widest text-lg font-medium">{cardNumber || "•••• •••• •••• ••••"}</div>
        <div className="flex justify-between items-center mt-4 text-sm">
          <div>
            <div className="text-xs opacity-90">Card holder</div>
            <div className="font-medium">{name || "FULL NAME"}</div>
          </div>
          <div>
            <div className="text-xs opacity-90">Expiry</div>
            <div className="font-medium">{cardExp || "MM/YY"}</div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-3 max-w-md">
        <label className="flex flex-col">
          <span className="text-sm text-gray-600 mb-1">Card number</span>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            className="input input-bordered w-full"
            inputMode="numeric"
            maxLength={23}
          />
        </label>

        <div className="grid grid-cols-3 gap-3">
          <label className="flex flex-col col-span-1">
            <span className="text-sm text-gray-600 mb-1">Expiry</span>
            <input
              value={cardExp}
              onChange={(e) => setCardExp(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              className="input input-bordered w-full"
              maxLength={5}
            />
          </label>

          <label className="flex flex-col col-span-1">
            <span className="text-sm text-gray-600 mb-1">CVC</span>
            <input
              value={cardCvc}
              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              className="input input-bordered w-full"
              inputMode="numeric"
              maxLength={4}
            />
          </label>

          <label className="flex flex-col col-span-1">
            <span className="text-sm text-gray-600 mb-1">Postal</span>
            <input placeholder="ZIP" className="input input-bordered w-full" />
          </label>
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
