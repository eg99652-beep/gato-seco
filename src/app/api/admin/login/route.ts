import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const adminPassword = process.env.ADMIN_PASSWORD ?? "gatoseco2026";
  const adminToken = process.env.ADMIN_TOKEN ?? "default-token";

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("gs_admin", adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 días
    path: "/",
  });
  return res;
}
