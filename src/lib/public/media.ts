// Images stored in the API (article photos) are loaded by the visitor's browser
// straight from the API, so this needs the address the browser can reach.
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

export function apiMedia(path: string | null): string | undefined {
  return path ? `${API_URL}${path}` : undefined;
}

// next/image only optimises images from configured hosts. API photos are
// already resized and compressed on upload, so they are shown as they are.
export function isRemoteImage(src: string): boolean {
  return /^https?:\/\//.test(src);
}
