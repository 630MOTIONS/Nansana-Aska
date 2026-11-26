"use server";

import { actionError, apiRequest } from "@/lib/admin/api";
import { getAuth } from "@/lib/admin/auth";
import type { FormState } from "@/lib/admin/form-state";
import { refreshSiteImagesAfterChange } from "@/lib/admin/revalidate";

export async function saveAltAction(
  key: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const raw = formData.get("alt");
  const alt = typeof raw === "string" ? raw.trim() : "";
  if (alt.length > 200) return { error: "Keep the description under 200 characters." };

  const result = await apiRequest(`/admin/site-images/${encodeURIComponent(key)}`, {
    method: "PATCH",
    token,
    body: { alt },
  });
  if (!result.ok) return actionError(result);

  refreshSiteImagesAfterChange();
  return { saved: true };
}

export async function removeSiteImageAction(
  key: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const result = await apiRequest(`/admin/site-images/${encodeURIComponent(key)}`, {
    method: "DELETE",
    token,
  });
  if (!result.ok) return actionError(result);

  refreshSiteImagesAfterChange();
  return { saved: true };
}

// Called after a photo upload (which goes through /admin/api/upload) so the
// screens and caches refresh.
export async function refreshSiteImagesAction(): Promise<void> {
  await getAuth();
  refreshSiteImagesAfterChange();
}
