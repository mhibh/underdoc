import type { Metadata } from "next";
import { Playfair_Display, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import TickerBar from "@/components/TickerBar";
import Navbar from "@/components/Navbar";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Underdoc — Kasus yang Tidak Boleh Hilang",
  description:
    "Platform independen pemantauan pelanggaran HAM, kesewenangan aparat, dan kriminalisasi aktivis di Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${playfairDisplay.variable} ${dmMono.variable} ${dmSans.variable} antialiased`}
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        <TickerBar />
        <Navbar />
        {children}
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
