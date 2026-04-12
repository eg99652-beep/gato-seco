import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="w-full px-6 py-20 md:py-28" style={{ background: "#f7f5f0" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#2d4a2d", fontFamily: "var(--font-dm-sans), sans-serif" }}>El por qué</p>
          <h2 className="leading-tight mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1a1a18" }}>
            Antes creía que el estilo<br />era cuestión de dinero.
          </h2>
          <div style={{ width: "36px", height: "2px", background: "#2d4a2d", borderRadius: "2px", marginBottom: "1.8rem" }} />
          <p className="text-base leading-relaxed mb-4" style={{ color: "#5a5a52", fontFamily: "var(--font-dm-sans), sans-serif" }}>Hola, soy Enrique.</p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#5a5a52", fontFamily: "var(--font-dm-sans), sans-serif" }}>Crecí con la idea de que para vestirse bien había que gastar bastante. Y durante mucho tiempo lo creí.</p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#5a5a52", fontFamily: "var(--font-dm-sans), sans-serif" }}>Hoy sé que no es así. <strong style={{ color: "#1a1a18", fontWeight: 500 }}>El estilo es cuestión de elegir bien.</strong></p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#5a5a52", fontFamily: "var(--font-dm-sans), sans-serif" }}>Creé este espacio para ayudarte a vestir con intención — piezas de marca, con calidad real, sin gastar de más.</p>
          <p style={{ color: "#2d4a2d", fontSize: "14px", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.05em" }}>— Enrique</p>
        </div>
        <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative flex items-center justify-center" style={{ background: "#2d4a2d" }}>
          <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
            <Image
              src="/logo-gato.png"
              alt="Gato Seco logo"
              fill
              className="object-contain"
              style={{  }}
            />
          </div>
          <div className="absolute bottom-0 w-full flex items-end justify-start p-6">
            <span className="text-white/60 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Gato Seco · El Salvador</span>
          </div>
        </div>
      </div>
    </section>
  );
}
