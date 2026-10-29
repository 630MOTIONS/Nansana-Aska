import { ArrowRight, Check } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { leadership } from "@/lib/about";
import type { Tone } from "@/components/ui/Tile";

const checkTones: Record<Tone, string> = {
  gold: "bg-brand-gold text-ink",
  blue: "bg-brand-blue text-white",
  orange: "bg-brand-orange text-ink",
  navy: "bg-navy text-white",
};

export default function Leadership() {
  return (
    <section
      aria-label="Leadership and technical staff"
      className="bg-surface-strong py-16"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            className="max-w-xl"
            eyebrow="Leadership & technical staff"
            title="Meet the people behind the club"
            description="A club is built by the people who contribute their time, effort and commitment to its journey."
          />
          <Button
            href="/team"
            variant="light"
            icon={<ArrowRight size={14} aria-hidden />}
          >
            View complete roster
          </Button>
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((person) => {
            const Icon = person.icon;
            return (
              <li key={`${person.role}-${person.scope}`}>
                <Card className="flex h-full flex-col items-center gap-1 p-6 text-center">
                  <span className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-xl bg-surface-tint text-navy">
                    <Icon size={28} aria-hidden />
                    <span
                      className={`absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full ${checkTones[person.tone]}`}
                      aria-hidden="true"
                    >
                      <Check size={12} />
                    </span>
                  </span>
                  <h3 className="text-card text-navy">{person.role}</h3>
                  <p className="text-label font-semibold uppercase tracking-wide text-ink-muted">
                    {person.scope}
                  </p>
                  <Badge className="mt-2">{person.tag}</Badge>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
