import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";
import SessionMonitor from "@/components/SessionMonitor";
import SessionValidator from "@/components/SessionValidator";
import { PropertyProvider } from "@/contexts/PropertyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PropertyHub - Detroit Real Estate Investment",
  description: "Discover high-ROI turnkey real estate properties in Detroit. Above average returns with positive cash flow in 90 days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <PropertyProvider>
            <SessionValidator />
            <SessionMonitor />
            <Navbar />
            {children}
          </PropertyProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
