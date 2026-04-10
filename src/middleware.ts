import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("gs_admin")?.value;
  const token = process.env.ADMIN_TOKEN;

  // Protect everything under /admin/dashboard
  if (req.nextUrl.pathname.startsWith("/admin/dashboard")) {
    if (!token || session !== token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
