import type { Metadata } from "next";
import MatchesCta from "@/components/sections/matches/MatchesCta";
import MatchesExplore from "@/components/sections/matches/MatchesExplore";
import MatchesExplorer from "@/components/sections/matches/MatchesExplorer";
import MatchesHero from "@/components/sections/matches/MatchesHero";
import Standings from "@/components/sections/matches/Standings";

export const metadata: Metadata = {
  title: "Matches",
  description:
    "Fixtures, results and standings for Nansana ASKA Futsal Club in the Uganda Futsal Super League.",
};

export default function MatchesPage() {
  return (
    <main id="main">
      <MatchesHero />
      <MatchesExplorer />
      <Standings />
      <MatchesExplore />
      <MatchesCta />
    </main>
  );
}
