// The browser loads images (team logos, photos) straight from the API, so this
// needs the address the browser can reach, not the server-only one.
const PUBLIC_API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

// With a width, asks for a copy of the photo that is at least that wide, which
// is much lighter for small thumbnails.
export function logoSrc(path: string | null, width?: number): string | null {
  if (!path) return null;
  const sized = width ? `${path}${path.includes("?") ? "&" : "?"}w=${width}` : path;
  return `${PUBLIC_API_URL}${sized}`;
}

export const LOGO_ACCEPT = "image/png,image/jpeg,image/webp";
export const MAX_LOGO_BYTES = 512 * 1024;
