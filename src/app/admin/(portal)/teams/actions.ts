"use server";

import { redirect } from "next/navigation";
import { actionError, apiRequest } from "@/lib/admin/api";
import { getAuth } from "@/lib/admin/auth";
import type { FormState } from "@/lib/admin/form-state";
import { MAX_LOGO_BYTES } from "@/lib/admin/logo";
import { refreshAfterChange } from "@/lib/admin/revalidate";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// The chosen logo file, or null when none was chosen.
function logoFrom(formData: FormData): File | null {
  const value = formData.get("logo");
  return value instanceof File && value.size > 0 ? value : null;
}

// A quick friendly check. The API checks the real file contents again.
function logoProblem(file: File): string | null {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    return "The logo must be a PNG, JPEG or WebP image.";
  }
  if (file.size > MAX_LOGO_BYTES) {
    return "The logo must be smaller than 500 KB. Resize or compress it and try again.";
  }
  return null;
}

async function sendLogo(token: string, slug: string, file: File) {
  const form = new FormData();
  form.append("file", file, file.name);
  return apiRequest(`/admin/teams/${encodeURIComponent(slug)}/logo`, {
    method: "PUT",
    token,
    form,
  });
}

export async function createTeamAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const name = text(formData, "name");
  const squad = text(formData, "squad");
  if (name.length < 2) return { error: "Enter the team's name." };
  if (squad !== "men" && squad !== "women") {
    return { error: "Choose men's or women's." };
  }

  const logo = logoFrom(formData);
  if (logo) {
    const problem = logoProblem(logo);
    if (problem) return { error: problem };
  }

  const result = await apiRequest<{ slug: string }>("/admin/teams", {
    method: "POST",
    token,
    body: { name, squad, isOurs: formData.get("isOurs") === "on" },
  });
  if (!result.ok) return actionError(result);

  // The team now exists. If the logo then fails, the team is kept and the edit
  // page says so, instead of losing everything that was typed.
  let logoFailed = false;
  if (logo) {
    const uploaded = await sendLogo(token, result.data.slug, logo);
    if (!uploaded.ok) logoFailed = true;
  }

  refreshAfterChange();
  redirect(
    `/admin/teams/${encodeURIComponent(result.data.slug)}?created=1${logoFailed ? "&logo=failed" : ""}`,
  );
}

export async function updateTeamAction(
  slug: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const name = text(formData, "name");
  if (name.length < 2) return { error: "Enter the team's name." };

  const result = await apiRequest(`/admin/teams/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    token,
    body: { name, isOurs: formData.get("isOurs") === "on" },
  });
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  return { saved: true };
}

export async function uploadLogoAction(
  slug: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const logo = logoFrom(formData);
  if (!logo) return { error: "Choose an image file first." };
  const problem = logoProblem(logo);
  if (problem) return { error: problem };

  const result = await sendLogo(token, slug, logo);
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  return { saved: true };
}

export async function removeLogoAction(
  slug: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const result = await apiRequest(
    `/admin/teams/${encodeURIComponent(slug)}/logo`,
    { method: "DELETE", token },
  );
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  return { saved: true };
}

export async function deleteTeamAction(
  slug: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const result = await apiRequest(`/admin/teams/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
  if (!result.ok) return actionError(result);

  refreshAfterChange();
  redirect("/admin/teams");
}
