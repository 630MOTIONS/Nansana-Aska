import { MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { locations } from "@/lib/contact";

export default function FindClub() {
  return (
    <section
      aria-label="Find the club and arena"
      className="bg-surface-tint py-16"
    >
      <div className="mx-auto grid w-full max-w-site items-start gap-10 px-4 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Matchday & secretariat"
            eyebrowTone="gold"
            title="Find the club & arena"
          />
          <ul className="mt-6 space-y-3">
            {locations.map((place) => {
              const Icon = place.icon;
              return (
                <li key={place.label}>
                  <Card className="flex gap-4 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tint text-navy">
                      <Icon size={20} aria-hidden />
                    </span>
                    <div>
                      <p className="text-label font-bold uppercase tracking-widest text-ink-muted">
                        {place.label}
                      </p>
                      <p className="font-display text-card font-extrabold uppercase text-navy">
                        {place.title}
                      </p>
                      <p className="text-sm text-ink-muted">{place.text}</p>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl bg-linear-to-br from-brand-blue to-navy p-8 text-center text-white shadow-card">
          <MapPin size={40} className="text-gold-soft" aria-hidden />
          <p className="font-display text-section font-extrabold uppercase">
            Old Kampala Arena
          </p>
          <p className="text-white/80">Map coming soon.</p>
        </div>
      </div>
    </section>
  );
}
