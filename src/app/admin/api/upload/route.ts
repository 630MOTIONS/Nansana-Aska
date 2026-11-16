import { revalidatePath } from "next/cache";
import { apiRequest } from "@/lib/admin/api";
import { getSessionToken } from "@/lib/admin/session";

// Server Actions refuse request bodies over 1 MB, which is too small for
// photos. This route accepts up to 8 MB, checks the session cookie, and passes
// the image on to the API (which checks the session again, and resizes it).
const MAX_BYTES = 8 * 1024 * 1024;

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
  if (!sameOrigin(request)) return reply({ error: "Forbidden." }, 403);

  const token = await getSessionToken();
  if (!token) {
    return reply({ error: "Your session has expired. Please sign in again." }, 401);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BYTES + 200_000) {
    return reply({ error: "That image is too large. The limit is 8 MB." }, 413);
  }

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
  if (file.size > MAX_BYTES) {
    return reply({ error: "That image is too large. The limit is 8 MB." }, 413);
  }

  const outgoing = new FormData();
  outgoing.append("file", file, file.name);

  const purpose = form.get("purpose");

  if (purpose === "inline") {
    const result = await apiRequest<{ url: string }>("/admin/media", {
      method: "POST",
      token,
      form: outgoing,
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
      { method: "PUT", token, form: outgoing },
    );
    if (!result.ok) {
      return reply({ error: result.message }, result.status || 502);
    }
    revalidatePath("/admin", "layout");
    return reply({ ok: true });
  }

  return reply({ error: "Unknown upload type." }, 400);
}
