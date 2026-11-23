"use server";

import { redirect } from "next/navigation";
import { actionError, apiRequest } from "@/lib/admin/api";
import { getAuth } from "@/lib/admin/auth";
import type { FormState } from "@/lib/admin/form-state";
import {
  footOptions,
  groupOptions,
  positionOptions,
  roleOptions,
} from "@/lib/admin/people";
import { refreshPeopleAfterChange } from "@/lib/admin/revalidate";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// "" becomes null (cleared). Anything else must be a whole number in range.
function intOrNull(
  formData: FormData,
  key: string,
  label: string,
  max: number,
): { value: number | null } | { error: string } {
  const raw = text(formData, key);
  if (raw === "") return { value: null };
  const number = Number(raw);
  if (!Number.isInteger(number) || number < 0 || number > max) {
    return { error: `${label} must be a whole number from 0 to ${max}.` };
  }
  return { value: number };
}

function oneOf(
  options: { id: string }[],
  value: string,
): boolean {
  return options.some((option) => option.id === value);
}

function readPlayer(
  formData: FormData,
): { body: Record<string, unknown> } | { error: string } {
  const name = text(formData, "name");
  if (name.length < 2) return { error: "Enter the player's name." };

  const squad = text(formData, "squad");
  if (squad !== "men" && squad !== "women") {
    return { error: "Choose men's or women's." };
  }

  const position = text(formData, "position");
  if (!oneOf(positionOptions, position)) return { error: "Choose a position." };

  const role = text(formData, "role");
  if (role !== "" && !oneOf(roleOptions, role)) return { error: "Choose a valid role." };

  const foot = text(formData, "foot");
  if (foot !== "" && !oneOf(footOptions, foot)) return { error: "Choose a valid foot." };

  const number = intOrNull(formData, "number", "Shirt number", 99);
  if ("error" in number) return { error: number.error };
  const appearances = intOrNull(formData, "appearances", "Appearances", 999);
  if ("error" in appearances) return { error: appearances.error };
  const goals = intOrNull(formData, "goals", "Goals", 999);
  if ("error" in goals) return { error: goals.error };
  const cleanSheets = intOrNull(formData, "cleanSheets", "Clean sheets", 999);
  if ("error" in cleanSheets) return { error: cleanSheets.error };
  const saves = intOrNull(formData, "saves", "Saves", 999);
  if ("error" in saves) return { error: saves.error };

  return {
    body: {
      name,
      squad,
      position,
      number: number.value,
      role: role || null,
      foot: foot || null,
      appearances: appearances.value,
      goals: goals.value,
      cleanSheets: cleanSheets.value,
      saves: saves.value,
      published: formData.get("published") === "on",
    },
  };
}

function readStaff(
  formData: FormData,
): { body: Record<string, unknown> } | { error: string } {
  const name = text(formData, "name");
  if (name.length < 2) return { error: "Enter the person's name." };
  const title = text(formData, "title");
  if (title.length < 2) return { error: "Enter their role, for example “Head coach”." };

  const group = text(formData, "group");
  if (!oneOf(groupOptions, group)) return { error: "Choose a group." };

  const order = intOrNull(formData, "sortOrder", "Display order", 99);
  if ("error" in order) return { error: order.error };

  return {
    body: {
      name,
      title,
      kicker: text(formData, "kicker") || null,
      bio: text(formData, "bio"),
      group,
      sortOrder: order.value ?? 0,
      published: formData.get("published") === "on",
    },
  };
}

// ---------------------------------------------------------------- players
export async function createPlayerAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const input = readPlayer(formData);
  if ("error" in input) return { error: input.error };

  const result = await apiRequest<{ id: string }>("/admin/players", {
    method: "POST",
    token,
    body: input.body,
  });
  if (!result.ok) return actionError(result);

  refreshPeopleAfterChange();
  redirect(`/admin/players/${encodeURIComponent(result.data.id)}?created=1`);
}

export async function updatePlayerAction(
  id: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const input = readPlayer(formData);
  if ("error" in input) return { error: input.error };

  const result = await apiRequest(`/admin/players/${encodeURIComponent(id)}`, {
    method: "PATCH",
    token,
    body: input.body,
  });
  if (!result.ok) return actionError(result);

  refreshPeopleAfterChange();
  return { saved: true };
}

export async function deletePlayerAction(
  id: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const result = await apiRequest(`/admin/players/${encodeURIComponent(id)}`, {
    method: "DELETE",
    token,
  });
  if (!result.ok) return actionError(result);

  refreshPeopleAfterChange();
  redirect("/admin/players");
}

// ------------------------------------------------------------------ staff
export async function createStaffAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const input = readStaff(formData);
  if ("error" in input) return { error: input.error };

  const result = await apiRequest<{ id: string }>("/admin/staff", {
    method: "POST",
    token,
    body: input.body,
  });
  if (!result.ok) return actionError(result);

  refreshPeopleAfterChange();
  redirect(`/admin/staff/${encodeURIComponent(result.data.id)}?created=1`);
}

export async function updateStaffAction(
  id: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const input = readStaff(formData);
  if ("error" in input) return { error: input.error };

  const result = await apiRequest(`/admin/staff/${encodeURIComponent(id)}`, {
    method: "PATCH",
    token,
    body: input.body,
  });
  if (!result.ok) return actionError(result);

  refreshPeopleAfterChange();
  return { saved: true };
}

export async function deleteStaffAction(
  id: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const result = await apiRequest(`/admin/staff/${encodeURIComponent(id)}`, {
    method: "DELETE",
    token,
  });
  if (!result.ok) return actionError(result);

  refreshPeopleAfterChange();
  redirect("/admin/staff");
}

// ------------------------------------------------- photos (both kinds)
export async function removePersonPhotoAction(
  kind: "player" | "staff",
  id: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const base = kind === "player" ? "players" : "staff";

  const result = await apiRequest(
    `/admin/${base}/${encodeURIComponent(id)}/photo`,
    { method: "DELETE", token },
  );
  if (!result.ok) return actionError(result);

  refreshPeopleAfterChange();
  return { saved: true };
}

// Called after a photo upload (which goes through /admin/api/upload) so the
// screens and caches refresh.
export async function refreshPeopleAction(): Promise<void> {
  await getAuth();
  refreshPeopleAfterChange();
}
