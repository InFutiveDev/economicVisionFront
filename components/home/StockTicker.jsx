import * as sampleMarket from "@/lib/marketData";

export default function StockTicker({ data = sampleMarket }) {
  const stockTape = data.stockTape || [];
  if (!stockTape.length) return null;

  const loop = [...stockTape, ...stockTape];
  const duration = Math.max(40, stockTape.length * 3);

  return (
    <section className="overflow-hidden rounded-lg border border-[#d9e2ec] bg-[#f4f7fa]">
      <div className="flex items-stretch">
        <div className="group relative min-w-0 flex-1 overflow-hidden py-2.5">
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

        <a
          href="/api/market/stocks-pdf"
          download
          className="flex shrink-0 items-center gap-1.5 border-l border-[#d9e2ec] bg-white px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-navy transition hover:bg-[#f8fafc] hover:text-brand-red"
          title="Download live stocks PDF"
        >
          <PdfIcon />
          PDF
        </a>
      </div>
    </section>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M4 1.5h5.5L13 5v9.5H4v-13Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9.5 1.5V5H13" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 9h4M6 11.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
