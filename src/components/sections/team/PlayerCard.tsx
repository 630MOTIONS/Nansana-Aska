import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import type { Player } from "@/lib/team";
import { isRemoteImage } from "@/lib/public/media";
import { positionLabels } from "@/lib/public/people-meta";

const roleLabels = {
  captain: "Captain",
  "vice-captain": "Vice captain",
} as const;

export default function PlayerCard({ player }: { player: Player }) {
  const positionLabel = positionLabels[player.position].card;

  return (
    <Card as="article" className="flex h-full flex-col">
      <div className="relative aspect-[3/4]">
        {player.photo ? (
          <Image
            src={player.photo}
            alt={`${player.name}, ${positionLabel}`}
            fill
            unoptimized={isRemoteImage(player.photo)}
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

        {player.role && (
          <Badge
            variant={player.role === "captain" ? "gold" : "tint"}
            className="absolute left-0 top-3 rounded-l-none"
          >
            {roleLabels[player.role]}
          </Badge>
        )}

        {player.number && (
          <p className="absolute right-3 top-3 rounded-sm bg-navy px-2 py-1 font-display text-xl font-extrabold text-white">
            <span className="sr-only">Number </span>#{player.number}
          </p>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
            {positionLabel}
          </p>
          <h3 className="text-card text-white">{player.name}</h3>
        </div>
      </div>

      {player.stats.length > 0 && (
        <dl className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 p-4 text-sm">
          {player.stats.map((stat) => (
            <div key={stat.label} className="flex gap-1">
              <dt className="text-ink-muted">{stat.label}:</dt>
              <dd
                className={`font-bold ${
                  stat.highlight ? "text-gold-deep" : "text-navy"
                }`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Card>
  );
}
