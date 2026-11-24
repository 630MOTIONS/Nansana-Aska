// Browser-side: sends a photo to the admin's own upload route, which checks the
// session and passes it on to the API.
//
// Big photos are shrunk in the browser first. A 12 MB camera photo becomes
// about 1 MB, which uploads in seconds even on mobile data. The server resizes
// and cleans every photo again, so this is only a speed-up.
export const MAX_PHOTO_BYTES = 30 * 1024 * 1024;
const MAX_ORIGINAL_BYTES = 150 * 1024 * 1024; // beyond this the browser may freeze
const SHRINK_ABOVE_BYTES = 1.5 * 1024 * 1024;
const LONGEST_EDGE = 2400;
const TYPES = ["image/png", "image/jpeg", "image/webp"];

export type UploadTarget =
  | { purpose: "inline" }
  | { purpose: "cover"; slug: string }
  | { purpose: "gallery"; category: string }
  | { purpose: "player" | "staff" | "thumbnail"; id: string };

async function shrink(file: File): Promise<File> {
  // PNGs are usually screenshots or graphics. Re-saving them as JPEG would
  // soften them, so they go as they are.
  if (file.type === "image/png" || file.size <= SHRINK_ABOVE_BYTES) return file;

  try {
    // createImageBitmap applies the photo's rotation, so portraits stay upright.
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, LONGEST_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
      bitmap.close();
      return file;
    }
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.88),
    );
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.jpg`, {
      type: "image/jpeg",
    });
  } catch {
    // The browser could not decode it (for example a very large photo on an
    // older phone). Send the original and let the server handle it.
    return file;
  }
}

export async function uploadImage(
  original: File,
  target: UploadTarget,
): Promise<{ url?: string; error?: string }> {
  if (!TYPES.includes(original.type)) {
    return { error: "Choose a PNG, JPEG or WebP image. iPhone HEIC photos must be saved as JPEG first." };
  }
  if (original.size > MAX_ORIGINAL_BYTES) {
    return { error: "That file is far too large. Choose a photo under 150 MB." };
  }

  const file = await shrink(original);
  if (file.size > MAX_PHOTO_BYTES) {
    return { error: "That image is still larger than 30 MB. Save it at a smaller size and try again." };
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
