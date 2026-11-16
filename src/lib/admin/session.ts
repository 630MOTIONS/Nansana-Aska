import "server-only";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "./constants";

export async function getSessionToken(): Promise<string | undefined> {
  return (await cookies()).get(ADMIN_COOKIE)?.value;
}

// httpOnly: page scripts cannot read it. Path /admin: the browser sends it
// only to admin pages, never to the public site.
export async function setSessionToken(token: string, expiresAt: Date) {
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    expires: expiresAt,
  });
}

export async function clearSessionToken() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
}
