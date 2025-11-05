export const metadata = {
  title: "Contact • Glowify",
  description: "Get in touch with Glowify. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="f-text-h1 font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-gray-700 mb-8">Have a question or feedback? Send us a message and we’ll get back to you.</p>

      {/* Contact info cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1">Email</h2>
          <p className="text-sm text-gray-700 mb-2">support@glowify.com</p>
          <a href="mailto:support@glowify.com" className="text-pink-600 underline text-sm">Send an email</a>
        </div>
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1">Phone</h2>
          <p className="text-sm text-gray-700 mb-2">+880-1234-567890</p>
          <span className="text-xs text-gray-500">Mon–Fri, 10:00–18:00</span>
        </div>
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1">Address</h2>
          <p className="text-sm text-gray-700">Dhaka, Bangladesh</p>
          <p className="text-xs text-gray-500">Visits by appointment only</p>
        </div>
      </section>

      <form className="space-y-4 bg-white rounded-2xl border p-6 shadow-sm max-w-3xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
          <input id="name" name="name" type="text" className="w-full input input-bordered" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="w-full input input-bordered" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} className="w-full input input-bordered" placeholder="How can we help?" />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700">Send Message</button>
          <a href="mailto:support@glowify.com" className="border border-pink-600 text-pink-600 px-5 py-2 rounded-full hover:bg-pink-600 hover:text-white">Email us</a>
        </div>
      </form>

      {/* Map placeholder */}
      <section className="mt-12">
        <h2 className="f-text-h2 font-bold text-gray-800 mb-4">Find us</h2>
        <div className="rounded-2xl border bg-gray-100 h-72 flex items-center justify-center text-gray-500">Map coming soon</div>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="f-text-h2 font-bold text-gray-800 mb-4">FAQ</h2>
        <div className="space-y-3">
          {[
            { q: "When will I hear back?", a: "We usually respond within 1–2 business days." },
            { q: "How do I track my order?", a: "You’ll receive a tracking link by email once your order ships." },
            { q: "Do you have a return policy?", a: "Yes. We offer 30-day returns for unopened items." },
          ].map((f) => (
            <details key={f.q} className="rounded-xl border p-4 bg-white">
              <summary className="cursor-pointer font-medium text-gray-800 list-none">{f.q}</summary>
              <p className="mt-2 text-gray-700 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
