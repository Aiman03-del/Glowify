import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/lib/products";

export default function ComparePage({ searchParams }: { searchParams: { ids?: string } }) {
  const idsParam = searchParams?.ids || "";
  const ids = idsParam.split(",").map((s) => Number(s)).filter((n) => Number.isFinite(n));
  const selected: Product[] = products.filter((p) => ids.includes(p.id)).slice(0, 2) as Product[];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Compare Products</h1>

      {selected.length < 2 ? (
        <div className="text-center text-gray-600">
          <p>You need two products to compare.</p>
          <Link href="/products" className="text-pink-600 underline inline-block mt-2">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {selected.map((p) => (
            <article key={p.id} className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={p.images?.[0] || "/assets/hero-model.jpg"}
                  alt={p.name}
                  width={120}
                  height={120}
                  className="w-24 h-24 rounded object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{p.name}</h2>
                  <p className="text-pink-600 font-bold">${p.price}</p>
                </div>
              </div>

              <dl className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="w-28 text-gray-500">Category</dt>
                  <dd className="text-gray-800">{p.category || "—"}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-28 text-gray-500">Skin Type</dt>
                  <dd className="text-gray-800">{(p.skinTypes || []).join(" • ") || "—"}</dd>
                </div>
                {p.variants && (
                  <div className="flex gap-2">
                    <dt className="w-28 text-gray-500">Variants</dt>
                    <dd className="text-gray-800">
                      {Object.entries(p.variants)
                        .map(([k, v]) => `${k}: ${(v as string[]).join(", ")}`)
                        .join(" • ")}
                    </dd>
                  </div>
                )}
                <div className="flex gap-2">
                  <dt className="w-28 text-gray-500">Description</dt>
                  <dd className="text-gray-800">{p.description}</dd>
                </div>
              </dl>

              <div className="mt-4">
                <Link href={`/products/${p.id}`} className="text-sm underline text-pink-600 hover:text-pink-700">View details</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
