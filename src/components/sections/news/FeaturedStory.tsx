import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Article } from "@/lib/articles";
import { isRemoteImage } from "@/lib/public/media";

export default function FeaturedStory({ story }: { story: Article }) {
  return (
    <section aria-label="Featured story" className="bg-surface py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Spotlight chronicle"
            eyebrowTone="gold"
            title="Featured story"
          />
          <p className="text-label font-semibold uppercase tracking-widest text-ink-muted">
            Headline dispatch
          </p>
        </div>

        <Card as="article" className="mt-8 grid lg:grid-cols-[1.3fr_1fr]">
          <div className="relative min-h-72 lg:min-h-[28rem]">
            {story.image ? (
              <Image
                src={story.image}
                alt=""
                fill
                unoptimized={isRemoteImage(story.image)}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            ) : (
              <MediaPlaceholder className="absolute inset-0 h-full w-full" />
            )}
            {story.imageLabel && (
              <Badge variant="navy" className="absolute bottom-4 left-4">
                {story.imageLabel}
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <Badge variant="tint" className="self-start">
              {story.tag}
            </Badge>
            <h3 className="text-section text-navy">{story.title}</h3>
            <p className="text-ink-muted">{story.excerpt}</p>
            <p className="rounded-md bg-surface-tint px-4 py-3 text-label font-semibold uppercase tracking-wide text-ink-muted">
              {story.date}
              {story.author ? ` • By ${story.author}` : ""} • {story.readTime}
            </p>
            <Button
              href={`/news/${story.slug}`}
              variant="dark"
              icon={<ArrowRight size={14} aria-hidden />}
              className="mt-auto w-full"
            >
              Read the full story
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
