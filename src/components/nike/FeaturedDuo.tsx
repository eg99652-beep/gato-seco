import Link from "next/link";
interface FeaturedCard {
  label: string;
  headline: string;
  sub: string;
  cta: string;
  href: string;
  gradient: string;
  image?: string;
  textDark?: boolean;
}

const cards: FeaturedCard[] = [
  {
    label: "Nueva entrada",
    headline: "Hombre",
    sub: "Camisas, chaquetas y pantalones seleccionados a mano.",
    cta: "Ver piezas",
    href: "/catalogo?genero=Hombre",
    gradient: "linear-gradient(160deg, #1a1a18 0%, #2d4a2d 60%, #1a2e1a 100%)",
    image: "/hombre-banner.jpg",
  },
  {
    label: "Nueva entrada",
    headline: "Mujer",
    sub: "Blusas, abrigos y conjuntos con mucho carácter.",
    cta: "Ver piezas",
    href: "/catalogo?genero=Mujer",
    gradient: "linear-gradient(160deg, #e8e4db 0%, #d4cfc6 50%, #c4bfb5 100%)",
    image: "/mujer-banner.jpg",
    textDark: true,
  },
];

export default function FeaturedDuo() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.headline} className="relative overflow-hidden group cursor-pointer">
            {/* Image placeholder */}
            <div
              className="w-full aspect-[4/5] md:aspect-[3/4]"
              style={{ ...(card.image ? { backgroundImage: `url(${card.image})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: card.gradient }) }}
              aria-hidden="true"
            />
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
              <p
                className={`text-xs font-medium uppercase tracking-widest mb-1 ${
                  card.textDark ? "text-[#1a1a18]/80" : "text-[#f7f5f0]/80"
                }`}
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {card.label}
              </p>
              <h2
                className={`font-black text-4xl md:text-5xl leading-tight mb-2 ${
                  card.textDark ? "text-[#1a1a18]" : "text-[#f7f5f0]"
                }`}
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {card.headline}
              </h2>
              <p
                className={`text-sm mb-5 max-w-[200px] leading-relaxed ${
                  card.textDark ? "text-[#1a1a18]/80" : "text-[#f7f5f0]/80"
                }`}
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {card.sub}
              </p>
              <Link
                href={card.href}
                className={`inline-block font-medium text-sm px-6 py-2.5 rounded-full transition-all ${
                  card.textDark
                    ? "bg-[#1a1a18] text-[#f7f5f0] hover:bg-[#2d4a2d]"
                    : "bg-[#f7f5f0] text-[#1a1a18] hover:bg-[#e8e4db]"
                }`}
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {card.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
