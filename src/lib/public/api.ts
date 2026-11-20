import "server-only";

// Reads from the public (no sign-in) part of the API.
const API_URL = (
  process.env.ADMIN_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  ""
).replace(/\/+$/, "");

// Set USE_SAMPLE_CONTENT=1 only on preview deployments that have no API. It is
// deliberately explicit: if it were automatic, a missing API address at launch
// would quietly show invented content to the public.
export const USE_SAMPLE_CONTENT = process.env.USE_SAMPLE_CONTENT === "1";

// Returns the JSON, null for a 404, and throws for anything else, so a failed
// request is never stored in the cache as if it were real data.
export async function publicGet<T>(path: string): Promise<T | null> {
  if (!API_URL) {
    throw new Error(
      "The API address is not set. Set ADMIN_API_URL (or NEXT_PUBLIC_API_URL), or set USE_SAMPLE_CONTENT=1 for a preview with sample content.",
    );
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(20000),
    });
  } catch (error) {
    // Rethrown as a plain Error. A fetch timeout is a DOMException whose
    // message cannot be changed, which Next.js tries to do when it reports it.
    const reason =
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : String(error);
    throw new Error(
      `Could not read ${path} from the API (${reason}). Check that the API is running and can reach its database.`,
    );
  }

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`The API answered ${response.status} for ${path}.`);
  }
  return (await response.json()) as T;
}
