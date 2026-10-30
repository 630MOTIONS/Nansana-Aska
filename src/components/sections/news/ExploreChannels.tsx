import Link from "next/link";
import { CalendarDays, CirclePlay, Images, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { exploreChannels } from "@/lib/articles";

const icons = {
  users: Users,
  calendar: CalendarDays,
  play: CirclePlay,
  images: Images,
};

export default function ExploreChannels() {
  return (
    <section aria-label="Explore club channels" className="bg-white py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          align="center"
          className="mx-auto max-w-2xl"
          eyebrow="Explore club channels"
          eyebrowTone="gold"
          title="Stay connected beyond the headlines"
          description="Immerse yourself deeper into the pride of Nansana through our specialised portals."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {exploreChannels.map((channel) => {
            const Icon = icons[channel.icon];
            return (
              <li key={channel.title}>
                <Link
                  href={channel.href}
                  className="flex h-full flex-col items-center gap-1 rounded-xl bg-surface-tint p-6 text-center transition-colors hover:bg-surface-strong"
                >
                  <Icon size={24} className="text-gold-deep" aria-hidden />
                  <span className="mt-2 font-display text-card font-extrabold uppercase text-navy">
                    {channel.title}
                  </span>
                  <span className="text-sm text-ink-muted">{channel.note}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
