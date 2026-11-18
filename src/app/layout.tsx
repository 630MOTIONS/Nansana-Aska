import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nansana ASKA Futsal Club",
    template: "%s | Nansana ASKA Futsal Club",
  },
  description:
    "Official website of Nansana ASKA Futsal Club, competing in the Uganda Futsal Super League.",
  // The site is kept out of search engines until ALLOW_INDEXING=1 is set,
  // which should only happen at the real launch.
  robots:
    process.env.ALLOW_INDEXING === "1"
      ? undefined
      : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
