import Link from "next/link";
import * as sampleMarket from "@/lib/marketData";

export default function MarketTicker({ data = sampleMarket }) {
  const { liveTickers, marketMeta } = data;
  const loop = [...liveTickers, ...liveTickers];
  const duration = Math.max(28, liveTickers.length * 5);

  return (
    <section className="overflow-hidden rounded-lg border border-[#d9e2ec] bg-white">
      <div className="flex items-center">
        <Link
          href="/markets"
          className="flex shrink-0 items-center gap-2.5 border-r border-[#d9e2ec] px-4 py-4 text-navy"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
          <h2 className="whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.14em]">Markets Live</h2>
        </Link>

        <div className="group relative min-w-0 flex-1 overflow-hidden py-4">
          <div
            className="market-ticker-track flex w-max items-center"
            style={{ animationDuration: `${duration}s` }}
          >
            {loop.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="min-w-[130px] shrink-0 border-r border-[#d9e2ec] px-4"
                aria-hidden={index >= liveTickers.length || undefined}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8b98a8]">{item.name}</p>
                <p className="mt-1 flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="text-[16px] font-bold tabular-nums text-navy sm:text-[18px]">{item.value}</span>
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
        </div>

        <div className="hidden shrink-0 border-l border-[#d9e2ec] px-4 py-4 text-right lg:block">
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
