"use client";

import { useState, useEffect } from "react";

const slides = [
  "/slider-2.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "92vh" }}>
      <img
        src="/slider-2.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center">
        <p className="text-[#e8e4db]/70 text-xs font-medium tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Tienda de ropa - El Salvador
        </p>
        <h1 className="text-[#f7f5f0] leading-none tracking-tight mb-5" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 900, fontSize: "clamp(2rem, 10vw, 5rem)" }}>
          Ropa buena,<br />precios que no<br />dan miedo.
        </h1>
        <p className="text-[#e8e4db]/80 text-sm mb-8 max-w-xs" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Piezas seleccionadas a mano. Marcas reales, condicion honesta. Moda sin el precio inflado.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#catalogo" className="bg-[#f7f5f0] text-[#1a1a18] font-medium text-sm px-7 py-3 rounded-full hover:bg-[#e8e4db] transition-colors" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Ver catalogo
          </a>
          <a href="https://wa.me/50370059191" target="_blank" rel="noopener noreferrer" className="border border-[#f7f5f0]/50 text-[#f7f5f0] font-medium text-sm px-7 py-3 rounded-full hover:border-[#f7f5f0] hover:bg-[#f7f5f0]/10 transition-all" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Escribinos
          </a>
        </div>
      </div>
    </section>
  );
}
