import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { apiRequest, unwrap } from "./api";
import { getSessionToken } from "./session";
import type { AdminUser } from "./types";

// The one place that checks the session. Call it at the top of every admin
// page and every admin action. The API decides whether the session is valid.
// cache() makes repeated calls within one request cost a single API call.
export const getAuth = cache(async () => {
  const token = await getSessionToken();
  if (!token) redirect("/admin/login");
  const user = unwrap(await apiRequest<AdminUser>("/auth/me", { token }));
  return { token, user };
});
