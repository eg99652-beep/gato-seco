import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { ProductoRow } from "@/lib/supabase";
import { productos as staticProductos } from "@/data/productos";

export const dynamic = "force-dynamic";

const TAG_STYLES: Record<string, string> = {
  Nuevo: "bg-[#2d4a2d] text-[#f7f5f0]",
  Oferta: "bg-[#8a4a2d] text-[#f7f5f0]",
  Vintage: "bg-[#4a3a2d] text-[#f7f5f0]",
  Disponible: "bg-[#1a1a18] text-[#f7f5f0]",
};

const GRADIENTS = [
  "linear-gradient(135deg, #c8d8c0 0%, #8fa882 100%)",
  "linear-gradient(135deg, #b8c4d4 0%, #7a93b5 100%)",
  "linear-gradient(135deg, #d4b896 0%, #b8956a 100%)",
  "linear-gradient(135deg, #2d4a2d 0%, #4a6b4a 100%)",
];

function waUrl(p: ProductoRow) {
  const msg = p.whatsapp_msg ?? `Hola! Me interesa el ${p.marca} ${p.nombre} talla ${p.talla} ($${p.precio}). Esta disponible?`;
  return `https://wa.me/50370059191?text=${encodeURIComponent(msg)}`;
}

export default async function ProductGrid() {
  let productos: ProductoRow[] = [];

  try {
    const res = await fetch("https://gatosecosv.vercel.app/api/admin/productos", { cache: "no-store" });
    if (res.ok) productos = await res.json();
  } catch (e) {
    console.error("Error fetching productos:", e);
  }

  if (productos.length === 0) {
    productos = staticProductos.map((p) => ({
      id: p.id, marca: p.marca, nombre: p.nombre, precio: p.precio,
      talla: p.talla, condicion: p.condicion, disponible: p.disponible,
      tag: p.tag, foto_url: null, whatsapp_msg: p.whatsappMsg ?? null,
      created_at: new Date().toISOString(), orden: 0,
    }));
  }

  return (
    <section id="catalogo" className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[#8a8680] text-xs font-medium uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Disponible ahora</p>
          <h2 className="text-[#1a1a18] font-black text-3xl md:text-4xl leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Catalogo</h2>
        </div>
        <a href="https://wa.me/50370059191" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#2d4a2d] underline hover:no-underline hidden sm:block" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Ver todo</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        {productos.map((producto, i) => (
          <article key={producto.id} className="group cursor-pointer transition-opacity duration-300" style={{ opacity: producto.disponible ? 1 : 0.6 }}>
            <div className="relative overflow-hidden rounded-sm mb-3">
              {producto.foto_url ? (
                <div className="w-full aspect-[3/4] relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <Image src={producto.foto_url} alt={producto.nombre} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
              ) : (
                <div className="w-full aspect-[3/4] group-hover:scale-105 transition-transform duration-300" style={{ background: GRADIENTS[i % GRADIENTS.length] }} aria-hidden="true" />
              )}
              {producto.tag !== "Disponible" && (
                <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${TAG_STYLES[producto.tag] ?? TAG_STYLES.Disponible}`} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{producto.tag}</span>
              )}
              {!producto.disponible && (
                <span className="absolute top-3 right-3 bg-[#c0392b] text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Agotado</span>
              )}
              {producto.disponible ? (
                <a href={waUrl(producto)} target="_blank" rel="noopener noreferrer" className="absolute bottom-3 left-3 right-3 bg-[#f7f5f0] text-[#1a1a18] text-xs font-medium py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-md flex items-center justify-center gap-1.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  <MessageCircle size={13} />Consultar
                </a>
              ) : (
                <div className="absolute bottom-3 left-3 right-3 bg-[#d4cfc6] text-[#8a8680] text-xs font-medium py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center cursor-not-allowed" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Agotado</div>
              )}
            </div>
            <div className="space-y-0.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              <p className="text-[#8a8680] text-[11px] font-semibold uppercase tracking-wider">{producto.marca}</p>
              <h3 className="text-[#1a1a18] text-sm font-medium leading-snug">{producto.nombre}</h3>
              <p className="text-[#8a8680] text-xs">Talla {producto.talla} · {producto.condicion}</p>
              <p className="text-[#1a1a18] font-semibold text-sm pt-1">${producto.precio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
