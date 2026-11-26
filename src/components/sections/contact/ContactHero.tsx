import Image from "next/image";
import { ArrowDown, ArrowRight, BadgeCheck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SmartImage from "@/components/ui/SmartImage";
import { trustStrip } from "@/lib/contact";
import type { SiteImage } from "@/lib/public/site-images";
import { siteConfig } from "@/lib/site";

export default function ContactHero({ image }: { image?: SiteImage }) {
  return (
    <section className="bg-linear-to-br from-surface-strong via-surface-tint to-surface pt-10">
      <div className="mx-auto grid w-full max-w-site items-center gap-10 px-4 pb-12 lg:grid-cols-2">
        <div>
          <Badge variant="tint" className="rounded-full px-3">
            <span
              className="h-1.5 w-1.5 rounded-full bg-brand-orange"
              aria-hidden="true"
            />
            Get in touch • Pride of Nansana
          </Badge>
          <h1 className="mt-6 text-hero text-brand-blue">
            Get in touch with Nansana ASKA
          </h1>
          <p className="mt-5 max-w-xl text-hero-sub text-ink-muted">
            Have a question, interested in joining the team, or looking to
            partner with the club? We’d love to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#enquiry" icon={<ArrowDown size={14} aria-hidden />}>
              Send an enquiry
            </Button>
            <Button
              href="#opportunities"
              variant="light"
              icon={<ArrowRight size={14} aria-hidden />}
            >
              Explore player trials
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-card">
          <div className="relative aspect-[4/3]">
            {image ? (
              <SmartImage
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover"
              />
            ) : (
              <MediaPlaceholder className="absolute inset-0 h-full w-full" />
            )}
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-lg bg-white p-3 shadow-card">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-tint">
              <Image src={siteConfig.crest} alt="" width={32} height={32} />
            </span>
            <div className="grow">
              <p className="font-display text-card font-extrabold uppercase text-navy">
                Pride of Nansana
              </p>
              <p className="text-label font-bold uppercase tracking-widest text-gold-deep">
                Uganda FSL competitor
              </p>
            </div>
            <BadgeCheck size={22} className="text-gold-deep" aria-hidden />
          </div>
        </div>
      </div>

      <div className="border-t border-surface-strong">
        <ul className="mx-auto flex w-full max-w-site flex-wrap items-center justify-center gap-3 px-4 py-4">
          {trustStrip.map((item) => (
            <li
              key={item}
              className="rounded-sm bg-white px-3 py-1.5 text-label font-bold uppercase tracking-wide text-navy"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
