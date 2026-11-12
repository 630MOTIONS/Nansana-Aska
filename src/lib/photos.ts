// Club photos in public/images. Change a path or crop here and every page
// that uses the photo follows.
//
// "position" is the CSS object-position used when a photo is cropped into a
// wide frame. The women's team photo is a tall poster, so it is focused on
// the players' faces. Adjust the others once you have seen them in the browser.

export type PhotoAsset = {
  src: string;
  alt: string;
  position?: string;
};

export const photos = {
  fullTeam: {
    src: "/images/full-team.jpeg",
    alt: "The full Nansana ASKA squad together",
    position: "center",
  },
  menTeam: {
    src: "/images/men-team.jpeg",
    alt: "Nansana ASKA men’s senior team",
    position: "center",
  },
  womenTeam: {
    src: "/images/women-team.jpeg",
    alt: "Nansana ASKA women’s team in green jerseys, posing together",
    position: "center 35%",
  },
} satisfies Record<string, PhotoAsset>;
