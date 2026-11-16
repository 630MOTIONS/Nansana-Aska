import AdminTeamLogo from "@/components/admin/AdminTeamLogo";
import Countdown from "@/components/admin/dashboard/Countdown";
import Button from "@/components/ui/Button";
import { formatKampalaLongDate, formatKampalaTime } from "@/lib/admin/time";
import type { AdminMatch } from "@/lib/admin/types";
import { CalendarDays, MapPin } from "lucide-react";

type Side = { name: string; logoUrl: string | null; ours: boolean };

function HeroTeam({ side, label }: { side: Side; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <AdminTeamLogo name={side.name} logoUrl={side.logoUrl} size="lg" />
      <p className="font-display text-card font-extrabold uppercase">
        {side.name}
      </p>
      <p className="text-label font-semibold uppercase tracking-widest text-gold-soft">
        {label}
        {side.ours ? " · Our team" : ""}
      </p>
    </div>
  );
}

export default function NextMatchHero({
  match,
  home,
  away,
}: {
  match: AdminMatch;
  home: Side;
  away: Side;
}) {
  return (
    <section
      aria-label="Next match"
      className="relative overflow-hidden rounded-2xl bg-linear-to-br from-navy to-navy-deep p-6 text-white shadow-card sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-brand-gold/10"
      />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 rounded-sm bg-brand-orange px-2 py-1 text-label font-bold uppercase tracking-wide text-ink">
            Next match
          </p>
          <p className="text-sm text-white/80">
            {match.competition.name} · {match.stage}
          </p>
        </div>

        <div className="mt-6 grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <HeroTeam side={home} label="Home" />

          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-display text-5xl font-extrabold leading-none text-brand-gold">
              VS
            </p>
            <div>
              <p className="mb-1 text-label font-bold uppercase tracking-widest text-white/70">
                Kicks off in
              </p>
              <Countdown kickoffAt={match.kickoffAt} />
            </div>
          </div>

          <HeroTeam side={away} label="Away" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
          <div className="space-y-1 text-sm text-white/85">
            <p className="flex items-center gap-2">
              <CalendarDays size={16} aria-hidden className="text-gold-soft" />
              {formatKampalaLongDate(match.kickoffAt)} ·{" "}
              {formatKampalaTime(match.kickoffAt)} EAT
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} aria-hidden className="text-gold-soft" />
              {match.venue ?? "Venue to be confirmed"}
            </p>
          </div>
          <Button href={`/admin/matches/${match.slug}`}>Open match</Button>
        </div>
      </div>
    </section>
  );
}
