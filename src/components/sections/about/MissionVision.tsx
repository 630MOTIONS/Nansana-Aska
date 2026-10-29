import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { missionVision } from "@/lib/about";

export default function MissionVision() {
  return (
    <section aria-label="Mission and vision" className="bg-surface py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          align="center"
          eyebrow="Core aspirations"
          eyebrowTone="gold"
          title="Mission & vision"
        />

        <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
          {missionVision.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} as="article" className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.tileClass}`}
                  >
                    <Icon size={22} aria-hidden />
                  </span>
                  <span
                    className={`rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${item.tagClass}`}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="mt-6 text-section text-brand-blue">
                  {item.title}
                </h3>
                <p className="mt-3 text-ink-muted">{item.text}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
