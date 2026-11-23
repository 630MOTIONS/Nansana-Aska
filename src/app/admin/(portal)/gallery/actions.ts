"use server";

import { redirect } from "next/navigation";
import { actionError, apiRequest } from "@/lib/admin/api";
import { getAuth } from "@/lib/admin/auth";
import type { FormState } from "@/lib/admin/form-state";
import { adminGalleryCategories } from "@/lib/admin/gallery";
import { refreshGalleryAfterChange } from "@/lib/admin/revalidate";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function updatePhotoAction(
  id: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const title = text(formData, "title");
  const category = text(formData, "category");
  if (title.length < 3) return { error: "Enter a title of at least 3 characters." };
  if (!adminGalleryCategories.some((item) => item.id === category)) {
    return { error: "Choose a category." };
  }

  const result = await apiRequest(`/admin/gallery/${encodeURIComponent(id)}`, {
    method: "PATCH",
    token,
    body: {
      title,
      category,
      caption: text(formData, "caption"),
      meta: text(formData, "meta") || null,
      wide: formData.get("wide") === "on",
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    },
  });
  if (!result.ok) return actionError(result);

  refreshGalleryAfterChange();
  return { saved: true };
}

export async function bulkGalleryAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const ids = formData
    .getAll("ids")
    .filter((value): value is string => typeof value === "string");
  const action = text(formData, "action");
  if (ids.length === 0) return { error: "Select at least one photo first." };
  if (!["publish", "hide", "delete"].includes(action)) {
    return { error: "Choose an action." };
  }

  const result = await apiRequest<{ changed: number; skipped: number }>(
    "/admin/gallery/bulk",
    { method: "POST", token, body: { ids, action } },
  );
  if (!result.ok) return actionError(result);

  refreshGalleryAfterChange();

  if (action === "publish" && result.data.skipped > 0) {
    return {
      error: `Published ${result.data.changed}. ${result.data.skipped} could not be published because they still have no title. Open each one and give it a title first.`,
    };
  }
  return { saved: true };
}

// Called after a batch upload (which goes through /admin/api/upload) so the
// screens and caches refresh once.
export async function refreshGalleryAction(): Promise<void> {
  await getAuth();
  refreshGalleryAfterChange();
}

export async function deletePhotoAction(
  id: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const result = await apiRequest(`/admin/gallery/${encodeURIComponent(id)}`, {
    method: "DELETE",
    token,
  });
  if (!result.ok) return actionError(result);

  refreshGalleryAfterChange();
  redirect("/admin/gallery");
}
