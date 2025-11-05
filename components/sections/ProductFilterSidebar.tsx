"use client";

import { useMemo } from "react";

export type Filters = {
  categories: Set<string>;
  skinTypes: Set<string>;
  price: { min: number; max: number };
};

interface Props {
  allCategories: string[];
  allSkinTypes: string[];
  priceBounds: { min: number; max: number };
  filters: Filters;
  onChange: (next: Filters) => void;
  onClear: () => void;
}

export default function ProductFilterSidebar({
  allCategories,
  allSkinTypes,
  priceBounds,
  filters,
  onChange,
  onClear,
}: Props) {
  const sortedCats = useMemo(() => [...allCategories].sort(), [allCategories]);
  const sortedSkins = useMemo(() => [...allSkinTypes].sort(), [allSkinTypes]);

  function toggleInSet(set: Set<string>, value: string) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  }

  return (
    <aside className="md:sticky md:top-24 bg-white rounded-2xl shadow p-4 md:w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button
          onClick={onClear}
          className="text-sm text-pink-600 hover:text-pink-700 underline"
          aria-label="Clear all filters"
        >
          Clear
        </button>
      </div>

      {/* Category */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
        <div className="space-y-1">
          {sortedCats.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.categories.has(c)}
                onChange={() => onChange({ ...filters, categories: toggleInSet(filters.categories, c) })}
                aria-label={`Filter by category ${c}`}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Type */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Skin Type</p>
        <div className="space-y-1">
          {sortedSkins.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.skinTypes.has(s)}
                onChange={() => onChange({ ...filters, skinTypes: toggleInSet(filters.skinTypes, s) })}
                aria-label={`Filter by skin type ${s}`}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Price Range</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="w-24 border rounded px-2 py-1 text-sm"
            aria-label="Minimum price"
            min={priceBounds.min}
            max={filters.price.max}
            value={filters.price.min}
            onChange={(e) => onChange({ ...filters, price: { ...filters.price, min: Number(e.target.value || priceBounds.min) } })}
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            className="w-24 border rounded px-2 py-1 text-sm"
            aria-label="Maximum price"
            min={filters.price.min}
            max={priceBounds.max}
            value={filters.price.max}
            onChange={(e) => onChange({ ...filters, price: { ...filters.price, max: Number(e.target.value || priceBounds.max) } })}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">${priceBounds.min} – ${priceBounds.max}</p>
      </div>
    </aside>
  );
}
