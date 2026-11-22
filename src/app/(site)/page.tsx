import { Suspense } from "react";
import GalleryHighlights from "@/components/sections/GalleryHighlights";
import Hero from "@/components/sections/Hero";
import JoinCta from "@/components/sections/JoinCta";
import MatchCentre from "@/components/sections/MatchCentre";
import News from "@/components/sections/News";
import Partners from "@/components/sections/Partners";
import Squads from "@/components/sections/Squads";
import StatsStrip from "@/components/sections/StatsStrip";
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
      <GalleryHighlights />
      <Partners />
      <JoinCta />
    </main>
  );
}

// Reads the latest articles from the API, so it streams in behind the fallback.
async function LatestNews() {
  const articles = await getPublishedArticles();
  return <News articles={articles.slice(0, 3)} />;
}
