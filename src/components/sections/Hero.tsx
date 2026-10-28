import Image from "next/image";
import { CalendarDays, MapPin, Users } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export default function Hero() {
  return (
    <section className="bg-navy pb-28 pt-12 text-white lg:pb-32 lg:pt-16">
      <div className="mx-auto grid w-full max-w-site items-center gap-10 px-4 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="onDark">{siteConfig.tagline}</Badge>
            <Badge variant="onDark">Futsal Super League &bull; FAU</Badge>
          </div>

          <h1 className="mt-6 text-hero">
            Nansana ASKA
            <span className="block text-gold-soft">Futsal Club</span>
          </h1>

          <p className="mt-4 font-display text-hero-sub font-bold uppercase tracking-wide text-white/90">
            Excellence in futsal. Passion for victory. Community pride.
          </p>
          <p className="mt-3 max-w-xl text-white/80">
            The home of Nansana ASKA&rsquo;s men&rsquo;s and women&rsquo;s
            futsal teams, competing with relentless tactical speed and pride
            across Uganda&rsquo;s premier national indoor league.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/matches">View matches</Button>
            <Button
              href="/team"
              variant="secondary"
              icon={<Users size={16} aria-hidden />}
            >
              Meet our teams
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-label font-semibold uppercase tracking-wide text-white/80">
            <li className="inline-flex items-center gap-1.5">
              <MapPin size={14} aria-hidden /> Wakiso District
            </li>
            <li className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden /> Old Kampala Arena
            </li>
          </ul>
        </div>

        <div className="mx-auto w-48 rounded-xl bg-white p-4 shadow-card sm:w-56 lg:w-64">
          <Image
            src={siteConfig.crest}
            alt="Nansana ASKA Futsal Club crest"
            width={499}
            height={500}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
