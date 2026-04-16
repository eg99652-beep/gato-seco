"use client";

import { useState, useEffect } from "react";

const slides = [
  "/slider-1.jpg",
  "/slider-2.jpg",
  "/slider-3.jpg",
  "/slider-4.jpg",
  "/slider-5.jpg",
  "/slider-6.png",
  "/slider-7.jpg",
  "/slider-8.jpg",
  "/slider-9.jpg",
  "/slider-10.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5", maxHeight: "92vh" }}>
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/35" />
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
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl transition-all">&lsaquo;</button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl transition-all">&rsaquo;</button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all" style={{ width: i === current ? 20 : 6, height: 6, background: i === current ? "#f7f5f0" : "rgba(247,245,240,0.4)" }} />
        ))}
      </div>
    </section>
  );
}
