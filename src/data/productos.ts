export interface Producto {
  id: number;
  marca: string;
  nombre: string;
  precio: number;
  talla: string;
  condicion: string;
  disponible: boolean;
  tag: "Nuevo" | "Oferta" | "Disponible" | "Vintage";
  /** Mensaje pre-escrito para WhatsApp. Si se omite, se genera automáticamente. */
  whatsappMsg?: string;
  /** Clase CSS de gradiente de fondo para la imagen placeholder */
  gradient?: string;
}

const TELEFONO = "50370059191";

function waMsg(p: Pick<Producto, "marca" | "nombre" | "precio" | "talla">) {
  return `Hola! Me interesa el ${p.marca} ${p.nombre} talla ${p.talla} ($${p.precio}). ¿Está disponible?`;
}

export const productos: Producto[] = [
  {
    id: 1,
    marca: "Vineyard Vines",
    nombre: "Pullover Fleece · Navy",
    precio: 45,
    talla: "M",
    condicion: "Como nuevo",
    disponible: true,
    tag: "Nuevo",
    gradient: "linear-gradient(135deg, #c8d8c0 0%, #8fa882 100%)",
  },
  {
    id: 2,
    marca: "Levi's",
    nombre: "Chaqueta de mezclilla",
    precio: 55,
    talla: "L",
    condicion: "Muy bueno",
    disponible: true,
    tag: "Disponible",
    gradient: "linear-gradient(135deg, #b8c4d4 0%, #7a93b5 100%)",
  },
  {
    id: 3,
    marca: "Nine West",
    nombre: "Pantalón de cuero · Camel",
    precio: 35,
    talla: "S",
    condicion: "Bueno",
    disponible: true,
    tag: "Disponible",
    gradient: "linear-gradient(135deg, #d4b896 0%, #b8956a 100%)",
  },
  {
    id: 4,
    marca: "The North Face",
    nombre: "Half-zip Fleece · Burgundy",
    precio: 38,
    talla: "XL",
    condicion: "Muy bueno",
    disponible: true,
    tag: "Disponible",
    gradient: "linear-gradient(135deg, #2d4a2d 0%, #4a6b4a 60%, #2d4a2d 100%)",
  },
];

// ─── Utilidad ──────────────────────────────────────────────────────────────────
// Construye la URL de WhatsApp para un producto dado
export function buildWhatsappUrl(p: Producto): string {
  const msg = p.whatsappMsg ?? waMsg(p);
  return `https://wa.me/${TELEFONO}?text=${encodeURIComponent(msg)}`;
}
