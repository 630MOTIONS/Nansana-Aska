import { ScrollText } from "lucide-react";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import Tile from "@/components/ui/Tile";
import { milestone, timeline } from "@/lib/about";

export default function Journey() {
  return (
    <section
      aria-label="Our story and journey"
      className="bg-surface-tint py-16"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          eyebrow="The evolution"
          eyebrowTone="gold"
          className="max-w-xl"
          title="Our story & journey"
          description="Every club has a journey. Discover the moments, people and experiences that have shaped Nansana ASKA Futsal Club."
        />

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((item) => (
            <li key={item.step}>
              <Card className="flex h-full flex-col gap-3 p-5">
                <Tile tone={item.tone} size="sm">
                  {item.step}
                </Tile>
                <h3 className="text-card text-navy">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.text}</p>
                <p
                  className={`mt-auto pt-4 text-label font-bold uppercase tracking-widest ${item.labelClass}`}
                >
                  {item.label}
                </p>
              </Card>
            </li>
          ))}
        </ol>

        <Card className="mt-6 grid md:grid-cols-[1fr_1.6fr]">
          <MediaPlaceholder className="min-h-56" />
          <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 text-label font-bold uppercase tracking-widest text-gold-deep">
              <ScrollText size={14} aria-hidden />
              {milestone.eyebrow}
            </p>
            <h3 className="text-section text-navy">{milestone.title}</h3>
            <p className="text-ink-muted">{milestone.text}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
