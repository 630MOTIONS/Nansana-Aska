import type { Metadata } from "next";
import ClubIdentity from "@/components/sections/team/ClubIdentity";
import TeamCta from "@/components/sections/team/TeamCta";
import TeamHero from "@/components/sections/team/TeamHero";
import TeamRoster from "@/components/sections/team/TeamRoster";
import TechnicalTeam from "@/components/sections/team/TechnicalTeam";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the players and coaches of Nansana ASKA Futsal Club, competing in the Uganda Futsal Super League.",
};

export default function TeamPage() {
  return (
    <main id="main">
      <TeamHero />
      <TeamRoster />
      <TechnicalTeam />
      <ClubIdentity />
      <TeamCta />
    </main>
  );
}
