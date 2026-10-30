import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { clubChannels } from "@/lib/gallery";

export default function GalleryMore() {
  return (
    <section
      aria-label="More from Nansana ASKA"
      className="bg-surface-tint py-16"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="More club channels"
            eyebrowTone="gold"
            title="Discover Nansana ASKA"
          />
          <p className="text-label font-semibold uppercase tracking-widest text-ink-muted">
            Pride of Wakiso
          </p>
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clubChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <li key={channel.title}>
                <Link
                  href={channel.href}
                  className="group flex h-full flex-col gap-1 rounded-xl bg-white p-5 shadow-card transition-shadow hover:shadow-lg"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-tint text-navy">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="text-label font-bold uppercase tracking-widest text-gold-deep">
                    {channel.kicker}
                  </span>
                  <span className="font-display text-card font-extrabold uppercase text-navy">
                    {channel.title}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-label font-bold uppercase tracking-wide text-navy">
                    {channel.cta}
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 grid items-center gap-8 rounded-2xl bg-navy p-8 text-white shadow-card lg:grid-cols-[1fr_auto] lg:p-12">
          <div>
            <Badge variant="onDark" className="rounded-full px-3">
              Support the pride of Nansana
            </Badge>
            <h2 className="mt-5 text-hero">
              Be part of the <span className="text-gold-soft">ASKA story</span>
            </h2>
            <p className="mt-4 max-w-2xl text-white/85">
              Follow every matchday, celebrate our local athletes, and
              experience the adrenaline of premier indoor futsal in Uganda. Get
              involved in our youth programs or partner with us.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Contact management</Button>
            <Button href="/matches" variant="secondary">
              View fixtures
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
