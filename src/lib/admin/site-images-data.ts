import "server-only";
import { apiRequest, unwrap } from "./api";
import { getAuth } from "./auth";
import type { AdminSiteImage } from "./site-images-types";

export async function listSiteImages() {
  const { token } = await getAuth();
  return unwrap(
    await apiRequest<AdminSiteImage[]>("/admin/site-images", { token }),
  );
}
