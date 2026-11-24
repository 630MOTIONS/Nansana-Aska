import { ArrowRight, UserRound } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Image from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import type { StaffMember } from "@/lib/team";

// Club leadership first, then the technical team (the page passes them in that
// order).
export default function Leadership({ people }: { people: StaffMember[] }) {
  if (people.length === 0) return null;

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
          {people.map((person) => (
            <li key={person.id}>
              <Card as="article" className="flex h-full flex-col">
                <div className="relative aspect-[4/5] bg-surface-tint">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt={`${person.name}, ${person.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-navy/40">
                      <UserRound size={56} aria-hidden />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 p-5 text-center">
                  <h3 className="text-card text-navy">{person.name}</h3>
                  <p className="text-label font-semibold uppercase tracking-wide text-ink-muted">
                    {person.role}
                  </p>
                  {person.kicker && (
                    <p className="mx-auto mt-2 rounded-sm bg-surface-tint px-2 py-1 text-label font-bold uppercase tracking-wide text-navy">
                      {person.kicker}
                    </p>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
