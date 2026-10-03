import { formatInr } from "@/lib/calculators";

export default function LoanResult({ emi, principal, interest, total }) {
  const principalShare = total > 0 ? (principal / total) * 100 : 0;
  const interestShare = Math.max(0, 100 - principalShare);

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Monthly EMI</p>
      <p className="mt-1 font-serif text-[34px] font-bold leading-none tabular-nums text-navy sm:text-[40px]">
        {formatInr(emi)}
      </p>
      <p className="mt-2 text-[13px] text-slate-500">Payable every month across the loan tenure</p>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className="flex h-full">
          <span className="h-full bg-navy" style={{ width: `${principalShare}%` }} />
          <span className="h-full bg-slate-400" style={{ width: `${interestShare}%` }} />
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ResultStat label="Principal" value={formatInr(principal)} swatch="bg-navy" />
        <ResultStat label="Total interest" value={formatInr(interest)} swatch="bg-slate-400" />
      </dl>
      <p className="mt-4 text-[13px] text-slate-500">
        Total payable <span className="font-semibold tabular-nums text-navy">{formatInr(total)}</span>
      </p>
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
