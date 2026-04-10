const categories = [
  { label: "Hombre", href: "#hombre" },
  { label: "Mujer", href: "#mujer" },
  { label: "Abrigos", href: "#abrigos" },
  { label: "Casualwear", href: "#casualwear" },
  { label: "Vintage", href: "#vintage" },
  { label: "Ofertas", href: "#ofertas", highlight: true },
];

export default function CategoryBar() {
  return (
    <section className="border-b border-[#d4cfc6] bg-[#f7f5f0]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href={cat.href}
              className={`flex-shrink-0 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2
                ${cat.highlight
                  ? "text-[#2d4a2d] border-[#2d4a2d] font-semibold"
                  : "text-[#8a8680] border-transparent hover:text-[#1a1a18] hover:border-[#1a1a18]"
                }`}
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
