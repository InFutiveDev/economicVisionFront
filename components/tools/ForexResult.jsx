import { formatForex, forexCurrencies } from "@/lib/forex";

export default function ForexResult({ amount, from, to, converted, rate, inverse, live, updatedLabel }) {
  const fromMeta = forexCurrencies.find((item) => item.code === from);
  const toMeta = forexCurrencies.find((item) => item.code === to);

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Converted amount</p>
      <p className="mt-1 font-serif text-[34px] font-bold leading-none tabular-nums text-navy sm:text-[40px]">
        {formatForex(converted, to)}
      </p>
      <p className="mt-2 text-[13px] text-slate-500">
        {formatForex(amount, from)} {from} → {to}
      </p>

      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ResultStat
          label={`1 ${from}`}
          value={`${formatForex(rate, to)} ${to}`}
          note={fromMeta?.label}
        />
        <ResultStat
          label={`1 ${to}`}
          value={`${formatForex(inverse, from)} ${from}`}
          note={toMeta?.label}
        />
      </dl>

      <p className="mt-4 text-[12px] text-slate-400">
        {live
          ? `Live mid-market rates${updatedLabel ? ` · updated ${updatedLabel}` : ""}.`
          : "Using illustrative fallback rates. Live FX feed unavailable right now."}
      </p>
    </div>
  );
}

function ResultStat({ label, value, note }) {
  return (
    <div className="border border-slate-200 bg-[#f8fafc] px-4 py-3">
      <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
      <dd className="mt-1 text-[18px] font-bold tabular-nums text-navy">{value}</dd>
      {note ? <p className="mt-1 text-[12px] text-slate-400">{note}</p> : null}
    </div>
  );
}
