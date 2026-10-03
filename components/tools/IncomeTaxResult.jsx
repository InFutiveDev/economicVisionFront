import { formatInr } from "@/lib/calculators";

export default function IncomeTaxResult({ result }) {
  const { better, saving } = result;
  const betterLabel = better === "new" ? "New regime" : "Old regime";

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Better option</p>
      <p className="mt-1 font-serif text-[28px] font-bold leading-tight text-navy sm:text-[32px]">{betterLabel}</p>
      <p className="mt-2 text-[13px] text-slate-500">
        {saving > 0 ? (
          <>
            Saves <span className="font-semibold text-[#16a34a]">{formatInr(saving)}</span> in tax for FY 2025-26
          </>
        ) : (
          "Both regimes payable the same tax on this income"
        )}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <RegimeCard title="New regime" regime={result.new} recommended={better === "new"} />
        <RegimeCard title="Old regime" regime={result.old} recommended={better === "old"} />
      </div>
    </div>
  );
}

function RegimeCard({ title, regime, recommended }) {
  return (
    <div className={`border px-4 py-3 ${recommended ? "border-navy bg-[#f8fafc]" : "border-slate-200 bg-white"}`}>
      <p className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        {title}
        {recommended ? <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] text-white">Lower tax</span> : null}
      </p>
      <p className="mt-1 text-[22px] font-bold tabular-nums text-navy">{formatInr(regime.total)}</p>
      <p className="mt-1 text-[12px] text-slate-500">
        Effective rate {regime.effectiveRate.toFixed(1)}%
      </p>
    </div>
  );
}
