import { formatInr } from "@/lib/calculators";

export default function RetirementResult({
  corpus,
  monthlySip,
  futureMonthly,
  savingsFuture,
  shortfall,
}) {
  const savingsShare = corpus > 0 ? Math.min(100, (savingsFuture / corpus) * 100) : 0;
  const gapShare = Math.max(0, 100 - savingsShare);

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Corpus needed</p>
      <p className="mt-1 font-serif text-[34px] font-bold leading-none tabular-nums text-navy sm:text-[40px]">
        {formatInr(corpus)}
      </p>
      <p className="mt-2 text-[13px] text-slate-500">
        Monthly SIP required: <span className="font-semibold text-navy">{formatInr(monthlySip)}</span>
      </p>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className="flex h-full">
          <span className="h-full bg-navy" style={{ width: `${savingsShare}%` }} />
          <span className="h-full bg-slate-400" style={{ width: `${gapShare}%` }} />
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ResultStat label="Expenses at retirement" value={formatInr(futureMonthly)} hint="/ month" swatch="bg-navy" />
        <ResultStat label="Existing savings then" value={formatInr(savingsFuture)} swatch="bg-navy" />
        <ResultStat label="Shortfall to cover" value={formatInr(shortfall)} swatch="bg-slate-400" />
        <ResultStat label="Monthly SIP" value={formatInr(monthlySip)} swatch="bg-[#16a34a]" tone="gain" />
      </dl>
    </div>
  );
}

function ResultStat({ label, value, hint, swatch, tone }) {
  return (
    <div className="border border-slate-200 bg-[#f8fafc] px-4 py-3">
      <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        <span className={`h-2 w-2 rounded-full ${swatch}`} />
        {label}
      </dt>
      <dd className={`mt-1 text-[20px] font-bold tabular-nums ${tone === "gain" ? "text-[#16a34a]" : "text-navy"}`}>
        {value}
        {hint ? <span className="ml-1 text-[12px] font-semibold text-slate-400">{hint}</span> : null}
      </dd>
    </div>
  );
}
