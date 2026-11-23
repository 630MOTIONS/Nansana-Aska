import "server-only";
import { apiRequest, unwrap } from "./api";
import { getAuth } from "./auth";
import type { AdminHighlight } from "./highlights-types";

export async function listHighlights() {
  const { token } = await getAuth();
  return unwrap(
    await apiRequest<AdminHighlight[]>("/admin/highlights", { token }),
  );
}

export async function getHighlight(id: string): Promise<AdminHighlight | null> {
  const { token } = await getAuth();
  const result = await apiRequest<AdminHighlight>(
    `/admin/highlights/${encodeURIComponent(id)}`,
    { token },
  );
  if (!result.ok && result.status === 404) return null;
  return unwrap(result);
}
