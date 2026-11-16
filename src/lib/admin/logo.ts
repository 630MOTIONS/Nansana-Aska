// The browser loads images (team logos, article photos) straight from the API,
// so this needs the address the browser can reach, not the server-only one.
const PUBLIC_API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

export function logoSrc(path: string | null): string | null {
  return path ? `${PUBLIC_API_URL}${path}` : null;
}

export const LOGO_ACCEPT = "image/png,image/jpeg,image/webp";
export const MAX_LOGO_BYTES = 512 * 1024;
