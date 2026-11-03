import Image from "next/image";
import type { PhotoAsset } from "@/lib/photos";

type PhotoProps = {
  photo: PhotoAsset;
  sizes: string;
  priority?: boolean;
  // Use when a heading or caption next to the photo already says what it shows.
  decorative?: boolean;
  className?: string;
};

// Fills its parent, which must be `relative` and have a size
// (for example `relative aspect-[4/3]`).
export default function Photo({
  photo,
  sizes,
  priority,
  decorative,
  className,
}: PhotoProps) {
  return (
    <Image
      src={photo.src}
      alt={decorative ? "" : photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={["object-cover", className].filter(Boolean).join(" ")}
      style={{ objectPosition: photo.position }}
    />
  );
}
