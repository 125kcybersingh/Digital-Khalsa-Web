import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Digital Khalsa | AI Tools for the Sangat",
  description: "I built GurBani Finder because I couldn't keep up at Gurdwara. Point your camera, identify shabads in <3 seconds. Built for me, shared with the Sangat.",
  keywords: ["gurbani", "sikhi", "shabad", "kirtan", "gurmukhi", "OCR", "AI", "sikh app", "guru granth sahib"],
  openGraph: {
    title: "Digital Khalsa - Built for Me, Shared with the Sangat",
    description: "GurBani Finder: Shazam for Kirtan. Identify shabads in real-time with AI.",
    url: "https://digitalkhalsa.com",
    siteName: "Digital Khalsa",
    images: [
      {
        url: "https://digitalkhalsa.com/dk-og.png",
        width: 1200,
        height: 630,
        alt: "Digital Khalsa - AI Tools for the Sangat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@125kCyberSingh",
    creator: "@125kCyberSingh",
    title: "GurBani Finder - Launching Jan 5",
    description: "I couldn't keep up at Gurdwara. So I built this. If it helps you, that's Guru Ji's kirpa.",
    images: ["https://digitalkhalsa.com/dk-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Persistent Launch Banner */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#FF9933] to-[#000080] text-white text-center py-2 px-4">
          <p className="text-sm md:text-base font-semibold">
            Launching Jan 5, 2026 (Guru Gobind Singh Ji's Birthday)
          </p>
        </div>
        <Navigation />
        <div className="pt-24 md:pt-28">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
