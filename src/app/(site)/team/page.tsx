import type { Metadata } from "next";
import ClubIdentity from "@/components/sections/team/ClubIdentity";
import TeamCta from "@/components/sections/team/TeamCta";
import TeamHero from "@/components/sections/team/TeamHero";
import TeamRoster from "@/components/sections/team/TeamRoster";
import TechnicalTeam from "@/components/sections/team/TechnicalTeam";
import { getPlayers, getStaff } from "@/lib/public/people";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the players and coaches of Nansana ASKA Futsal Club, competing in the Uganda Futsal Super League.",
};

export default async function TeamPage() {
  const [players, staff] = await Promise.all([getPlayers(), getStaff()]);

  const squads = new Set(players.map((player) => player.squad)).size;
  const staffCount = staff.technical.length + staff.management.length;

  // Real counts from the admin, not claims.
  const stats = [
    { value: String(players.length), label: "Players", valueClass: "text-navy" },
    {
      value: String(squads),
      label: squads === 1 ? "Squad" : "Squads",
      valueClass: "text-gold-deep",
    },
    {
      value: String(staffCount),
      label: "Coaches & staff",
      valueClass: "text-gold-deep",
    },
  ];

  return (
    <main id="main">
      <TeamHero stats={stats} />
      <TeamRoster players={players} />
      <TechnicalTeam
        id="coaches"
        eyebrow="Leadership & strategy"
        title="The technical team"
        description="Meet the coaches and tactical staff who guide physical conditioning, team development, and matchday tactical execution across both senior setups."
        staff={staff.technical}
      />
      <TechnicalTeam
        id="leadership"
        eyebrow="Club leadership"
        title="The people running the club"
        description="The management behind Nansana ASKA Futsal Club."
        staff={staff.management}
        tone="white"
      />
      <ClubIdentity />
      <TeamCta />
    </main>
  );
}
