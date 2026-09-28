import { Inter, Noto_Serif } from "next/font/google";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata = {
  title: "EconomicVision | Financial News for a Smarter Tomorrow",
  description:
    "Latest financial news, market updates, economy, business and personal finance coverage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col bg-background font-sans text-foreground`}>
        <Header />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
