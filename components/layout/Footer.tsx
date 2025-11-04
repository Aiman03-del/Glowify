"use client";

export function Footer() {
  return (
    <footer className="w-full py-6 px-6 border-t border-border text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto text-center">
        © {new Date().getFullYear()} Glowify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
