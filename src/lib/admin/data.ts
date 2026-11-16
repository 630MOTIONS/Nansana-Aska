import "server-only";
import { apiRequest, unwrap } from "./api";
import { getAuth } from "./auth";
import type {
  AdminCompetition,
  AdminMatch,
  AdminTeam,
  MatchStatus,
  Squad,
} from "./types";

export async function listMatches(
  filters: { competition?: string; status?: MatchStatus; limit?: number } = {},
) {
  const { token } = await getAuth();
  const params = new URLSearchParams();
  if (filters.competition) params.set("competition", filters.competition);
  if (filters.status) params.set("status", filters.status);
  params.set("limit", String(filters.limit ?? 100));
  return unwrap(
    await apiRequest<AdminMatch[]>(`/admin/matches?${params.toString()}`, {
      token,
    }),
  );
}

export async function getMatch(slug: string): Promise<AdminMatch | null> {
  const { token } = await getAuth();
  const result = await apiRequest<AdminMatch>(
    `/admin/matches/${encodeURIComponent(slug)}`,
    { token },
  );
  if (!result.ok && result.status === 404) return null;
  return unwrap(result);
}

export async function listCompetitions() {
  const { token } = await getAuth();
  return unwrap(
    await apiRequest<AdminCompetition[]>("/admin/competitions", { token }),
  );
}

export async function listTeams(squad?: Squad) {
  const { token } = await getAuth();
  const query = squad ? `?squad=${squad}` : "";
  return unwrap(
    await apiRequest<AdminTeam[]>(`/admin/teams${query}`, { token }),
  );
}

export async function getTeam(slug: string): Promise<AdminTeam | null> {
  const teams = await listTeams();
  return teams.find((team) => team.slug === slug) ?? null;
}
