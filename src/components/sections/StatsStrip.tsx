import type { ReactNode } from "react";
import { Landmark, TrendingUp, Trophy, Users } from "lucide-react";
import Card from "@/components/ui/Card";

type Stat = {
  label: string;
  icon: ReactNode;
  value: string;
  note: string;
};

// SAMPLE DATA: copied from the Stitch design. "45+" is not confirmed with
// the club, so check it before launch.
const stats: Stat[] = [
  {
    label: "Foundation",
    icon: <Landmark size={14} aria-hidden />,
    value: "Est. 2021",
    note: "Born out of grassroots ambition in Wakiso District.",
  },
  {
    label: "Squad program",
    icon: <Users size={14} aria-hidden />,
    value: "Men & Women",
    note: "Equal dedication to elite national indoor squads.",
  },
  {
    label: "Club strength",
    icon: <TrendingUp size={14} aria-hidden />,
    value: "45+",
    note: "Registered athletes & verified club development talent.",
  },
  {
    label: "Championship",
    icon: <Trophy size={14} aria-hidden />,
    value: "Super League",
    note: "National top-flight contenders competing across Uganda.",
  },
];

export default function StatsStrip() {
  return (
    <section aria-label="Club at a glance" className="-mt-20 px-4 lg:-mt-24">
      <Card className="mx-auto w-full max-w-site p-6 lg:p-8">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="lg:border-l lg:border-surface-tint lg:px-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="inline-flex items-center gap-1.5 text-label font-bold uppercase tracking-widest text-ink-muted">
                {stat.icon}
                {stat.label}
              </dt>
              <dd className="mt-2">
                <span className="block font-display text-4xl font-extrabold uppercase leading-none text-navy">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-ink-muted">
                  {stat.note}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Card>
    </section>
  );
}
