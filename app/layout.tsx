import type { Metadata } from "next";
import { Inter, Faculty_Glyphic } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-faculty-glyphic",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Credentia — Every document for every step of life",
  description:
    "The document directory for Lagos. Find exactly which documents you need for any life milestone — free, no agent required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${facultyGlyphic.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
