import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin/constants";

// Only checks that a session cookie exists, so signed-out visitors do not
// reach admin pages. It does NOT prove the session is valid. Every admin page
// and action verifies the session with the API through getAuth().
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/admin/login" && !request.cookies.get(ADMIN_COOKIE)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
