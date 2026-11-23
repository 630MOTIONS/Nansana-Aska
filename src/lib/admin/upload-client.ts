// Browser-side: sends a photo to the admin's own upload route, which checks the
// session and passes it on to the API.
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const TYPES = ["image/png", "image/jpeg", "image/webp"];

export type UploadTarget =
  | { purpose: "inline" }
  | { purpose: "cover"; slug: string }
  | { purpose: "gallery"; category: string }
  | { purpose: "player" | "staff" | "thumbnail"; id: string };

export async function uploadImage(
  file: File,
  target: UploadTarget,
): Promise<{ url?: string; error?: string }> {
  if (!TYPES.includes(file.type)) {
    return { error: "Choose a PNG, JPEG or WebP image." };
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return { error: "That image is too large. The limit is 8 MB." };
  }

  const form = new FormData();
  form.append("file", file);
  form.append("purpose", target.purpose);
  if (target.purpose === "cover") form.append("slug", target.slug);
  if (target.purpose === "gallery") form.append("category", target.category);
  if (
    target.purpose === "player" ||
    target.purpose === "staff" ||
    target.purpose === "thumbnail"
  ) {
    form.append("id", target.id);
  }

  try {
    const response = await fetch("/admin/api/upload", {
      method: "POST",
      body: form,
    });
    const json = (await response.json()) as { url?: string; error?: string };
    if (!response.ok) return { error: json.error ?? "The upload failed." };
    return { url: json.url };
  } catch {
    return {
      error:
        "The upload failed. Check your connection and that you are still signed in.",
    };
  }
}
