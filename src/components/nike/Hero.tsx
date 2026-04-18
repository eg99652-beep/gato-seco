"use client";

import { useState, useEffect } from "react";

const slides = [
  { src: "/slider-1.jpg", dark: true },
  { src: "/slider-2.jpg", dark: false },
  { src: "/slider-3.jpg", dark: true },
  { src: "/slider-4.jpg", dark: true },
  { src: "/slider-5.jpg", dark: true },
  { src: "/slider-6.jpg", dark: false },
  { src: "/slider-7.jpg", dark: false },
  { src: "/slider-8.jpg", dark: false },
  { src: "/slider-9.jpg", dark: false },
  { src: "/slider-10.jpg", dark: false },
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

  const isDark = slides[current].dark;
  const textColor = isDark ? "#f7f5f0" : "#1a1a18";
  const subColor = isDark ? "rgba(247,245,240,0.8)" : "rgba(26,26,24,0.7)";
  const overlayClass = isDark ? "bg-black/40" : "bg-white/10";
  const btnBg = isDark ? "bg-[#f7f5f0] text-[#1a1a18]" : "bg-[#1a1a18] text-[#f7f5f0]";
  const btnBorder = isDark ? "border border-[#f7f5f0]/50 text-[#f7f5f0] hover:bg-[#f7f5f0]/10" : "border border-[#1a1a18]/50 text-[#1a1a18] hover:bg-[#1a1a18]/10";
  const dotActive = isDark ? "#f7f5f0" : "#1a1a18";
  const dotInactive = isDark ? "rgba(247,245,240,0.4)" : "rgba(26,26,24,0.3)";

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f5f0]" style={{ height: "90vh" }}>
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className={`absolute inset-0 ${overlayClass} transition-all duration-700`} />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center transition-all duration-700">
        <p className="text-xs font-medium tracking-widest uppercase mb-4 transition-colors duration-700" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: subColor }}>
          Tienda de ropa - El Salvador
        </p>
        <h1 className="leading-none tracking-tight mb-5 transition-colors duration-700" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 900, fontSize: "clamp(2rem, 7vw, 6rem)", color: textColor, textShadow: isDark ? "0 2px 12px rgba(0,0,0,0.5)" : "0 2px 8px rgba(255,255,255,0.5)" }}>
          Ropa buena,<br />precios que no<br />dan miedo.
        </h1>
        <p className="text-sm md:text-base mb-8 max-w-sm transition-colors duration-700" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: subColor }}>
          Piezas seleccionadas a mano. Marcas reales, condicion honesta. Moda sin el precio inflado.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#catalogo" className={`font-medium text-sm px-7 py-3 rounded-full transition-all ${btnBg}`} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Ver catalogo
          </a>
          <a href="https://wa.me/50370059191" target="_blank" rel="noopener noreferrer" className={`font-medium text-sm px-7 py-3 rounded-full transition-all ${btnBorder}`} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Escribinos
          </a>
        </div>
      </div>
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl transition-all">&lsaquo;</button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl transition-all">&rsaquo;</button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all" style={{ width: i === current ? 20 : 6, height: 6, background: i === current ? dotActive : dotInactive }} />
        ))}
      </div>
    </section>
  );
}
