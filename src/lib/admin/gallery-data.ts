import "server-only";
import { apiRequest, unwrap } from "./api";
import { getAuth } from "./auth";
import type { AdminPhoto } from "./gallery-types";

export async function listPhotos(filters: { published?: boolean } = {}) {
  const { token } = await getAuth();
  const params = new URLSearchParams({ limit: "500" });
  if (filters.published !== undefined) {
    params.set("published", String(filters.published));
  }
  return unwrap(
    await apiRequest<AdminPhoto[]>(`/admin/gallery?${params.toString()}`, {
      token,
    }),
  );
}

export async function getPhoto(id: string): Promise<AdminPhoto | null> {
  const { token } = await getAuth();
  const result = await apiRequest<AdminPhoto>(
    `/admin/gallery/${encodeURIComponent(id)}`,
    { token },
  );
  if (!result.ok && result.status === 404) return null;
  return unwrap(result);
}
