"use server";

import { redirect } from "next/navigation";
import { actionError, apiRequest } from "@/lib/admin/api";
import { getAuth } from "@/lib/admin/auth";
import type { FormState } from "@/lib/admin/form-state";
import { refreshAfterChange } from "@/lib/admin/revalidate";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function points(
  raw: string,
  label: string,
): { value: number } | { error: string } {
  const number = Number(raw);
  if (raw === "" || !Number.isInteger(number) || number < 0 || number > 10) {
    return { error: `${label} must be a whole number from 0 to 10.` };
  }
  return { value: number };
}

export async function createCompetitionAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const name = text(formData, "name");
  const season = text(formData, "season");
  const squad = text(formData, "squad");
  if (name.length < 2) return { error: "Enter the competition's name." };
  if (!season) return { error: "Enter the season, for example 2026/27." };
  if (squad !== "men" && squad !== "women") {
    return { error: "Choose men's or women's." };
  }

  const win = points(text(formData, "pointsForWin"), "Points for a win");
  if ("error" in win) return { error: win.error };
  const draw = points(text(formData, "pointsForDraw"), "Points for a draw");
  if ("error" in draw) return { error: draw.error };

  const result = await apiRequest<{ slug: string }>("/admin/competitions", {
    method: "POST",
    token,
    body: {
      name,
      season,
      squad,
      pointsForWin: win.value,
      pointsForDraw: draw.value,
    },
  });
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  redirect(`/admin/competitions/${encodeURIComponent(result.data.slug)}?created=1`);
}

export async function updateCompetitionAction(
  slug: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const name = text(formData, "name");
  const season = text(formData, "season");
  if (name.length < 2) return { error: "Enter the competition's name." };
  if (!season) return { error: "Enter the season, for example 2026/27." };

  const win = points(text(formData, "pointsForWin"), "Points for a win");
  if ("error" in win) return { error: win.error };
  const draw = points(text(formData, "pointsForDraw"), "Points for a draw");
  if ("error" in draw) return { error: draw.error };

  const result = await apiRequest(
    `/admin/competitions/${encodeURIComponent(slug)}`,
    {
      method: "PATCH",
      token,
      body: {
        name,
        season,
        pointsForWin: win.value,
        pointsForDraw: draw.value,
      },
    },
  );
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  return { saved: true };
}

export async function setCompetitionTeamsAction(
  slug: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const teamSlugs = formData
    .getAll("teamSlugs")
    .filter((value): value is string => typeof value === "string");

  const result = await apiRequest(
    `/admin/competitions/${encodeURIComponent(slug)}/teams`,
    { method: "PUT", token, body: { teamSlugs } },
  );
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  return { saved: true };
}

export async function deleteCompetitionAction(
  slug: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const result = await apiRequest(
    `/admin/competitions/${encodeURIComponent(slug)}`,
    { method: "DELETE", token },
  );
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  redirect("/admin/competitions");
}
