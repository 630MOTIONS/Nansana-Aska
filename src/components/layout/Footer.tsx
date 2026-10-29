import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Trophy } from "lucide-react";
import Badge from "@/components/ui/Badge";
import {
  clubInfo,
  footerClubLinks,
  footerMatchLinks,
  siteConfig,
} from "@/lib/site";

const columnHeading =
  "border-b border-white/15 pb-2 font-display text-xl font-extrabold uppercase text-gold-soft";
const linkClass = "text-white/80 transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="border-b border-white/10 bg-white/5">
        <div className="mx-auto flex w-full max-w-site flex-wrap items-center justify-between gap-2 px-4 py-3 text-label font-semibold">
          <p className="inline-flex items-center gap-2 uppercase tracking-wide">
            <Trophy size={16} className="text-gold-soft" aria-hidden />
            {clubInfo.membership}
          </p>
          <p className="text-white/80">Home ground: {clubInfo.homeGround}</p>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-site gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="rounded-md bg-white p-1">
              <Image src={siteConfig.crest} alt="" width={40} height={40} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl font-extrabold uppercase">
                {siteConfig.name}
              </span>
              <span className="mt-1 text-[0.625rem] font-bold uppercase tracking-widest text-gold-soft">
                {siteConfig.tagline}
              </span>
            </span>
          </Link>
          <p className="text-sm text-white/80">{clubInfo.blurb}</p>
          <Badge variant="onDark">{clubInfo.affiliation}</Badge>
        </div>

        <nav aria-label="Club pages">
          <h2 className={columnHeading}>Club pages</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerClubLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Match centre">
          <h2 className={columnHeading}>Match centre</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerMatchLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={columnHeading}>Contact & training</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin
                size={16}
                className="mt-0.5 shrink-0 text-gold-soft"
                aria-hidden
              />
              {clubInfo.location}
            </li>
            <li className="flex gap-2">
              <Building2
                size={16}
                className="mt-0.5 shrink-0 text-gold-soft"
                aria-hidden
              />
              {clubInfo.homeGround} • Matchday venue
            </li>
            <li>
              <Link
                href="/contact"
                className="font-bold uppercase tracking-wide text-gold-soft hover:text-white"
              >
                Get in touch →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-navy-deep">
        <div className="mx-auto flex w-full max-w-site flex-wrap items-center justify-between gap-2 px-4 py-4 text-label text-white/80">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.fullName}. All rights
            reserved. Crafted in partnership with 630 Motions.
          </p>
          <p className="font-bold uppercase tracking-wide text-gold-soft">
            {clubInfo.affiliation} affiliated
          </p>
        </div>
      </div>
    </footer>
  );
}
