import Link from "next/link";
import { marketToday, sectors, topGainers, topLosers } from "@/lib/marketData";

export const metadata = {
  title: "Market Hub | EconomicVision",
  description: "Live market snapshot of indices, gainers, losers and sector performance.",
};

export default function MarketsPage() {
  return (
    <main className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-8xl px-4 py-8 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Markets</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy">Market Hub</h1>
        <p className="mt-2 text-sm text-slate-600">Indices, movers and sector performance.</p>

        <section className="mt-6 border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Market Today</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {marketToday.map((item) => (
              <div key={item.name} className="border-b border-slate-200 px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-navy">{item.name}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-navy">{item.value}</p>
                <p className={`mt-1.5 text-sm font-bold tabular-nums ${item.up ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                  {item.up ? "↑" : "↓"} {item.change}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <HubColumn title="Top Gainers" rows={topGainers} showPrice />
          <HubColumn title="Top Losers" rows={topLosers} showPrice />
          <HubColumn title="Sectors" rows={sectors} />
        </div>

        <Link href="/" className="mt-8 inline-block text-sm font-semibold text-brand-red hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

function HubColumn({ title, rows, showPrice = false }) {
  return (
    <section className="border border-slate-200 bg-white p-5">
      <h2 className="border-b-[3px] border-brand-red pb-2 text-[15px] font-bold uppercase tracking-[0.14em] text-navy">
        {title}
      </h2>
      <ul className="mt-1">
        {rows.map((row) => (
          <li key={row.name} className="flex items-baseline justify-between gap-3 border-b border-slate-100 py-3 last:border-b-0">
            <div className="min-w-0">
              <p className="truncate font-semibold text-navy">{row.name}</p>
              {showPrice && row.value ? <p className="mt-0.5 text-sm tabular-nums text-slate-500">{row.value}</p> : null}
            </div>
            <span className={`text-sm font-bold tabular-nums ${row.up ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
              {row.change}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
