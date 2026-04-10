export default function AboutUs() {
  return (
    <section className="w-full px-6 py-20 md:py-28" style={{ background: "#f7f5f0" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#2d4a2d", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Nosotros
          </p>
          <h2
            className="leading-tight mb-6"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#1a1a18",
            }}
          >
            Curado con criterio,<br />vendido con honestidad.
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "#5a5a52", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Gato Seco nació de una idea simple: la ropa buena no debería estar guardada en un clóset.
            Cada pieza pasa por nuestra revisión — marcas reales, tallas claras, condición honesta.
            Nada de fotos con filtro exagerado ni sorpresas al recibir.
          </p>
        </div>
        {/* Imagen placeholder */}
        <div
          className="w-full aspect-[4/5] rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2d4a2d 0%, #3d5c3a 100%)" }}
        >
          <div className="w-full h-full flex items-end p-6">
            <span
              className="text-white/60 text-xs uppercase tracking-widest"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Gato Seco · El Salvador
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
