import { NextRequest, NextResponse } from "next/server";
import { createSupabase, createSupabaseAdmin } from "@/lib/supabase";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const sb = createSupabase();

  const { data, error } = await sb
    .from("productos")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sb = createSupabaseAdmin();

  const { data: producto } = await sb
    .from("productos")
    .select("foto_url")
    .eq("id", id)
    .single();

  if (producto?.foto_url) {
    const url = producto.foto_url;
    const marker = "/object/public/fotos/";
    const idx = url.indexOf(marker);
    if (idx !== -1) {
      const path = url.substring(idx + marker.length);
      await sb.storage.from("fotos").remove([path]);
    }
  }

  const { error } = await sb.from("productos").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}