import GalleryHighlights from "@/components/sections/GalleryHighlights";
import Hero from "@/components/sections/Hero";
import JoinCta from "@/components/sections/JoinCta";
import MatchCentre from "@/components/sections/MatchCentre";
import News from "@/components/sections/News";
import Partners from "@/components/sections/Partners";
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
      <GalleryHighlights />
      <Partners />
      <JoinCta />
    </main>
  );
}
