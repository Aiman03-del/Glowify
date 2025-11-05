"use client";

import Link from "next/link";
import Image from "next/image";
import { products, type Product } from "@/lib/products";
import { Suspense, useEffect, useMemo, useState } from "react";
import ProductFilterSidebar, { type Filters } from "@/components/sections/ProductFilterSidebar";
import { useSearchParams, useRouter } from "next/navigation";
import ProductReviewModal from "@/components/sections/ProductReviewModal";
import { reviewsByProduct } from "@/lib/reviews";
import { useCompare } from "@/context/CompareContext";
import { Eye } from "lucide-react";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<Product | null>(null);

  const allCategories = useMemo(() => Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[], []);
  const allSkinTypes = useMemo(() => Array.from(new Set(products.flatMap(p => p.skinTypes ?? []))), []);
  const allTags = useMemo(() => Array.from(new Set(products.flatMap(p => p.tags ?? []))), []);
  const allIngredients = useMemo(() => Array.from(new Set(products.flatMap(p => p.ingredients ?? []))), []);

  const priceBounds = useMemo(() => {
    const prices = products.map(p => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, []);

  const [search, setSearch] = useState<string>(() => searchParams.get("q") || "");
  const [filters, setFilters] = useState<Filters>(() => {
    const cats = new Set((searchParams.get("cat") || "").split(",").filter(Boolean));
    const skins = new Set((searchParams.get("skin") || "").split(",").filter(Boolean));
    const tags = new Set((searchParams.get("tag") || "").split(",").filter(Boolean));
    const ings = new Set((searchParams.get("ing") || "").split(",").filter(Boolean));
    const [minS, maxS] = (searchParams.get("price") || "").split("-");
    const min = Number(minS) || priceBounds.min;
    const max = Number(maxS) || priceBounds.max;
    return { categories: cats, skinTypes: skins, tags, ingredients: ings, price: { min, max } } as Filters;
  });

  // push query updates when filters/search change (debounced for search)
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (filters.categories.size) params.set("cat", Array.from(filters.categories).join(","));
      if (filters.skinTypes.size) params.set("skin", Array.from(filters.skinTypes).join(","));
      if (filters.price.min !== priceBounds.min || filters.price.max !== priceBounds.max) {
        params.set("price", `${filters.price.min}-${filters.price.max}`);
      }
      if (filters.tags.size) params.set("tag", Array.from(filters.tags).join(","));
      if (filters.ingredients.size) params.set("ing", Array.from(filters.ingredients).join(","));
      router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
    }, 250);
    return () => clearTimeout(t);
  }, [search, filters, router, priceBounds.min, priceBounds.max]);

  const filtered: Product[] = useMemo(() => {
    return products.filter((p) => {
      // text search
      const q = search.trim().toLowerCase();
      if (q) {
        const hay = `${p.name} ${p.description ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      // category
      if (filters.categories.size && !filters.categories.has(String(p.category))) return false;

      // skin types (match any)
      if (filters.skinTypes.size) {
        const skins = new Set(p.skinTypes ?? []);
        const hasAny = Array.from(filters.skinTypes).some((s) => skins.has(s));
        if (!hasAny) return false;
      }

      // tags (match any within group)
      if (filters.tags.size) {
        const tags = new Set(p.tags ?? []);
        const hasAny = Array.from(filters.tags).some((t) => tags.has(t));
        if (!hasAny) return false;
      }

      // ingredients (match any within group)
      if (filters.ingredients.size) {
        const ings = new Set(p.ingredients ?? []);
        const hasAny = Array.from(filters.ingredients).some((i) => ings.has(i));
        if (!hasAny) return false;
      }

      // price
      if (p.price < filters.price.min || p.price > filters.price.max) return false;

      return true;
    });
  }, [search, filters]);

  const clearFilters = () => {
  setFilters({ categories: new Set(), skinTypes: new Set(), tags: new Set(), ingredients: new Set(), price: { ...priceBounds } } as Filters);
    setSearch("");
  };

  const { selected: compareSelected, toggle: toggleCompare, isSelected: isCompareSelected } = useCompare();

  return (
    <>
      {/* Reviews Modal */}
      <ProductReviewModal
        open={selected != null}
        onClose={() => setSelected(null)}
        productName={selected?.name ?? ""}
        reviews={selected ? reviewsByProduct[selected.id] ?? [] : []}
      />
      {/* Search */}
      <div className="mb-6 flex items-center justify-center">
        <input
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full md:w-1/2 border rounded-full px-4 py-2 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-8">
        <ProductFilterSidebar
          allCategories={allCategories}
          allSkinTypes={allSkinTypes}
          allTags={allTags}
          allIngredients={allIngredients}
          priceBounds={priceBounds}
          filters={filters}
          onChange={setFilters}
          onClear={clearFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col h-full"
            >
              {p.images && p.images[0] && (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  width={800}
                  height={400}
                  loading="lazy"
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2 min-h-7">
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                  <Link
                    href={`/products/${p.id}`}
                    aria-label={`View details: ${p.name}`}
                    title="View details"
                    className="p-1 rounded-full text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                </div>
                <p className="text-pink-600 font-bold mb-2">${p.price}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2 min-h-6">
                  {p.category && <span className="px-2 py-0.5 rounded-full bg-gray-100">{p.category}</span>}
                  {p.skinTypes?.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-full bg-gray-100">{s}</span>
                  ))}
                  {p.tags?.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-100">{t}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4 min-h-14">{p.description}</p>

                <div className="mt-auto flex items-center justify-end gap-4">
                  <button
                    className="text-sm text-pink-600 hover:text-pink-700 underline"
                    aria-label={`See reviews for ${p.name}`}
                    onClick={() => setSelected(p)}
                  >
                    See Reviews
                  </button>
                  <button
                    className={`text-sm underline ${isCompareSelected(p.id) ? "text-green-600 hover:text-green-700" : "text-pink-600 hover:text-pink-700"}`}
                    aria-label={`${isCompareSelected(p.id) ? "Remove from" : "Add to"} compare: ${p.name}`}
                    onClick={() => toggleCompare(p.id)}
                  >
                    {isCompareSelected(p.id) ? "Added" : "Compare"}
                  </button>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No products match your filters.</p>
          )}
        </div>
      </div>
    </>
  );
}
