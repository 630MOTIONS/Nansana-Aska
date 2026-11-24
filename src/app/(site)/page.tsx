import { Suspense } from "react";
import GalleryHighlights from "@/components/sections/GalleryHighlights";
import Hero from "@/components/sections/Hero";
import JoinCta from "@/components/sections/JoinCta";
import MatchCentre from "@/components/sections/MatchCentre";
import News from "@/components/sections/News";
import Partners from "@/components/sections/Partners";
import Squads from "@/components/sections/Squads";
import StatsStrip from "@/components/sections/StatsStrip";
import { getHighlights } from "@/lib/public/highlights";
import { getPublishedArticles } from "@/lib/public/news";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <StatsStrip />
      <MatchCentre />
      <Squads />
      <Suspense fallback={<div className="min-h-96" aria-hidden="true" />}>
        <LatestNews />
      </Suspense>
      <Suspense fallback={<div className="min-h-96 bg-navy-deep" aria-hidden="true" />}>
        <LatestVideos />
      </Suspense>
      <Partners />
      <JoinCta />
    </main>
  );
}

// These read from the database, so they stream in behind their placeholders.
async function LatestNews() {
  const articles = await getPublishedArticles();
  return <News articles={articles.slice(0, 3)} />;
}

async function LatestVideos() {
  const highlights = await getHighlights();
  return <GalleryHighlights videos={highlights.videos.slice(0, 3)} />;
}
