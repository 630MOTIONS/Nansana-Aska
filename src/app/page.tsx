import Hero from "@/components/sections/Hero";
import MatchCentre from "@/components/sections/MatchCentre";
import News from "@/components/sections/News";
import Squads from "@/components/sections/Squads";
import StatsStrip from "@/components/sections/StatsStrip";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <StatsStrip />
      <MatchCentre />
      <Squads />
      <News />
    </main>
  );
}
