import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  title: "Detroit Rental Properties | Michigan Real Estate for Canadian Investors",
  description: "Invest in Detroit rental properties and Michigan real estate. Turnkey properties with Section 8 tenants perfect for Canadians investing in the USA. Guaranteed positive cash flow and high ROI.",
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
            <Footer />
          </PropertyProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
