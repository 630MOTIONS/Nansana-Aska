import type { Metadata } from "next";
import FeaturedHighlight from "@/components/sections/highlights/FeaturedHighlight";
import FollowAction from "@/components/sections/highlights/FollowAction";
import GoalsMoments from "@/components/sections/highlights/GoalsMoments";
import HighlightsCta from "@/components/sections/highlights/HighlightsCta";
import HighlightsHero from "@/components/sections/highlights/HighlightsHero";
import MatchRecaps from "@/components/sections/highlights/MatchRecaps";
import VideoLibrary from "@/components/sections/highlights/VideoLibrary";

export const metadata: Metadata = {
  title: "Highlights",
  description:
    "Match highlights, goals, recaps and behind-the-scenes video from Nansana ASKA Futsal Club.",
};

export default function HighlightsPage() {
  return (
    <main id="main">
      <HighlightsHero />
      <FeaturedHighlight />
      <VideoLibrary />
      <GoalsMoments />
      <MatchRecaps />
      <FollowAction />
      <HighlightsCta />
    </main>
  );
}
