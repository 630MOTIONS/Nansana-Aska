import "server-only";
import { redirect } from "next/navigation";
import type { FormState } from "./form-state";

// Server-only address of the NestJS API. No NEXT_PUBLIC_ prefix on purpose.
const API_URL = (
  process.env.ADMIN_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  ""
).replace(/\/+$/, "");

export type ApiFailure = { ok: false; status: number; message: string };
export type ApiResult<T> = { ok: true; data: T } | ApiFailure;

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function describe(status: number, json: unknown): string {
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You do not have permission to do that.";
  if (status === 413) return "That file is too large.";
  if (status === 429) return "Too many attempts. Try again in a few minutes.";

  const message =
    typeof json === "object" && json !== null && "message" in json
      ? (json as { message: unknown }).message
      : undefined;
  if (Array.isArray(message)) return message.map(String).join(" ");
  if (typeof message === "string") return message;
  return `The request failed (${status}).`;
}

// For the server log only, for example "fetch failed (ECONNREFUSED)".
function describeNetworkError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const cause = error.cause;
  const code =
    typeof cause === "object" && cause !== null && "code" in cause
      ? String((cause as { code: unknown }).code)
      : "";
  return code ? `${error.message} (${code})` : error.message;
}

export async function apiRequest<T>(
  path: string,
  options: {
    method?: Method;
    token?: string;
    // A JSON body, or a multipart form (for file uploads). Use one or the other.
    body?: unknown;
    form?: FormData;
    // Uploads of large photos need longer than ordinary requests.
    timeoutMs?: number;
  } = {},
): Promise<ApiResult<T>> {
  const method = options.method ?? "GET";

  if (!API_URL) {
    return {
      ok: false,
      status: 0,
      message: "The API address is not set. Add ADMIN_API_URL to .env.local.",
    };
  }

  const hasJson = options.body !== undefined && options.form === undefined;

  let status = 0;
  let text = "";
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        // For a multipart form, fetch sets the Content-Type (with its boundary).
        ...(hasJson ? { "Content-Type": "application/json" } : {}),
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      body: options.form ?? (hasJson ? JSON.stringify(options.body) : undefined),
      cache: "no-store",
      signal: AbortSignal.timeout(options.timeoutMs ?? 15000),
    });
    status = response.status;
    text = status === 204 ? "" : await response.text();
  } catch (error) {
    console.error(
      `[admin api] ${method} ${API_URL}${path} failed: ${describeNetworkError(error)}`,
    );
    return {
      ok: false,
      status: 0,
      message: "Could not reach the API. Check that it is running.",
    };
  }

  let json: unknown;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = undefined;
    }
  }

  if (status >= 200 && status < 300) return { ok: true, data: json as T };
  return { ok: false, status, message: describe(status, json) };
}

// For pages: returns the data, sends an expired session to the login page, and
// throws on any other failure (shown by the admin error page).
export function unwrap<T>(result: ApiResult<T>): T {
  if (result.ok) return result.data;
  if (result.status === 401) redirect("/admin/login");
  throw new Error(result.message);
}

// For actions: turns a failure into a message for the form.
export function actionError(result: ApiFailure): FormState {
  if (result.status === 401) redirect("/admin/login");
  return { error: result.message };
}
