import * as sampleMarket from "@/lib/marketData";

export default function StockTicker({ data = sampleMarket }) {
  const stockTape = data.stockTape || [];
  if (!stockTape.length) return null;

  const loop = [...stockTape, ...stockTape];
  const duration = Math.max(40, stockTape.length * 3);

  return (
    <section className="overflow-hidden rounded-lg border border-[#d9e2ec] bg-[#f4f7fa]">
      <div className="group relative overflow-hidden py-2.5">
        <div
          className="market-ticker-track flex w-max items-stretch gap-2.5 px-2.5"
          style={{ animationDuration: `${duration}s` }}
        >
          {loop.map((item, index) => (
            <article
              key={`${item.symbol}-${index}`}
              className="flex min-w-[168px] shrink-0 items-stretch overflow-hidden rounded-md border border-[#e2e8f0] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
              aria-hidden={index >= stockTape.length || undefined}
            >
              <span className={`w-1 shrink-0 ${item.up ? "bg-[#16a34a]" : "bg-[#dc2626]"}`} aria-hidden="true" />
              <div className="flex min-w-0 flex-1 items-baseline gap-2 px-2.5 py-2">
                <p className="text-[12px] font-bold uppercase tracking-[0.02em] text-navy">{item.symbol}</p>
                <p className="text-[12px] font-semibold tabular-nums text-navy">{item.value}</p>
                <p
                  className={`whitespace-nowrap text-[11px] font-semibold tabular-nums ${
                    item.up ? "text-[#16a34a]" : "text-[#dc2626]"
                  }`}
                >
                  {item.up ? item.change : `-${item.change}`}
                  <span className="ml-0.5">
                    ({item.up ? item.percent : `-${item.percent}`})
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
