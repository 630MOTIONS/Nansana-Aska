import type { SiteImageKey } from "./site-images-types";

// The places on the website that show a photo chosen in the admin. To add a
// place, add it here and in the API's src/site-images/site-image-slots.ts, then
// read it with getSiteImages() where the photo is shown.
export const siteImageSlots: {
  key: SiteImageKey;
  title: string;
  where: string;
  tip: string;
  href: string;
}[] = [
  {
    key: "about_hero",
    title: "About page: hero photo",
    where: "The large photo beside “More than a game” at the top of the About page.",
    tip: "A wide action or team photo works best. It is shown in a 4:3 frame.",
    href: "/about",
  },
  {
    key: "about_milestone",
    title: "About page: community photo",
    where: "The photo on the left of “Built by the community, for the community”.",
    tip: "A community, training or crowd photo suits this spot.",
    href: "/about",
  },
  {
    key: "contact_hero",
    title: "Contact page: hero photo",
    where: "The photo beside “Get in touch with Nansana ASKA” at the top of the Contact page.",
    tip: "A friendly team or supporters photo works best. It is shown in a 4:3 frame.",
    href: "/contact",
  },
];
