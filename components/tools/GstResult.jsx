import { formatInr } from "@/lib/calculators";

export default function GstResult({ net, gst, gross, rate, place }) {
  const netShare = gross > 0 ? (net / gross) * 100 : 0;
  const gstShare = Math.max(0, 100 - netShare);
  const half = gst / 2;

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Total amount</p>
      <p className="mt-1 font-serif text-[34px] font-bold leading-none tabular-nums text-navy sm:text-[40px]">
        {formatInr(gross)}
      </p>
      <p className="mt-2 text-[13px] text-slate-500">
        Includes {rate}% GST of {formatInr(gst)}
      </p>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className="flex h-full">
          <span className="h-full bg-navy" style={{ width: `${netShare}%` }} />
          <span className="h-full bg-slate-400" style={{ width: `${gstShare}%` }} />
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ResultStat label="Taxable value" value={formatInr(net)} swatch="bg-navy" />
        <ResultStat label="GST amount" value={formatInr(gst)} swatch="bg-slate-400" />
      </dl>

      <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {place === "inter" ? (
          <ResultStat label="IGST" value={formatInr(gst)} swatch="bg-slate-300" />
        ) : (
          <>
            <ResultStat label="CGST" value={formatInr(half)} swatch="bg-slate-300" />
            <ResultStat label="SGST" value={formatInr(half)} swatch="bg-slate-300" />
          </>
        )}
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
