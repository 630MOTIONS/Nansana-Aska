import { revalidatePath } from "next/cache";
import { apiRequest } from "@/lib/admin/api";
import { getSessionToken } from "@/lib/admin/session";

// Server Actions refuse request bodies over 1 MB, which is too small for
// photos. This route accepts up to 30 MB, checks the session cookie, and passes
// the image on to the API (which checks the session again, and resizes it).
const MAX_BYTES = 30 * 1024 * 1024;
const TOO_LARGE = "That image is too large. The limit is 30 MB.";
const SLOW = 60_000; // large photos take a while to process

function reply(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // Switched on for preview deployments that have no API behind them.
  if (process.env.ADMIN_DISABLED === "1") {
    return reply({ error: "Not found." }, 404);
  }
  if (!sameOrigin(request)) return reply({ error: "Forbidden." }, 403);

  const token = await getSessionToken();
  if (!token) {
    return reply({ error: "Your session has expired. Please sign in again." }, 401);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BYTES + 200_000) return reply({ error: TOO_LARGE }, 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply({ error: "The upload could not be read." }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return reply({ error: "Choose an image file." }, 400);
  }
  if (file.size > MAX_BYTES) return reply({ error: TOO_LARGE }, 413);

  const outgoing = new FormData();
  outgoing.append("file", file, file.name);

  const purpose = form.get("purpose");

  if (purpose === "inline") {
    const result = await apiRequest<{ url: string }>("/admin/media", {
      method: "POST",
      token,
      form: outgoing,
      timeoutMs: SLOW,
    });
    if (!result.ok) {
      return reply({ error: result.message }, result.status || 502);
    }
    return reply({ url: result.data.url });
  }

  if (purpose === "cover") {
    const slug = form.get("slug");
    if (typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)) {
      return reply({ error: "Missing article." }, 400);
    }
    const result = await apiRequest(
      `/admin/articles/${encodeURIComponent(slug)}/cover`,
      { method: "PUT", token, form: outgoing, timeoutMs: SLOW },
    );
    if (!result.ok) {
      return reply({ error: result.message }, result.status || 502);
    }
    revalidatePath("/admin", "layout");
    return reply({ ok: true });
  }

  if (purpose === "gallery") {
    const category = form.get("category");
    if (typeof category !== "string" || !/^[a-z_]+$/.test(category)) {
      return reply({ error: "Choose a category." }, 400);
    }
    outgoing.append("category", category);
    // The page refreshes once, after the whole batch. See GalleryUploader.
    const result = await apiRequest<{ id: string }>("/admin/gallery", {
      method: "POST",
      token,
      form: outgoing,
      timeoutMs: SLOW,
    });
    if (!result.ok) {
      return reply({ error: result.message }, result.status || 502);
    }
    return reply({ ok: true, id: result.data.id });
  }

  if (purpose === "site") {
    const key = form.get("key");
    if (typeof key !== "string" || !/^[a-z_]+$/.test(key)) {
      return reply({ error: "Unknown image place." }, 400);
    }
    const result = await apiRequest(
      `/admin/site-images/${encodeURIComponent(key)}`,
      { method: "PUT", token, form: outgoing, timeoutMs: SLOW },
    );
    if (!result.ok) {
      return reply({ error: result.message }, result.status || 502);
    }
    revalidatePath("/admin", "layout");
    return reply({ ok: true });
  }

  if (purpose === "player" || purpose === "staff" || purpose === "thumbnail") {
    const id = form.get("id");
    if (typeof id !== "string" || !/^[a-z0-9]+$/.test(id)) {
      return reply({ error: "Missing item." }, 400);
    }
    const base =
      purpose === "player" ? "players" : purpose === "staff" ? "staff" : "highlights";
    const part = purpose === "thumbnail" ? "thumbnail" : "photo";
    const result = await apiRequest(
      `/admin/${base}/${encodeURIComponent(id)}/${part}`,
      { method: "PUT", token, form: outgoing, timeoutMs: SLOW },
    );
    if (!result.ok) {
      return reply({ error: result.message }, result.status || 502);
    }
    revalidatePath("/admin", "layout");
    return reply({ ok: true });
  }

  return reply({ error: "Unknown upload type." }, 400);
}
