"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";

interface Producto {
  id: number;
  marca: string;
  nombre: string;
  precio: number;
  talla: string;
  condicion: string;
  tag: string;
  foto_url: string | null;
  genero: string | null;
}

function CatalogoInner() {
  const params = useSearchParams();
  const genero = params.get("genero") || "Todos";
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/productos")
      .then((r) => r.json())
      .then((data) => {
        const filtrados = genero === "Todos"
          ? data
          : data.filter((p: Producto) => p.genero === genero || p.genero === "Unisex");
        setProductos(filtrados);
        setLoading(false);
      });
  }, [genero]);

  return (
    <div className="min-h-screen bg-[#f7f5f0]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-5 py-12">
        <p className="text-xs uppercase tracking-widest text-[#8a8680] mb-1">Gato Seco</p>
        <h1 className="font-black text-4xl text-[#1a1a18] mb-8" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          {genero}
        </h1>
        {loading ? (
          <p className="text-[#8a8680]">Cargando...</p>
        ) : productos.length === 0 ? (
          <p className="text-[#8a8680]">No hay piezas disponibles aún.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productos.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8e4db]">
                <div className="aspect-[3/4] bg-[#e8e4db] relative">
                  {p.foto_url ? (
                    <Image src={p.foto_url} alt={p.nombre} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#d4cfc6]" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[10px] uppercase tracking-wider text-[#8a8680]">{p.marca}</p>
                  <p className="text-sm font-semibold text-[#1a1a18] leading-snug">{p.nombre}</p>
                  <p className="text-xs text-[#8a8680] mt-0.5">{p.talla} · {p.condicion}</p>
                  <p className="text-sm font-bold text-[#2d4a2d] mt-1">${p.precio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense>
      <CatalogoInner />
    </Suspense>
  );
}
