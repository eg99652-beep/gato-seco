import { MessageCircle, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer id="nosotros" className="bg-[#e8e4db] border-t border-[#d4cfc6]">
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="max-w-xs">
            <h3
              className="text-[#1a1a18] font-black text-2xl mb-1"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Gato Seco
            </h3>
            <p
              className="text-[#8a8680] text-xs font-medium uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              El Salvador
            </p>
            <p
              className="text-[#1a1a18]/70 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Ropa buena, precios que no dan miedo. Piezas seleccionadas a mano
              con calidad garantizada.
            </p>
          </div>

          {/* Links */}
          <div
            className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            <a href="#catalogo" className="text-[#1a1a18]/70 hover:text-[#2d4a2d] transition-colors py-1">
              Catálogo
            </a>
            <a href="#nosotros" className="text-[#1a1a18]/70 hover:text-[#2d4a2d] transition-colors py-1">
              Sobre nosotros
            </a>
            <a href="#hombre" className="text-[#1a1a18]/70 hover:text-[#2d4a2d] transition-colors py-1">
              Hombre
            </a>
            <a href="#contacto" className="text-[#1a1a18]/70 hover:text-[#2d4a2d] transition-colors py-1">
              Contacto
            </a>
            <a href="#mujer" className="text-[#1a1a18]/70 hover:text-[#2d4a2d] transition-colors py-1">
              Mujer
            </a>
            <a href="#ofertas" className="text-[#2d4a2d] font-medium hover:underline py-1">
              Ofertas
            </a>
          </div>

          {/* Contact */}
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            <p className="text-[#8a8680] text-[10px] font-semibold uppercase tracking-widest mb-3">
              Contacto
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/50370059191"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#1a1a18]/70 hover:text-[#2d4a2d] transition-colors"
              >
                <MessageCircle size={14} />
                +503 7005 9191
              </a>
              <a
                href="https://instagram.com/gatoseco"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#1a1a18]/70 hover:text-[#2d4a2d] transition-colors"
              >
                <Camera size={14} />
                @gatoseco
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-[#d4cfc6] pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8a8680]"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          <span>© 2026 Gato Seco · El Salvador · Todos los derechos reservados</span>
          <span className="italic text-[#8a8680]/70">
            &ldquo;Ropa buena, precios que no dan miedo&rdquo;
          </span>
        </div>
      </div>
    </footer>
  );
}
