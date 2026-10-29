import Link from "next/link";
import { CirclePlay, Images, MonitorPlay, Play } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import { highlights } from "@/lib/media";

export default function GalleryHighlights() {
  return (
    <section
      aria-label="Gallery and highlights"
      className="bg-navy-deep py-16 text-white"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            className="max-w-xl"
            eyebrow="Media & Broadcast"
            eyebrowIcon={<MonitorPlay size={16} aria-hidden />}
            title="Action on the court — gallery & highlights"
            description="Step onto the hardwood court with our official photo and video recaps from the 2026 campaign."
          />
          <div className="flex flex-col items-stretch gap-3 sm:flex-row lg:flex-col">
            <Button
              href="/gallery"
              variant="secondary"
              icon={<Images size={16} aria-hidden />}
            >
              Browse full photo gallery
            </Button>
            <Button
              href="/highlights"
              icon={<CirclePlay size={16} aria-hidden />}
            >
              Watch match highlights
            </Button>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="group relative block overflow-hidden rounded-xl"
              >
                <MediaPlaceholder className="aspect-[4/3]" />
                <div
                  className="absolute inset-0 bg-linear-to-t from-navy-deep/95 via-navy-deep/30 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className="absolute left-1/2 top-[40%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-brand-orange text-ink transition-transform group-hover:scale-110"
                  aria-hidden="true"
                >
                  <Play size={24} fill="currentColor" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <Badge variant={item.tagVariant}>{item.tag}</Badge>
                  <h3 className="mt-2 text-card text-white">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.subtitle}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
