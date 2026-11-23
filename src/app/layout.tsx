import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

const barlowCondensed = localFont({
  variable: "--font-barlow-condensed",
  display: "swap",
  src: [
    {
      path: "./fonts/barlow-condensed-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/barlow-condensed-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Nansana ASKA Futsal Club",
    template: "%s | Nansana ASKA Futsal Club",
  },
  description:
    "Official website of Nansana ASKA Futsal Club, competing in the Uganda Futsal Super League.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}