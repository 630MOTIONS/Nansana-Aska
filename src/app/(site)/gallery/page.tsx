import type { Metadata } from "next";
import GalleryExplorer from "@/components/sections/gallery/GalleryExplorer";
import GalleryHero from "@/components/sections/gallery/GalleryHero";
import GalleryMore from "@/components/sections/gallery/GalleryMore";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Nansana ASKA Futsal Club: matchdays, training sessions, squads and community moments.",
};

export default function GalleryPage() {
  return (
    <main id="main">
      <GalleryHero />
      <GalleryExplorer />
      <GalleryMore />
    </main>
  );
}
