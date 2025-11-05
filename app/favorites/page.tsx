"use client";

import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import RequireAuth from "@/components/auth/RequireAuth";

export default function FavoritesPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <RequireAuth>
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
        <Link href="/products" className="text-pink-600 hover:underline">
          Continue Shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="mx-auto w-16 h-16 text-gray-300" />
          <p className="mt-4 text-gray-500">Your wishlist is empty.</p>
          <p className="text-sm text-gray-400">Add products you love to find them here later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative">
                  <Image
                    src={product.images?.[0] || "/assets/hero-model.jpg"}
                    alt={product.name}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                    <p className="text-pink-600 font-bold">${product.price}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label={`Remove ${product.name} from favorites`}
                  >
                    <Heart className="w-6 h-6 fill-current" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                <Link href={`/products/${product.id}`} className="mt-4 inline-block">
                  <Button>View Product</Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
    </RequireAuth>
  );
}
