// Club and league logos in public/images/clubs.
// Club logos are keyed by the team `key` used in src/lib/fixtures.ts.
// Nansana ASKA itself uses the crest from siteConfig, not an entry here.

export type ClubLogo = { src: string; alt: string };

const dir = "/images/clubs";

export const clubLogos: Record<string, ClubLogo> = {
  // Clubs that appear in the sample fixtures and standings.
  "park-fc": { src: `${dir}/park-fc.jpg`, alt: "Park Futsal Club logo" },
  "mengo-city": { src: `${dir}/mengo-city.jpg`, alt: "Mengo Futsal Club logo" },
  "kisenyi-fc": {
    src: `${dir}/kisenyi-fc.jpg`,
    alt: "Kisenyi Futsal Club logo",
  },

  // Logos supplied, but these clubs are not in the sample data yet.
  "cloud-kabuusu-fc": {
    src: `${dir}/cloud-kabuusu-fc.jpg`,
    alt: "Cloud Kabuusu FC logo",
  },
  "crown-fc": { src: `${dir}/crown-fc.jpg`, alt: "Crown FC logo" },
  "edgars-youth-program": {
    src: `${dir}/edgars-youth-program.jpg`,
    alt: "Edgars Youth Program logo",
  },
  "rubaga-grameen": {
    src: `${dir}/rubaga-grameen.jpg`,
    alt: "Rubaga Grameen Futsal Club logo",
  },
  "spak-sport-academy": {
    src: `${dir}/spak-sport-academy.jpg`,
    alt: "SPAK Sport Academy logo",
  },
};

// Not used on any page yet.
export const leagueLogos = {
  fau: { src: `${dir}/fau.jpg`, alt: "Futsal Association Uganda logo" },
  superLeague: {
    src: `${dir}/futsal-super-league.jpg`,
    alt: "Futsal Super League logo",
  },
} satisfies Record<string, ClubLogo>;

export function getClubLogo(key: string): ClubLogo | undefined {
  return clubLogos[key];
}
