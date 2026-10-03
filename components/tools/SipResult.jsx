import { formatInr } from "@/lib/calculators";

export default function SipResult({ invested, returns, total }) {
  const investedShare = total > 0 ? (invested / total) * 100 : 0;
  const returnsShare = Math.max(0, 100 - investedShare);

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Estimated corpus</p>
      <p className="mt-1 font-serif text-[34px] font-bold leading-none tabular-nums text-navy sm:text-[40px]">
        {formatInr(total)}
      </p>
      <p className="mt-2 text-[13px] text-slate-500">{formatInr(total, { compact: true })} at the end of the tenure</p>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className="flex h-full">
          <span className="h-full bg-navy" style={{ width: `${investedShare}%` }} />
          <span className="h-full bg-[#16a34a]" style={{ width: `${returnsShare}%` }} />
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ResultStat label="Invested amount" value={formatInr(invested)} swatch="bg-navy" />
        <ResultStat label="Est. returns" value={formatInr(returns)} swatch="bg-[#16a34a]" tone="gain" />
      </dl>
    </div>
  );
}

function ResultStat({ label, value, swatch, tone }) {
  return (
    <div className="border border-slate-200 bg-[#f8fafc] px-4 py-3">
      <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        <span className={`h-2 w-2 rounded-full ${swatch}`} />
        {label}
      </dt>
      <dd className={`mt-1 text-[20px] font-bold tabular-nums ${tone === "gain" ? "text-[#16a34a]" : "text-navy"}`}>
        {value}
      </dd>
    </div>
  );
}
