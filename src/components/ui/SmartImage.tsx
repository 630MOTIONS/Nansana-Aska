"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

// next/image asks for several widths (its "srcset"). The API answers each with
// the smallest stored copy that is at least that wide.
function apiLoader({ src, width }: { src: string; width: number }) {
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}

export default function SmartImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";

  if (API_URL && src.startsWith(`${API_URL}/`)) {
    return <Image {...props} loader={apiLoader} />;
  }
  // Any other web address cannot be optimised by this site.
  if (/^https?:\/\//.test(src)) return <Image {...props} unoptimized />;
  return <Image {...props} />;
}
