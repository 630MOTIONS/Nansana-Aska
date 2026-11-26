import type { Metadata } from "next";
import SiteImageCard from "@/components/admin/page-images/SiteImageCard";
import { getAuth } from "@/lib/admin/auth";
import { siteImageSlots } from "@/lib/admin/site-image-slots";
import { listSiteImages } from "@/lib/admin/site-images-data";

export const metadata: Metadata = { title: "Page images" };

export default async function PageImagesPage() {
  await getAuth();
  const images = await listSiteImages();
  const byKey = new Map(images.map((image) => [image.key, image]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-section text-navy">Page images</h1>
        <p className="mt-1 max-w-2xl text-ink-muted">
          Photos shown in fixed places on the website. Upload one for each
          place. Photos are cropped to fit their frame, so keep the subject in
          the middle. Only use photos the club has permission to publish.
        </p>
      </div>

      <div className="space-y-6">
        {siteImageSlots.map((slot) => (
          <SiteImageCard
            key={slot.key}
            slot={slot}
            image={byKey.get(slot.key) ?? null}
          />
        ))}
      </div>
    </div>
  );
}
