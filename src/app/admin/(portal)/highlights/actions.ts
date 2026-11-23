"use server";

import { redirect } from "next/navigation";
import { actionError, apiRequest } from "@/lib/admin/api";
import { getAuth } from "@/lib/admin/auth";
import type { FormState } from "@/lib/admin/form-state";
import { videoCategoryOptions } from "@/lib/admin/highlights";
import { refreshHighlightsAfterChange } from "@/lib/admin/revalidate";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function read(
  formData: FormData,
): { body: Record<string, unknown> } | { error: string } {
  const title = text(formData, "title");
  if (title.length < 3) return { error: "Enter a title of at least 3 characters." };

  const category = text(formData, "category");
  if (!videoCategoryOptions.some((item) => item.id === category)) {
    return { error: "Choose a category." };
  }

  const videoUrl = text(formData, "videoUrl");
  if (!/^https:\/\/\S+$/i.test(videoUrl)) {
    return { error: "Enter the full video link, starting with https://" };
  }

  const duration = text(formData, "duration");
  if (duration && !/^\d{1,2}:\d{2}(:\d{2})?$/.test(duration)) {
    return { error: "The length must look like 4:18 or 1:04:18." };
  }

  return {
    body: {
      title,
      category,
      videoUrl,
      description: text(formData, "description"),
      kicker: text(formData, "kicker") || null,
      badge: text(formData, "badge") || null,
      duration: duration || null,
      date: text(formData, "date") || null,
      matchSlug: text(formData, "matchSlug") || null,
      published: formData.get("published") === "on",
      spotlight: formData.get("spotlight") === "on",
      featured: formData.get("featured") === "on",
    },
  };
}

export async function createHighlightAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const input = read(formData);
  if ("error" in input) return { error: input.error };

  const result = await apiRequest<{ id: string }>("/admin/highlights", {
    method: "POST",
    token,
    body: input.body,
  });
  if (!result.ok) return actionError(result);

  refreshHighlightsAfterChange();
  redirect(`/admin/highlights/${encodeURIComponent(result.data.id)}?created=1`);
}

export async function updateHighlightAction(
  id: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const input = read(formData);
  if ("error" in input) return { error: input.error };

  const result = await apiRequest(`/admin/highlights/${encodeURIComponent(id)}`, {
    method: "PATCH",
    token,
    body: input.body,
  });
  if (!result.ok) return actionError(result);

  refreshHighlightsAfterChange();
  return { saved: true };
}

export async function removeThumbnailAction(
  id: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const result = await apiRequest(
    `/admin/highlights/${encodeURIComponent(id)}/thumbnail`,
    { method: "DELETE", token },
  );
  if (!result.ok) return actionError(result);

  refreshHighlightsAfterChange();
  return { saved: true };
}

export async function refreshThumbnailAction(
  id: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const result = await apiRequest(
    `/admin/highlights/${encodeURIComponent(id)}/thumbnail/refresh`,
    { method: "POST", token },
  );
  if (!result.ok) return actionError(result);

  refreshHighlightsAfterChange();
  return { saved: true };
}

// Called after a thumbnail upload (which goes through /admin/api/upload) so the
// screens and caches refresh.
export async function refreshHighlightsAction(): Promise<void> {
  await getAuth();
  refreshHighlightsAfterChange();
}

export async function deleteHighlightAction(
  id: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const result = await apiRequest(`/admin/highlights/${encodeURIComponent(id)}`, {
    method: "DELETE",
    token,
  });
  if (!result.ok) return actionError(result);

  refreshHighlightsAfterChange();
  redirect("/admin/highlights");
}
