import type { Metadata } from "next";
import FeaturedHighlight from "@/components/sections/highlights/FeaturedHighlight";
import FollowAction from "@/components/sections/highlights/FollowAction";
import GoalsMoments from "@/components/sections/highlights/GoalsMoments";
import HighlightsCta from "@/components/sections/highlights/HighlightsCta";
import HighlightsHero from "@/components/sections/highlights/HighlightsHero";
import MatchRecaps from "@/components/sections/highlights/MatchRecaps";
import VideoLibrary from "@/components/sections/highlights/VideoLibrary";
import { getHighlights } from "@/lib/public/highlights";

export const metadata: Metadata = {
  title: "Highlights",
  description:
    "Match highlights, goals, recaps and behind-the-scenes video from Nansana ASKA Futsal Club.",
};

export default async function HighlightsPage() {
  const highlights = await getHighlights();

  return (
    <main id="main">
      <HighlightsHero spotlight={highlights.spotlight} />
      <FeaturedHighlight video={highlights.featured} />
      {highlights.videos.length > 0 ? (
        <VideoLibrary videos={highlights.videos} />
      ) : (
        <section id="library" aria-label="Video library" className="bg-surface py-16">
          <p className="mx-auto max-w-site px-4 text-center text-ink-muted">
            Videos will appear here soon. Please check back.
          </p>
        </section>
      )}
      <GoalsMoments videos={highlights.goals} />
      <MatchRecaps videos={highlights.recaps} />
      <FollowAction />
      <HighlightsCta />
    </main>
  );
}
