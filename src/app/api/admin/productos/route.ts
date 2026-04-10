import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const sb = createSupabaseAdmin();
  const { data, error } = await sb
    .from("productos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sb = createSupabaseAdmin();

  const { data, error } = await sb
    .from("productos")
    .insert({
      marca: body.marca,
      nombre: body.nombre,
      precio: Number(body.precio),
      talla: body.talla,
      condicion: body.condicion,
      tag: body.tag ?? "Disponible",
      disponible: true,
      foto_url: body.foto_url ?? null,
      whatsapp_msg: body.whatsapp_msg ?? null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
