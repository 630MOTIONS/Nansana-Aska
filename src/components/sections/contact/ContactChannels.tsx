import Link from "next/link";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { directChannels } from "@/lib/contact";

export default function ContactChannels() {
  return (
    <section aria-label="Contact the club" className="bg-surface py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Direct channels"
            eyebrowTone="gold"
            title="Contact the club"
          />
          <p className="max-w-sm text-sm text-ink-muted">
            Ways to reach Nansana ASKA Futsal Club.
          </p>
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {directChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <li key={channel.label}>
                <Card className="flex h-full flex-col gap-2 p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-tint text-navy">
                    <Icon size={20} aria-hidden />
                  </span>
                  <p className="mt-2 text-label font-bold uppercase tracking-widest text-ink-muted">
                    {channel.label}
                  </p>
                  <p className="font-display text-card font-extrabold uppercase text-navy">
                    {channel.value}
                  </p>
                  <p className="mt-auto pt-4 text-sm text-ink-muted">
                    {channel.note}
                  </p>
                  {channel.link && (
                    <Link
                      href={channel.link.href}
                      className="text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
                    >
                      {channel.link.label} →
                    </Link>
                  )}
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
