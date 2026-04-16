export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero image placeholder — earthy/warm tone matching brand */}
      <div
        className="w-full min-h-[500px] aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/7]"
        style={{
          background:
            "linear-gradient(150deg, #1a1a18 0%, #2d4a2d 40%, #3d5c3a 65%, #1a1a18 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-20 lg:pb-24 px-6 text-center">
        <p
          className="text-[#e8e4db]/70 text-xs font-medium tracking-widest uppercase mb-4"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Tienda de ropa · El Salvador
        </p>
        <h1
          className="text-[#f7f5f0] leading-none tracking-tight mb-5"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 7vw, 6rem)",
          }}
        >
          Ropa buena,<br />
          precios que no<br />
          dan miedo.
        </h1>
        <p
          className="text-[#e8e4db]/80 text-sm md:text-base mb-8 max-w-sm"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Piezas seleccionadas a mano. Marcas reales, condición honesta. Moda sin el precio inflado.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#catalogo"
            className="bg-[#f7f5f0] text-[#1a1a18] font-medium text-sm px-7 py-3 rounded-full hover:bg-[#e8e4db] transition-colors"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Ver catálogo
          </a>
          <a
            href="https://wa.me/50370059191"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#f7f5f0]/50 text-[#f7f5f0] font-medium text-sm px-7 py-3 rounded-full hover:border-[#f7f5f0] hover:bg-[#f7f5f0]/10 transition-all"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Escribinos
          </a>
        </div>
      </div>
    </section>
  );
}
