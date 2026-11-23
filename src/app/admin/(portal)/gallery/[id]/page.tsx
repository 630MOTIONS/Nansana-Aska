import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeletePhotoForm from "@/components/admin/gallery/DeletePhotoForm";
import PhotoForm from "@/components/admin/gallery/PhotoForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { getPhoto } from "@/lib/admin/gallery-data";
import { logoSrc } from "@/lib/admin/logo";
import { updatePhotoAction } from "../actions";

export const metadata: Metadata = { title: "Edit photo" };

export default async function EditPhotoPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await getAuth();
  const { id } = await props.params;

  const photo = await getPhoto(id);
  if (!photo) notFound();
  const src = logoSrc(photo.imageUrl);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <Link
          href="/admin/gallery"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All photos
        </Link>
        <h1 className="mt-2 text-section text-navy">{photo.title}</h1>
      </div>

      <Card as="section" className="overflow-hidden">
        <div className="bg-surface-tint">
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={photo.title}
              className="mx-auto max-h-[28rem] w-auto max-w-full object-contain"
            />
          )}
        </div>
      </Card>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Details</h2>
        <div className="mt-4">
          <PhotoForm
            action={updatePhotoAction.bind(null, photo.id)}
            initial={{
              title: photo.title,
              caption: photo.caption,
              category: photo.category,
              meta: photo.meta ?? "",
              wide: photo.wide,
              featured: photo.featured,
              published: photo.published,
            }}
          />
        </div>
      </Card>

      {user.role === "admin" && (
        <Card as="section" className="border-2 border-red-100 p-6">
          <h2 className="text-card text-red-800">Delete this photo</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Removes the photo from the website and the database. Only
            administrators can do this. To take it off the website without
            deleting it, untick “Visible on the website”.
          </p>
          <div className="mt-4">
            <DeletePhotoForm id={photo.id} />
          </div>
        </Card>
      )}
    </div>
  );
}
