export default function CalculatorField({
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  displayValue,
  onChange,
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <label className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</label>
        <div className="flex items-center border border-slate-200 bg-[#f8fafc] px-2.5 py-1.5">
          {prefix ? <span className="mr-1 text-[13px] font-semibold text-slate-400">{prefix}</span> : null}
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => onChange(toNumber(event.target.value, min, max))}
            className="w-28 bg-transparent text-right text-[15px] font-bold tabular-nums text-navy outline-none"
          />
          {suffix ? <span className="ml-1 text-[13px] font-semibold text-slate-400">{suffix}</span> : null}
        </div>
      </div>
      {displayValue ? <p className="mt-1 text-right text-[12px] text-slate-400">{displayValue}</p> : null}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(toNumber(event.target.value, min, max))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-navy"
      />
      <div className="mt-1.5 flex justify-between text-[11px] text-slate-400">
        <span>{prefix ? `${prefix}${min.toLocaleString("en-IN")}` : `${min}${suffix || ""}`}</span>
        <span>{prefix ? `${prefix}${max.toLocaleString("en-IN")}` : `${max}${suffix || ""}`}</span>
      </div>
    </div>
  );
}

function toNumber(raw, min, max) {
  const next = Number(raw);
  if (Number.isNaN(next)) return min;
  return Math.min(max, Math.max(min, next));
}
