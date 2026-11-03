import { ArrowRight, ShieldCheck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Photo from "@/components/ui/Photo";
import SectionHeading from "@/components/ui/SectionHeading";
import { squads } from "@/lib/squads";

export default function Squads() {
  return (
    <section aria-label="Our squads" className="bg-surface-tint py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          align="center"
          className="mx-auto max-w-3xl"
          eyebrow="Elite Squads"
          eyebrowIcon={
            <ShieldCheck size={16} className="text-brand-orange" aria-hidden />
          }
          title="Our squads — two teams, one shared ambition"
          description="From high-velocity tactical transitions on the court to empowering the next generation of youth talent in Nansana, our men’s and women’s teams embody our sporting standard."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {squads.map((squad) => (
            <Card key={squad.id} as="article" className="flex flex-col">
              <div className="relative aspect-[16/10]">
                <Photo
                  photo={squad.photo}
                  decorative
                  sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/20 to-transparent"
                  aria-hidden="true"
                />
                <Badge
                  variant={squad.badgeVariant}
                  className="absolute left-4 top-4"
                >
                  {squad.badge}
                </Badge>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
                    {squad.division}
                  </p>
                  <h3 className="text-section text-white">{squad.title}</h3>
                </div>
              </div>

              <div className="flex grow flex-col gap-5 p-5 sm:p-6">
                <p className="text-ink-muted">{squad.description}</p>

                <dl className="grid grid-cols-3 rounded-md bg-surface-tint px-4 py-3 text-center">
                  {squad.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse">
                      <dt className="text-label font-semibold uppercase tracking-wide text-ink-muted">
                        {stat.label}
                      </dt>
                      <dd
                        className={`font-display text-2xl font-extrabold ${
                          stat.highlight ? "text-brand-orange" : "text-navy"
                        }`}
                      >
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Button
                  href={squad.href}
                  variant="dark"
                  className="mt-auto w-full"
                  icon={<ArrowRight size={14} aria-hidden />}
                >
                  {squad.ctaLabel}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
