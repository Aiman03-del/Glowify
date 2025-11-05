import Link from "next/link";
import { products } from "@/lib/products";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            {p.images && p.images[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.images[0]} alt={p.name} className="w-full h-64 object-cover" />
            )}

            <div className="p-6">
              <h2 className="text-lg font-semibold mb-1">{p.name}</h2>
              <p className="text-pink-600 font-bold mb-2">${p.price}</p>
              <p className="text-sm text-gray-600 mb-4">{p.description}</p>

              <div className="flex items-center justify-between">
                <Link
                  href={`/products/${p.id}`}
                  className="text-sm underline text-pink-600 hover:text-pink-700"
                >
                  View details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
