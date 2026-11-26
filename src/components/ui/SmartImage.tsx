"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";

// next/image asks for several widths (its "srcset"). The API answers each with
// the smallest stored copy that is at least that wide.
function apiLoader({ src, width }: { src: string; width: number }) {
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}

export default function SmartImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";

  // Uploaded photos: the API resizes them, so ask it for the width needed.
  if (src.startsWith("/media/")) {
    return <Image {...props} loader={apiLoader} />;
  }
  // Team logos and any other web address: shown as they are.
  if (src.startsWith("/teams/") || /^https?:\/\//.test(src)) {
    return <Image {...props} unoptimized />;
  }
  return <Image {...props} />;
}