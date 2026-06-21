import type { Metadata } from "next";
import { Inter, Faculty_Glyphic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
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
  title: "Credentia: Every document for every step of life",
  description:
    "The document directory for Lagos. Find exactly which documents you need for any life milestone. Completely free.",
  metadataBase: new URL("https://credentia.site"),
  openGraph: {
    title: "Credentia: Every document for every step of life",
    description:
      "The document directory for Lagos. Find exactly which documents you need for any life milestone. Completely free.",
    url: "https://credentia.site",
    siteName: "Credentia",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credentia: Every document for every step of life",
    description:
      "The document directory for Lagos. Find exactly which documents you need for any life milestone. Completely free.",
  },
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
      <body>
        {children}
        <Analytics />
        {/* Microsoft Clarity — session analytics & heatmaps */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xahxn1qvo4");
          `}
        </Script>
      </body>
    </html>
  );
}
