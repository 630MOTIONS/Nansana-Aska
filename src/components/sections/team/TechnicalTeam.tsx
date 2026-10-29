import Image from "next/image";
import { Shield } from "lucide-react";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import { staff } from "@/lib/team";

export default function TechnicalTeam() {
  return (
    <section
      id="coaches"
      aria-label="The technical team"
      className="scroll-mt-8 bg-surface-tint py-16"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          className="max-w-2xl"
          eyebrow="Leadership & strategy"
          eyebrowTone="gold"
          eyebrowIcon={<Shield size={14} aria-hidden />}
          title="The technical team"
          description="Meet the coaches and tactical staff who guide physical conditioning, team development, and matchday tactical execution across both senior setups."
        />

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((member) => (
            <li key={member.id}>
              <Card as="article" className="flex h-full flex-col">
                <div className="relative aspect-[4/3]">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <MediaPlaceholder className="h-full w-full" />
                  )}
                  <div
                    className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/10 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
                      {member.kicker}
                    </p>
                    <h3 className="text-card text-white">{member.name}</h3>
                  </div>
                </div>
                <div className="flex grow flex-col gap-2 p-4">
                  <p className="text-label font-bold uppercase tracking-widest text-gold-deep">
                    {member.role}
                  </p>
                  <p className="text-sm text-ink-muted">{member.description}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
