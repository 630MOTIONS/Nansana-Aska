import { Shield } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Photo from "@/components/ui/Photo";
import SectionHeading from "@/components/ui/SectionHeading";
import { identityPoints } from "@/lib/about";
import { photos } from "@/lib/photos";

export default function WhoWeAre() {
  return (
    <section aria-label="Who we are" className="bg-white py-16">
      <div className="mx-auto grid w-full max-w-site items-center gap-10 px-4 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            <Photo
              photo={photos.fullTeam}
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <Badge
            variant="gold"
            className="absolute -bottom-3 right-4 px-3 py-2 shadow-card"
          >
            <Shield size={14} aria-hidden /> Pride of Wakiso
          </Badge>
        </div>

        <div>
          <SectionHeading
            eyebrow="Identity & roots"
            eyebrowTone="gold"
            title="Who we are"
            description="Nansana ASKA Futsal Club is a futsal club whose story, people and ambitions define its identity. Representing Nansana Municipality and Wakiso District in Uganda’s premier national indoor futsal circuit, the club unites grassroots passion with top-flight competitive dedication."
          />

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {identityPoints.map((point) => {
              const Icon = point.icon;
              return (
                <li
                  key={point.title}
                  className="rounded-lg bg-surface-tint p-4"
                >
                  <Icon size={18} className="text-gold-deep" aria-hidden />
                  <h3 className="mt-2 font-sans text-sm font-bold uppercase tracking-wide text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">{point.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
