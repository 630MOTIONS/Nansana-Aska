// API images are requested from this site's own address (/media/...). A rewrite
// in next.config.ts passes the request on to the API, so the visitor's browser
// never needs to reach the API's domain.
export function apiMedia(path: string | null): string | undefined {
  return path || undefined;
}

// next/image only optimises images from configured hosts. API photos are
// already resized and compressed on upload, so they are shown as they are.
export function isRemoteImage(src: string): boolean {
  return /^https?:\/\//.test(src) || src.startsWith("/media/");
}
