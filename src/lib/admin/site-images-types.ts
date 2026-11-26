export type SiteImageKey = "about_hero" | "about_milestone" | "contact_hero";

export type AdminSiteImage = {
  key: SiteImageKey;
  // Relative to the API, for example /media/<id>.
  imageUrl: string;
  alt: string;
  updatedAt: string;
};
