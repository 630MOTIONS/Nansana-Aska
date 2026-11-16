"use server";

import { redirect } from "next/navigation";
import { actionError, apiRequest } from "@/lib/admin/api";
import { getAuth } from "@/lib/admin/auth";
import type { FormState } from "@/lib/admin/form-state";
import { refreshAfterChange } from "@/lib/admin/revalidate";
import { fromKampalaInput } from "@/lib/admin/time";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseMatchday(raw: string): { value: number | null } | { error: string } {
  if (raw === "") return { value: null };
  const number = Number(raw);
  if (!Number.isInteger(number) || number < 1 || number > 99) {
    return { error: "Matchday must be a whole number from 1 to 99." };
  }
  return { value: number };
}

export async function createMatchAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const competition = text(formData, "competition");
  const homeTeam = text(formData, "homeTeam");
  const awayTeam = text(formData, "awayTeam");
  const stage = text(formData, "stage");
  if (!competition || !homeTeam || !awayTeam || !stage) {
    return {
      error: "Choose a competition and both teams, and enter the stage.",
    };
  }

  const kickoffAt = fromKampalaInput(text(formData, "kickoffAt"));
  if (!kickoffAt) return { error: "Enter the kick-off date and time." };

  const matchday = parseMatchday(text(formData, "matchday"));
  if ("error" in matchday) return { error: matchday.error };

  const result = await apiRequest<{ slug: string }>("/admin/matches", {
    method: "POST",
    token,
    body: {
      competition,
      homeTeam,
      awayTeam,
      stage,
      kickoffAt,
      venue: text(formData, "venue"),
      ...(matchday.value !== null ? { matchday: matchday.value } : {}),
    },
  });
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  redirect(`/admin/matches/${encodeURIComponent(result.data.slug)}?created=1`);
}

export async function updateMatchAction(
  slug: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const stage = text(formData, "stage");
  if (!stage) return { error: "Enter the stage." };

  const kickoffAt = fromKampalaInput(text(formData, "kickoffAt"));
  if (!kickoffAt) return { error: "Enter the kick-off date and time." };

  const matchday = parseMatchday(text(formData, "matchday"));
  if ("error" in matchday) return { error: matchday.error };

  const body: Record<string, unknown> = {
    stage,
    kickoffAt,
    matchday: matchday.value,
    venue: text(formData, "venue"),
  };

  // These fields are absent when the form disables them (a match with a result).
  const homeTeam = text(formData, "homeTeam");
  const awayTeam = text(formData, "awayTeam");
  const status = text(formData, "status");
  if (homeTeam) body.homeTeam = homeTeam;
  if (awayTeam) body.awayTeam = awayTeam;
  if (status) body.status = status;

  const result = await apiRequest(`/admin/matches/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    token,
    body,
  });
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  return { saved: true };
}

export async function saveResultAction(
  slug: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const home = text(formData, "homeScore");
  const away = text(formData, "awayScore");
  const homeScore = Number(home);
  const awayScore = Number(away);
  const valid = (raw: string, value: number) =>
    raw !== "" && Number.isInteger(value) && value >= 0 && value <= 99;
  if (!valid(home, homeScore) || !valid(away, awayScore)) {
    return { error: "Enter both scores as whole numbers from 0 to 99." };
  }

  const status = text(formData, "status") === "live" ? "live" : "final";

  const result = await apiRequest(
    `/admin/matches/${encodeURIComponent(slug)}/result`,
    { method: "PUT", token, body: { homeScore, awayScore, status } },
  );
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  return { saved: true };
}

export async function clearResultAction(
  slug: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const result = await apiRequest(
    `/admin/matches/${encodeURIComponent(slug)}/result`,
    { method: "DELETE", token },
  );
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  return { saved: true };
}

export async function deleteMatchAction(
  slug: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const result = await apiRequest(`/admin/matches/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  redirect("/admin/matches");
}
