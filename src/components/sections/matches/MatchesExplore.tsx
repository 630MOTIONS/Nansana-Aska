import Link from "next/link";
import { Camera, CirclePlay, FileText, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const channels = [
  {
    icon: Users,
    tileClass: "bg-brand-blue/15 text-brand-blue",
    title: "Meet the teams",
    text: "Profiles, jersey numbers, and squad details for our men’s and women’s teams.",
    cta: "View rosters",
    href: "/team",
  },
  {
    icon: CirclePlay,
    tileClass: "bg-brand-orange/20 text-gold-deep",
    title: "Watch highlights",
    text: "Match reels, top goals, saves, and post-game analysis.",
    cta: "Watch highlights",
    href: "/highlights",
  },
  {
    icon: Camera,
    tileClass: "bg-brand-gold/30 text-gold-deep",
    title: "Photo gallery",
    text: "Matchday action, stadium atmosphere, and fan photos.",
    cta: "Browse albums",
    href: "/gallery",
  },
  {
    icon: FileText,
    tileClass: "bg-brand-blue/15 text-brand-blue",
    title: "Latest club news",
    text: "Official announcements, youth academy updates, and player interviews.",
    cta: "Read articles",
    href: "/news",
  },
];

export default function MatchesExplore() {
  return (
    <section aria-label="Beyond match day" className="bg-surface py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          eyebrow="Explore ASKA FC"
          title="Stay connected beyond match day"
        />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <li key={channel.title}>
                <Link
                  href={channel.href}
                  className="flex h-full flex-col gap-2 rounded-xl bg-white p-5 shadow-card transition-shadow hover:shadow-lg"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${channel.tileClass}`}
                  >
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="mt-2 font-display text-card font-extrabold uppercase text-navy">
                    {channel.title}
                  </span>
                  <span className="text-sm text-ink-muted">{channel.text}</span>
                  <span className="mt-auto pt-3 text-label font-bold uppercase tracking-wide text-navy">
                    {channel.cta} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
