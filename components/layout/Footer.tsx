"use client";
import NewsletterForm from "@/components/sections/NewsletterForm";

export function Footer() {
  return (
    <footer className="w-full px-6 border-t border-border text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800">Join Glowify Club for 10% off</h3>
            <p className="text-gray-600 mt-1">Get exclusive offers and skincare tips in your inbox.</p>
          </div>
          <div className="md:justify-self-end w-full">
            {/* Inline small form */}
            <div className="w-full">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Glowify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
