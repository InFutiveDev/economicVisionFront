import { formatInr } from "@/lib/calculators";

export default function InflationResult({ amount, futureCost, purchasingPower, rise }) {
  const todayShare = futureCost > 0 ? (amount / futureCost) * 100 : 0;
  const riseShare = Math.max(0, 100 - todayShare);

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Future cost</p>
      <p className="mt-1 font-serif text-[34px] font-bold leading-none tabular-nums text-navy sm:text-[40px]">
        {formatInr(futureCost)}
      </p>
      <p className="mt-2 text-[13px] text-slate-500">
        Today’s {formatInr(amount)} will cost {formatInr(futureCost, { compact: true })}
      </p>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className="flex h-full">
          <span className="h-full bg-navy" style={{ width: `${todayShare}%` }} />
          <span className="h-full bg-slate-400" style={{ width: `${riseShare}%` }} />
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ResultStat label="Price rise" value={formatInr(rise)} swatch="bg-slate-400" />
        <ResultStat label="Today’s ₹ buying power" value={formatInr(purchasingPower)} swatch="bg-navy" />
      </dl>
    </div>
  );
}

function ResultStat({ label, value, swatch }) {
  return (
    <div className="border border-slate-200 bg-[#f8fafc] px-4 py-3">
      <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        <span className={`h-2 w-2 rounded-full ${swatch}`} />
        {label}
      </dt>
      <dd className="mt-1 text-[20px] font-bold tabular-nums text-navy">{value}</dd>
    </div>
  );
}
