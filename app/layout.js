import { Inter, Noto_Serif } from "next/font/google";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { buildNavLinks } from "@/components/layout/navLinks";
import SubscribeDialog from "@/components/subscribe/SubscribeDialog";
import StoreProvider from "@/lib/redux/StoreProvider";
import { getNavCategories } from "@/lib/cms";
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

export default async function RootLayout({ children }) {
  const links = buildNavLinks(await getNavCategories());

  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col bg-background font-sans text-foreground`}>
        <StoreProvider>
          <Header links={links} />
          <Navbar links={links} />
          <div className="flex-1">{children}</div>
          <Footer />
          <SubscribeDialog />
        </StoreProvider>
      </body>
    </html>
  );
}
