import Image from "next/image";
import { Trophy } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import { standings, standingsUpdatedAfter } from "@/lib/fixtures";
import { siteConfig } from "@/lib/site";

const head =
  "px-3 py-3 text-right text-label font-bold uppercase tracking-wide text-ink-muted";

export default function Standings() {
  return (
    <section aria-label="League standings" className="bg-surface-tint py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          className="max-w-2xl"
          eyebrow="League hierarchy"
          eyebrowTone="gold"
          eyebrowIcon={<Trophy size={14} aria-hidden />}
          title="FAU Futsal Super League standings (top 5)"
        />

        <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-card">
          <table className="w-full min-w-[40rem] text-sm">
            <caption className="sr-only">
              FAU Futsal Super League standings, top five clubs
            </caption>
            <thead className="bg-surface-tint">
              <tr>
                <th scope="col" className={`${head} text-left`}>
                  Pos
                </th>
                <th scope="col" className={`${head} text-left`}>
                  Club
                </th>
                <th scope="col" className={head}>
                  P
                </th>
                <th scope="col" className={head}>
                  W
                </th>
                <th scope="col" className={head}>
                  D
                </th>
                <th scope="col" className={head}>
                  L
                </th>
                <th scope="col" className={head}>
                  GF
                </th>
                <th scope="col" className={head}>
                  GA
                </th>
                <th scope="col" className={head}>
                  GD
                </th>
                <th scope="col" className={head}>
                  Pts
                </th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, index) => {
                const isClub = Boolean(row.team.isClub);
                return (
                  <tr
                    key={row.team.key}
                    className={`border-t border-surface-strong ${
                      isClub ? "bg-surface-tint" : ""
                    }`}
                  >
                    <td
                      className={`px-3 py-3 font-bold text-navy ${
                        isClub ? "border-l-4 border-brand-orange" : ""
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <th
                      scope="row"
                      className="px-3 py-3 text-left font-semibold text-navy"
                    >
                      <span className="inline-flex items-center gap-2">
                        {isClub ? (
                          <Image
                            src={siteConfig.crest}
                            alt=""
                            width={24}
                            height={24}
                          />
                        ) : (
                          <span
                            className="h-2 w-2 rounded-full bg-ink-muted/50"
                            aria-hidden="true"
                          />
                        )}
                        {row.team.name}
                        {isClub && <Badge variant="orange">Pride</Badge>}
                      </span>
                    </th>
                    <td className="px-3 py-3 text-right text-ink-muted">
                      {row.played}
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-navy">
                      {row.w}
                    </td>
                    <td className="px-3 py-3 text-right text-ink-muted">
                      {row.d}
                    </td>
                    <td className="px-3 py-3 text-right text-ink-muted">
                      {row.l}
                    </td>
                    <td className="px-3 py-3 text-right text-ink-muted">
                      {row.gf}
                    </td>
                    <td className="px-3 py-3 text-right text-ink-muted">
                      {row.ga}
                    </td>
                    <td
                      className={`px-3 py-3 text-right font-semibold ${
                        row.gd > 0 ? "text-gold-deep" : "text-ink-muted"
                      }`}
                    >
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </td>
                    <td
                      className={`px-3 py-3 text-right font-display text-xl font-extrabold ${
                        isClub ? "text-gold-deep" : "text-navy"
                      }`}
                    >
                      {row.pts}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="border-t border-surface-strong px-4 py-3 text-label text-ink-muted">
            Last updated after {standingsUpdatedAfter}.
          </p>
        </div>
      </div>
    </section>
  );
}
