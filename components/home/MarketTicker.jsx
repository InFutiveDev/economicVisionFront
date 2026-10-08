import Link from "next/link";
import * as sampleMarket from "@/lib/marketData";

export default function MarketTicker({ data = sampleMarket }) {
  const { liveTickers, marketMeta } = data;
  return (
    <section className="bg-white">
      <div className="flex items-center overflow-x-auto rounded-lg border border-[#d9e2ec] px-4 py-4">
        <Link href="/markets" className="flex shrink-0 items-center gap-2.5 border-r border-[#d9e2ec] pr-4 text-navy">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
          <h2 className="whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.14em]">Markets Live</h2>
        </Link>

        <div className="flex min-w-0 flex-1 items-center">
          {liveTickers.map((item) => (
            <article key={item.name} className="min-w-[108px] shrink-0 border-r border-[#d9e2ec] px-4 last:border-r-0 lg:min-w-0 lg:flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8b98a8]">{item.name}</p>
              <p className="mt-1 flex items-baseline gap-1.5 whitespace-nowrap">
                <span className="text-[18px] font-bold tabular-nums text-navy">{item.value}</span>
                <span
                  className={`inline-flex items-center gap-0.5 text-[12px] font-bold tabular-nums ${
                    item.up ? "text-[#16a34a]" : "text-[#dc2626]"
                  }`}
                >
                  <ChangeIcon up={item.up} />
                  {item.percent}
                </span>
              </p>
            </article>
          ))}
        </div>

        <div className="hidden shrink-0 border-l border-[#d9e2ec] pl-4 text-right lg:block">
          <p className="text-[11px] text-slate-700">Updated {marketMeta.updated}</p>
          <p className="mt-1 text-[11px] text-slate-700">{marketMeta.status}</p>
        </div>
      </div>
    </section>
  );
}

function ChangeIcon({ up }) {
  return (
    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
      {up ? <path d="M5 1.2 L9.2 8.5 H.8 Z" /> : <path d="M5 8.8 L9.2 1.5 H.8 Z" />}
    </svg>
  );
}
