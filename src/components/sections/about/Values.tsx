import SectionHeading from "@/components/ui/SectionHeading";
import Tile from "@/components/ui/Tile";
import { values } from "@/lib/about";

export default function Values() {
  return (
    <section aria-label="What we stand for" className="bg-white py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          eyebrow="Ethos & philosophy"
          eyebrowTone="gold"
          title="What we stand for"
          description="Core principles guiding our athletes, coaches, and staff on and off the court."
        />

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <li key={value.title} className="rounded-xl bg-surface-tint p-5">
                <Tile tone={value.tone}>
                  <Icon size={18} aria-hidden />
                </Tile>
                <h3 className="mt-4 text-card text-navy">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{value.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
