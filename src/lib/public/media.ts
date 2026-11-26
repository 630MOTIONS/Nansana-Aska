// API images are requested from this site's own address (/media/..., /teams/...).
// Rewrites in next.config.ts pass those requests on to the API, so the visitor's
// browser never needs to reach the API's domain.
export function apiMedia(path: string | null): string | undefined {
  return path || undefined;
}

// Paths the site passes on to the API (see the rewrites in next.config.ts).
export function isApiPath(src: string): boolean {
  return src.startsWith("/media/") || src.startsWith("/teams/");
}

// next/image only optimises images from configured hosts. API photos and logos
// are already resized and compressed, so they are shown as they are.
export function isRemoteImage(src: string): boolean {
  return /^https?:\/\//.test(src) || isApiPath(src);
}
