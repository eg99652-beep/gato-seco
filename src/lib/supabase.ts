import { createClient } from "@supabase/supabase-js";

export type ProductoRow = {
  id: number;
  marca: string;
  nombre: string;
  precio: number;
  talla: string;
  condicion: string;
  disponible: boolean;
  tag: string;
  foto_url: string | null;
  whatsapp_msg: string | null;
  created_at: string;
  orden: number;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createSupabase() {
  return createClient(url, key);
}

export function createSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceKey);
}
