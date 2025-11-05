import { Suspense } from "react";
import ProductsClient from "@/components/sections/ProductsClient";
import ProductGridSkeleton from "@/components/sections/ProductGridSkeleton";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
  <h1 className="f-text-h2 font-bold text-center mb-6 text-gray-800">Products</h1>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductsClient />
      </Suspense>
    </main>
  );
}
