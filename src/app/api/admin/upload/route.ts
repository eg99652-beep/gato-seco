import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const sb = createSupabaseAdmin();
  const { error } = await sb.storage
    .from("fotos")
    .upload(filename, file, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = sb.storage.from("fotos").getPublicUrl(filename);
  return NextResponse.json({ url: urlData.publicUrl });
}
