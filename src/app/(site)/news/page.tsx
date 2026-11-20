import type { Metadata } from "next";
import { Suspense } from "react";
import ExploreChannels from "@/components/sections/news/ExploreChannels";
import FeaturedStory from "@/components/sections/news/FeaturedStory";
import Newsletter from "@/components/sections/news/Newsletter";
import NewsFeed from "@/components/sections/news/NewsFeed";
import NewsHero from "@/components/sections/news/NewsHero";
import { getPublishedArticles } from "@/lib/public/news";

export const metadata: Metadata = {
  title: "News & Blog",
  description:
    "Official announcements, match reports and club stories from Nansana ASKA Futsal Club.",
};

export default function NewsPage() {
  return (
    <main id="main">
      <Suspense
        fallback={
          <p className="mx-auto min-h-96 max-w-site px-4 py-16 text-center text-ink-muted">
            Loading news…
          </p>
        }
      >
        <NewsContent />
      </Suspense>
      <Newsletter />
      <ExploreChannels />
    </main>
  );
}

// Reads the articles from the API, so it streams in behind the fallback above.
async function NewsContent() {
  const articles = await getPublishedArticles();

  // The featured article, or the newest one when none is featured.
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article.slug !== featured?.slug);
  const latest = rest[0] ?? featured;

  return (
    <>
      <NewsHero latest={latest} featured={featured} />
      {featured && <FeaturedStory story={featured} />}
      {rest.length > 0 ? (
        <NewsFeed articles={rest} />
      ) : (
        <section id="feed" aria-label="All news" className="bg-surface py-12">
          <p className="mx-auto max-w-site px-4 text-center text-ink-muted">
            {featured
              ? "More stories will appear here as they are published."
              : "No news has been published yet. Please check back soon."}
          </p>
        </section>
      )}
    </>
  );
}
