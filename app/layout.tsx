import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Khalsa | AI Tools for the Sangat",
  description: "I built GurBani Finder because I couldn't keep up at Gurdwara. Point your camera, identify shabads in <3 seconds. Built for me, shared with the Sangat.",
  keywords: ["gurbani", "sikhi", "shabad", "kirtan", "gurmukhi", "OCR", "AI", "sikh app"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
