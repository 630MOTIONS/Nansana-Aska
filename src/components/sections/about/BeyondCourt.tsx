import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import { communityMoments } from "@/lib/about";

export default function BeyondCourt() {
  return (
    <section aria-label="Beyond the court" className="bg-surface py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            className="max-w-xl"
            eyebrow="Community & culture"
            eyebrowTone="gold"
            title="Beyond the court"
            description="Explore the moments, activities and experiences that form part of the club’s journey in Wakiso District."
          />
          <Button href="/gallery" icon={<ArrowRight size={14} aria-hidden />}>
            Explore our gallery
          </Button>
        </div>

        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {communityMoments.map((moment) => (
            <li
              key={moment.title}
              className="relative overflow-hidden rounded-xl shadow-card"
            >
              <MediaPlaceholder className="aspect-[4/3]" />
              <div
                className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/10 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
                  {moment.kicker}
                </p>
                <h3 className="text-card text-white">{moment.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
