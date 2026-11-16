// The browser loads logos straight from the API, so this needs the address the
// browser can reach, not the server-only one.
const PUBLIC_API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

export function logoSrc(logoUrl: string | null): string | null {
  return logoUrl ? `${PUBLIC_API_URL}${logoUrl}` : null;
}

export const LOGO_ACCEPT = "image/png,image/jpeg,image/webp";
export const MAX_LOGO_BYTES = 512 * 1024;
