import type { Metadata } from "next";
import GalleryExplorer from "@/components/sections/gallery/GalleryExplorer";
import GalleryHero from "@/components/sections/gallery/GalleryHero";
import GalleryMore from "@/components/sections/gallery/GalleryMore";
import { getGallery } from "@/lib/public/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Nansana ASKA Futsal Club: matchdays, training sessions, squads and community moments.",
};

export default async function GalleryPage() {
  const gallery = await getGallery();
  const albums = new Set(gallery.items.map((item) => item.category)).size;

  return (
    <main id="main">
      <GalleryHero
        featured={gallery.featured}
        total={gallery.items.length}
        albums={albums}
        latest={gallery.latest}
      />
      {gallery.items.length > 0 ? (
        <GalleryExplorer items={gallery.items} />
      ) : (
        <section id="archive" aria-label="Gallery" className="bg-surface-tint py-16">
          <p className="mx-auto max-w-site px-4 text-center text-ink-muted">
            Photos will appear here soon. Please check back.
          </p>
        </section>
      )}
      <GalleryMore />
    </main>
  );
}
