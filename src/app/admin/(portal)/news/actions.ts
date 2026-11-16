"use server";

import { redirect } from "next/navigation";
import { actionError, apiRequest } from "@/lib/admin/api";
import { getAuth } from "@/lib/admin/auth";
import type { FormState } from "@/lib/admin/form-state";
import { articleCategories } from "@/lib/admin/news";
import { refreshNewsAfterChange } from "@/lib/admin/revalidate";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

type Fields = {
  title: string;
  category: string;
  excerpt: string;
  body: string;
  featured: boolean;
  authorName?: string;
};

// intent: "draft" = save as a draft, "publish" = publish, "save" = keep the
// current status.
function read(
  formData: FormData,
): { fields: Fields; status?: "draft" | "published" } | { error: string } {
  const title = text(formData, "title");
  const category = text(formData, "category");
  if (title.length < 3) return { error: "Enter a title of at least 3 characters." };
  if (!articleCategories.some((item) => item.id === category)) {
    return { error: "Choose a category." };
  }

  const intent = text(formData, "intent");
  const status =
    intent === "publish" ? "published" : intent === "draft" ? "draft" : undefined;

  const authorName = text(formData, "authorName");
  return {
    fields: {
      title,
      category,
      excerpt: text(formData, "excerpt"),
      body: String(formData.get("body") ?? ""),
      featured: formData.get("featured") === "on",
      ...(authorName ? { authorName } : {}),
    },
    status,
  };
}

export async function createArticleAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const input = read(formData);
  if ("error" in input) return { error: input.error };

  const result = await apiRequest<{ slug: string }>("/admin/articles", {
    method: "POST",
    token,
    body: { ...input.fields, status: input.status ?? "draft" },
  });
  if (!result.ok) return actionError(result);

  refreshNewsAfterChange();
  redirect(`/admin/news/${encodeURIComponent(result.data.slug)}?created=1`);
}

export async function updateArticleAction(
  slug: string,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();
  const input = read(formData);
  if ("error" in input) return { error: input.error };

  const result = await apiRequest(`/admin/articles/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    token,
    body: { ...input.fields, ...(input.status ? { status: input.status } : {}) },
  });
  if (!result.ok) return actionError(result);

  refreshNewsAfterChange();
  return { saved: true };
}

export async function removeCoverAction(
  slug: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const result = await apiRequest(
    `/admin/articles/${encodeURIComponent(slug)}/cover`,
    { method: "DELETE", token },
  );
  if (!result.ok) return actionError(result);

  refreshNewsAfterChange();
  return { saved: true };
}

// Called after a cover upload (which goes through /admin/api/upload) so the
// screens and caches refresh.
export async function refreshNewsAction(): Promise<void> {
  await getAuth();
  refreshNewsAfterChange();
}

export async function deleteArticleAction(
  slug: string,
  _previous: FormState,
  _formData: FormData,
): Promise<FormState> {
  const { token } = await getAuth();

  const result = await apiRequest(`/admin/articles/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
  if (!result.ok) return actionError(result);

  refreshNewsAfterChange();
  redirect("/admin/news");
}
