import { Suspense } from "react";
import ProductsClient from "@/components/sections/ProductsClient";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Products</h1>

      <Suspense fallback={<p className="text-center text-gray-500">Loading filters…</p>}>
        <ProductsClient />
      </Suspense>
    </main>
  );
}
