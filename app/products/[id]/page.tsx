"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { products as productList, type Product } from "@/lib/products";
import QuantitySelector from "@/components/QuantitySelector";
import RelatedProducts from "@/components/sections/RelatedProducts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { reviewsByProduct } from "@/lib/reviews";
import ProductReviewModal from "@/components/sections/ProductReviewModal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useCompare } from "@/context/CompareContext";

export default function ProductPage() {
  const { id } = useParams();
  const product: Product | undefined = productList.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { openCart } = useUI();
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const { isSelected: isCompareSelected, toggle: toggleCompare } = useCompare();

  const [mainImage, setMainImage] = useState<string | undefined>(product?.images?.[0]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    if (product?.variants) {
      Object.entries(product.variants).forEach(([k, vals]) => {
        init[k] = Array.isArray(vals) && vals.length ? String(vals[0]) : "";
      });
    }
    return init;
  });

  if (!product) return <p className="text-center mt-20 text-gray-500">Product not found</p>;

  const category = product.category as string | undefined;
  const categoryPlural = category
    ? ({ Serum: "Serums", Cleanser: "Cleansers", Mask: "Masks" } as Record<string, string>)[category] || `${category}s`
    : undefined;

  return (
    <motion.main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Breadcrumbs */}
      <div className="md:col-span-2 -mt-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            ...(category ? [{ label: categoryPlural || category, href: `/products?cat=${encodeURIComponent(category)}` }] : []),
            { label: product.name },
          ]}
        />
      </div>
      {/* Main Image */}
      <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Image src={mainImage || "/assets/hero-model.jpg"} alt={product.name} width={800} height={800} className="w-full rounded-2xl shadow-lg object-cover mb-4" />
        </motion.div>

        {/* Thumbnail Gallery */}
        <div className="flex gap-3">
          {product.images.map((img, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Image
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={80}
                height={80}
                className={`w-20 h-20 rounded-lg cursor-pointer border ${img === mainImage ? "border-pink-600" : "border-gray-200"}`}
                onClick={() => setMainImage(img)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="f-text-h1 font-bold text-pink-600">{product.name}</h1>
            <Button
              size="icon"
              variant="ghost"
              className={`text-red-500 ${isWishlisted(product.id) ? "fill-current" : ""}`}
              onClick={() =>
                isWishlisted(product.id)
                  ? removeFromWishlist(product.id)
                  : addToWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      images: product.images,
                      image: product.images?.[0],
                      description: product.description,
                      variants: product.variants as unknown as { [key: string]: string[] },
                    })
              }
              aria-label={isWishlisted(product.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className="w-8 h-8" />
            </Button>
          </div>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-pink-600">${product.price}</p>
  </div>

        {/* Variant selectors */}
        {product.variants && (
          <div className="mt-4 space-y-3">
            {Object.entries(product.variants).map(([key, values]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                <select
                  aria-label={`Select ${key}`}
                  value={selectedOptions[key]}
                  onChange={(e) => setSelectedOptions((s) => ({ ...s, [key]: e.target.value }))}
                  className="border rounded px-3 py-2"
                >
                  {(values as string[]).map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Quantity Selector */}
        <QuantitySelector
          onAdd={(qty) => {
            addToCart({ product, quantity: qty, options: selectedOptions });
            toast.success(`${product.name} (${qty}) added to cart`);
            openCart();
          }}
          buttonAriaLabel={`Add ${product.name} to cart`}
        />

        {/* See Reviews */}
        <div className="mt-3">
          <Button
            variant="link"
            className="text-pink-600 hover:text-pink-700 p-0"
            aria-label={`See reviews for ${product.name}`}
            onClick={() => setReviewsOpen(true)}
          >
            See Reviews
          </Button>
          <Button
            variant="link"
            className={`p-0 ml-4 ${isCompareSelected(product.id) ? "text-green-600 hover:text-green-700" : "text-pink-600 hover:text-pink-700"}`}
            aria-label={`${isCompareSelected(product.id) ? "Remove from" : "Add to"} compare: ${product.name}`}
            onClick={() => toggleCompare(product.id)}
          >
            {isCompareSelected(product.id) ? "Added to Compare" : "Add to Compare"}
          </Button>
        </div>
      </div>

      <div className="md:col-span-2">
        <RelatedProducts currentId={product.id} />
      </div>

      {/* Reviews Modal */}
      <ProductReviewModal
        open={reviewsOpen}
        onClose={() => setReviewsOpen(false)}
        productName={product.name}
        reviews={reviewsByProduct[product.id] ?? []}
      />
    </motion.main>
  );
}
