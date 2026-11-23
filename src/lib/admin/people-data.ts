import "server-only";
import { apiRequest, unwrap } from "./api";
import { getAuth } from "./auth";
import type { AdminPlayer, AdminStaff } from "./people-types";
import type { Squad } from "./types";

export async function listPlayers(squad?: Squad) {
  const { token } = await getAuth();
  const query = squad ? `?squad=${squad}` : "";
  return unwrap(
    await apiRequest<AdminPlayer[]>(`/admin/players${query}`, { token }),
  );
}

export async function getPlayer(id: string): Promise<AdminPlayer | null> {
  const { token } = await getAuth();
  const result = await apiRequest<AdminPlayer>(
    `/admin/players/${encodeURIComponent(id)}`,
    { token },
  );
  if (!result.ok && result.status === 404) return null;
  return unwrap(result);
}

export async function listStaff() {
  const { token } = await getAuth();
  return unwrap(await apiRequest<AdminStaff[]>("/admin/staff", { token }));
}

export async function getStaffMember(id: string): Promise<AdminStaff | null> {
  const { token } = await getAuth();
  const result = await apiRequest<AdminStaff>(
    `/admin/staff/${encodeURIComponent(id)}`,
    { token },
  );
  if (!result.ok && result.status === 404) return null;
  return unwrap(result);
}
