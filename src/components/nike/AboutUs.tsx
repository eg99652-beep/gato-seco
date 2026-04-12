import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="w-full px-6 py-20 md:py-28" style={{ background: "#f7f5f0" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#2d4a2d", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            El por qué
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
            No necesitas mucho dinero<br />para vestirte bien.
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "#5a5a52", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Hola, soy Enrique. Te hicieron pensar que el estilo depende de cuánto gastas,
            pero en realidad depende de cómo eliges. Hoy compras más, usas menos… y terminas
            con ropa, pero sin estilo.
            <br /><br />
            Por eso creé este espacio: para ofrecerte piezas de marca, con calidad y
            personalidad, que realmente valen la pena.
          </p>
        </div>
        <div
          className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative flex items-center justify-center"
          style={{ background: "#2d4a2d" }}
        >
          <Image
            src="/logo-gato.jpg"
            alt="Gato Seco logo"
            width={320}
            height={320}
            className="object-contain"
            style={{ borderRadius: "50%" }}
          />
          <div className="absolute bottom-0 w-full flex items-end justify-start p-6">
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
