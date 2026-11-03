import Badge from "@/components/ui/Badge";
import Photo from "@/components/ui/Photo";
import { identityStats } from "@/lib/team";
import { photos } from "@/lib/photos";

export default function ClubIdentity() {
  return (
    <section
      aria-label="Community and athletic identity"
      className="bg-surface py-16"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <div className="grid items-center gap-10 rounded-2xl bg-navy p-8 text-white shadow-card lg:grid-cols-2 lg:p-12">
          <div>
            <Badge variant="onDark">Community & athletic identity</Badge>
            <h2 className="mt-5 text-hero">
              One club.
              <span className="block text-gold-soft">One purpose.</span>
            </h2>
            <p className="mt-4 text-hero-sub text-white/85">
              From our youth academy courts in Wakiso District to the national
              lights of Old Kampala Sports Arena, every player and coach
              embodies a collective standard: unwavering discipline, fearless
              movement, and pure pride in representing Nansana.
            </p>

            <dl className="mt-8 flex flex-wrap gap-6">
              {identityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse border-l-2 border-brand-orange pl-3"
                >
                  <dt className="text-label font-semibold uppercase tracking-wide text-white/70">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-2xl font-extrabold uppercase">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Photo
              photo={photos.fullTeam}
              sizes="(min-width: 1024px) 520px, 100vw"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-transparent to-transparent"
              aria-hidden="true"
            />
            <p className="absolute inset-x-0 bottom-0 p-4 text-label font-semibold uppercase tracking-wide text-white">
              “Wakiso’s heartbeat on the indoor court”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
