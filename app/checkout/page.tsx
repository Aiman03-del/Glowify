"use client";

import React from "react";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import RequireAuth from "@/components/auth/RequireAuth";

export default function CheckoutPage() {
  return (
    <RequireAuth>
  <main className="min-h-screen bg-linear-to-b from-pink-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <CheckoutForm />
            </div>

            <div>
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}
