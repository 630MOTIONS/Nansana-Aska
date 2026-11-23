import type { Metadata } from "next";
import Link from "next/link";
import GalleryBulkGrid from "@/components/admin/gallery/GalleryBulkGrid";
import GalleryUploader from "@/components/admin/gallery/GalleryUploader";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { listPhotos } from "@/lib/admin/gallery-data";

export const metadata: Metadata = { title: "Gallery" };

const tabs = [
  { label: "All", value: undefined },
  { label: "Published", value: "published" },
  { label: "Hidden", value: "hidden" },
] as const;

export default async function GalleryAdminPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await getAuth();
  const query = await props.searchParams;
  const raw = Array.isArray(query.status) ? query.status[0] : query.status;
  const status = raw === "published" || raw === "hidden" ? raw : undefined;

  const photos = await listPhotos({
    published: status === "published" ? true : status === "hidden" ? false : undefined,
  });
  const hiddenCount = photos.filter((photo) => !photo.published).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-section text-navy">Gallery</h1>
        <p className="mt-1 text-ink-muted">
          Upload match and club photos. New photos stay hidden until you give
          them a title and publish them.
        </p>
      </div>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Upload photos</h2>
        <div className="mt-4">
          <GalleryUploader />
        </div>
      </Card>

      <nav aria-label="Filter by status" className="flex gap-2">
        {tabs.map((tab) => {
          const active = tab.value === status;
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/admin/gallery?status=${tab.value}` : "/admin/gallery"}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-label font-bold uppercase tracking-wide ${
                active
                  ? "bg-navy text-white"
                  : "bg-white text-navy hover:bg-surface-strong"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {!status && hiddenCount > 0 && (
        <p className="rounded-md bg-surface-strong p-3 text-sm text-ink-muted">
          {hiddenCount} {hiddenCount === 1 ? "photo is" : "photos are"} hidden
          and not on the website yet.
        </p>
      )}

      {photos.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
          No photos here yet.
        </p>
      ) : (
        <GalleryBulkGrid photos={photos} canDelete={user.role === "admin"} />
      )}
    </div>
  );
}
