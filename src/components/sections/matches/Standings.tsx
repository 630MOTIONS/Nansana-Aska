import { Trophy } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamLogo from "@/components/ui/TeamLogo";
import type { PublicStandings } from "@/lib/public/standings";

const headBase =
  "px-3 py-3 text-label font-bold uppercase tracking-wide text-ink-muted";
const headLeft = `${headBase} text-left`;
const headRight = `${headBase} text-right`;

export default function Standings({ data }: { data: PublicStandings | null }) {
  if (!data || data.rows.length === 0) {
    return (
      <section aria-label="League standings" className="bg-surface-tint py-16">
        <div className="mx-auto w-full max-w-site px-4">
          <SectionHeading
            className="max-w-2xl"
            eyebrow="League hierarchy"
            eyebrowTone="gold"
            eyebrowIcon={<Trophy size={14} aria-hidden />}
            title="League standings"
          />
          <p className="mt-6 rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
            The league table will appear here once the competition has been set
            up.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="League standings" className="bg-surface-tint py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          className="max-w-2xl"
          eyebrow="League hierarchy"
          eyebrowTone="gold"
          eyebrowIcon={<Trophy size={14} aria-hidden />}
          title={`${data.competitionName} standings`}
          description={data.season}
        />

        <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-card">
          <table className="w-full min-w-[40rem] text-sm">
            <caption className="sr-only">
              {data.competitionName} standings, {data.season}
            </caption>
            <thead className="bg-surface-tint">
              <tr>
                <th scope="col" className={headLeft}>Pos</th>
                <th scope="col" className={headLeft}>Club</th>
                <th scope="col" className={headRight}>P</th>
                <th scope="col" className={headRight}>W</th>
                <th scope="col" className={headRight}>D</th>
                <th scope="col" className={headRight}>L</th>
                <th scope="col" className={headRight}>GF</th>
                <th scope="col" className={headRight}>GA</th>
                <th scope="col" className={headRight}>GD</th>
                <th scope="col" className={headRight}>Pts</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr
                  key={row.slug}
                  className={`border-t border-surface-strong ${
                    row.isOurs ? "bg-surface-tint" : ""
                  }`}
                >
                  <td
                    className={`px-3 py-3 font-bold text-navy ${
                      row.isOurs ? "border-l-4 border-brand-orange" : ""
                    }`}
                  >
                    {String(row.position).padStart(2, "0")}
                  </td>
                  <th
                    scope="row"
                    className="px-3 py-3 text-left font-semibold text-navy"
                  >
                    <span className="inline-flex items-center gap-2">
                      <TeamLogo
                        name={row.name}
                        isClub={row.isOurs}
                        logo={row.logo ?? undefined}
                        size="sm"
                      />
                      {row.name}
                      {row.isOurs && <Badge variant="orange">Pride</Badge>}
                    </span>
                  </th>
                  <td className="px-3 py-3 text-right text-ink-muted">{row.played}</td>
                  <td className="px-3 py-3 text-right font-semibold text-navy">{row.won}</td>
                  <td className="px-3 py-3 text-right text-ink-muted">{row.drawn}</td>
                  <td className="px-3 py-3 text-right text-ink-muted">{row.lost}</td>
                  <td className="px-3 py-3 text-right text-ink-muted">{row.goalsFor}</td>
                  <td className="px-3 py-3 text-right text-ink-muted">{row.goalsAgainst}</td>
                  <td
                    className={`px-3 py-3 text-right font-semibold ${
                      row.goalDifference > 0 ? "text-gold-deep" : "text-ink-muted"
                    }`}
                  >
                    {row.goalDifference > 0
                      ? `+${row.goalDifference}`
                      : row.goalDifference}
                  </td>
                  <td
                    className={`px-3 py-3 text-right font-display text-xl font-extrabold ${
                      row.isOurs ? "text-gold-deep" : "text-navy"
                    }`}
                  >
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-surface-strong px-4 py-3 text-label text-ink-muted">
            {data.lastMatchday
              ? `Last updated after Matchday ${data.lastMatchday}.`
              : "Updated from the latest results."}
          </p>
        </div>
      </div>
    </section>
  );
}
