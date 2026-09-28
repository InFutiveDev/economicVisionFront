import EconomyBusiness from "@/components/home/EconomyBusiness";
import MoneySection from "@/components/home/MoneySection";
import MarketsInFocus from "@/components/home/MarketsInFocus";
import MarketOverview from "@/components/home/MarketOverview";
import CurrencyWatch from "@/components/home/CurrencyWatch";
import CommodityWatch from "@/components/home/CommodityWatch";
import MarketCalendar from "@/components/home/MarketCalendar";

export const metadata = {
  title: "Insights | The Economic Vision",
  description: "Economy, business, money and markets — with live data on the side.",
};

export default function InsightsPage() {
  return (
    <main>
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Insights</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy">Economy, Business, Money & Markets</h1>
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-10">
            <EconomyBusiness />
            <MoneySection />
            <MarketsInFocus />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-16">
            <MarketOverview />
            <CurrencyWatch />
            <CommodityWatch />
            <MarketCalendar />
          </aside>
        </div>
      </div>
    </main>
  );
}
