"use client";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const navItems = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Sobre nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#f7f5f0] sticky top-0 z-50 border-b border-[#d4cfc6]">
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-[64px]">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none" aria-label="Gato Seco inicio">
          <span
            className="text-[#1a1a18] font-black text-xl tracking-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Gato Seco
          </span>
          <span className="text-[#8a8680] text-[9px] font-medium tracking-widest uppercase">
            El Salvador
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#1a1a18] hover:text-[#2d4a2d] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* WhatsApp CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="https://wa.me/50370059191"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#2d4a2d] text-[#f7f5f0] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#3d6b3d] transition-colors"
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-[#1a1a18]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#d4cfc6] bg-[#f7f5f0]">
          <nav className="max-w-[1200px] mx-auto px-5 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-base font-medium text-[#1a1a18] border-b border-[#e8e4db] hover:text-[#2d4a2d] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/50370059191"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 bg-[#2d4a2d] text-[#f7f5f0] text-sm font-medium px-4 py-3 rounded-full"
            >
              <MessageCircle size={16} />
              Escribinos al WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
