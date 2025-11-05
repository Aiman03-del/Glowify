import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <p className="text-sm font-medium text-pink-600 mb-2">404</p>
        <h1 className="f-text-h1 font-bold text-gray-800 mb-3">Page not found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you’re looking for doesn’t exist or was moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-pink-600 text-white px-5 py-2 hover:bg-pink-700 transition"
            aria-label="Go to homepage"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-pink-600 text-pink-600 px-5 py-2 hover:bg-pink-600 hover:text-white transition"
            aria-label="Browse products"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
