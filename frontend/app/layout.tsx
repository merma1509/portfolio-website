import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Mugabo - Niyonshuti Martin - Tech Entrepreneur, AI Practitioner, & SpaceTech Enthusiast",
  description: "Portfolio of Mugabo, skilled in AI/ML, IoT, autonomous systems, and SpaceTech. Discover projects like OpenClimate, eNeza Marketplace, Drones, UAVs, and RoutiQ.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-inter antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
