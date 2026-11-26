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

  if (src.startsWith("/media/")) {
    return <Image {...props} loader={apiLoader} />;
  }
  // Any other web address cannot be optimised by this site.
  if (/^https?:\/\//.test(src)) return <Image {...props} unoptimized />;
  return <Image {...props} />;
}
