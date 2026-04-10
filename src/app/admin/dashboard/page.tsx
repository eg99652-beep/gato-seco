import { ProductoRow } from "@/lib/supabase";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let productos: ProductoRow[] = [];

  try {
    const res = await fetch("https://gatosecosv.vercel.app/api/admin/productos", { cache: "no-store" });
    if (res.ok) productos = await res.json();
  } catch (e) {
    console.error("Error fetching productos:", e);
  }

  return <DashboardClient initialProductos={productos} />;
}
