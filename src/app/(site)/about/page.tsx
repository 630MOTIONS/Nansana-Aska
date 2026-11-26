import type { Metadata } from "next";
import { Suspense } from "react";
import AboutCta from "@/components/sections/about/AboutCta";
import AboutHero from "@/components/sections/about/AboutHero";
import BeyondCourt from "@/components/sections/about/BeyondCourt";
import Journey from "@/components/sections/about/Journey";
import Leadership from "@/components/sections/about/Leadership";
import MissionVision from "@/components/sections/about/MissionVision";
import Values from "@/components/sections/about/Values";
import WhoWeAre from "@/components/sections/about/WhoWeAre";
import { getGallery } from "@/lib/public/gallery";
import { getStaff } from "@/lib/public/people";
import { getSiteImages } from "@/lib/public/site-images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Nansana ASKA Futsal Club: its story, mission, values and the people behind the club.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <Suspense fallback={<AboutHero />}>
        <HeroSlot />
      </Suspense>
      <WhoWeAre />
      <Suspense fallback={<Journey />}>
        <JourneySlot />
      </Suspense>
      <MissionVision />
      <Values />
      <Suspense fallback={<div className="min-h-96 bg-surface-strong" aria-hidden="true" />}>
        <ClubPeople />
      </Suspense>
      <Suspense fallback={<div className="min-h-96" aria-hidden="true" />}>
        <ClubMoments />
      </Suspense>
      <AboutCta />
    </main>
  );
}

// These read from the database, so they stream in behind their placeholders.
// The placeholders are the same sections without a photo.
async function HeroSlot() {
  const images = await getSiteImages();
  return <AboutHero image={images.about_hero} />;
}

async function JourneySlot() {
  const images = await getSiteImages();
  return <Journey milestoneImage={images.about_milestone} />;
}

async function ClubPeople() {
  const staff = await getStaff();
  return (
    <Leadership
      people={[...staff.management, ...staff.technical].slice(0, 8)}
    />
  );
}

async function ClubMoments() {
  const gallery = await getGallery();
  return <BeyondCourt photos={gallery.items} />;
}
