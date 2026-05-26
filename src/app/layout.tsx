import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update this to reflect your new SaaS brand identity
export const metadata: Metadata = {
  title: "ClearRack | Instant Single-Item Boutique Commerce",
  description:
    "The premium multi-tenant operating system for curated thrift collections, streetwear drops, and 1-of-1 boutique inventory serialization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Kept min-h-full and added bg-zinc-50 as a clean, corporate background default 
        that works beautifully for both your admin dashboards and marketplace grids.
      */}
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
