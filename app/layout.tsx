import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Mrs_Saint_Delafield,
  Fraunces,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const delafield = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-delafield",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Benjamin & Rofamae — September 23, 2026",
  description:
    "You are cordially invited to the wedding of Benjamin Campbell & Rofamae Blase — September 23, 2026, Eagle's Ridge, Diversion Road, Davao City.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${delafield.variable} ${fraunces.variable} ${greatVibes.variable} font-serif text-[19px] leading-relaxed antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
