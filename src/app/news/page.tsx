import type { Metadata } from "next";
import ExploreChannels from "@/components/sections/news/ExploreChannels";
import FeaturedStory from "@/components/sections/news/FeaturedStory";
import Newsletter from "@/components/sections/news/Newsletter";
import NewsFeed from "@/components/sections/news/NewsFeed";
import NewsHero from "@/components/sections/news/NewsHero";

export const metadata: Metadata = {
  title: "News & Blog",
  description:
    "Official announcements, match reports and club stories from Nansana ASKA Futsal Club.",
};

export default function NewsPage() {
  return (
    <main id="main">
      <NewsHero />
      <FeaturedStory />
      <NewsFeed />
      <Newsletter />
      <ExploreChannels />
    </main>
  );
}
