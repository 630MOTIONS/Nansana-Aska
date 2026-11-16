import type { Metadata } from "next";
import AboutCta from "@/components/sections/about/AboutCta";
import AboutHero from "@/components/sections/about/AboutHero";
import BeyondCourt from "@/components/sections/about/BeyondCourt";
import Journey from "@/components/sections/about/Journey";
import Leadership from "@/components/sections/about/Leadership";
import MissionVision from "@/components/sections/about/MissionVision";
import Values from "@/components/sections/about/Values";
import WhoWeAre from "@/components/sections/about/WhoWeAre";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Nansana ASKA Futsal Club: its story, mission, values and the people behind the club.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <AboutHero />
      <WhoWeAre />
      <Journey />
      <MissionVision />
      <Values />
      <Leadership />
      <BeyondCourt />
      <AboutCta />
    </main>
  );
}
