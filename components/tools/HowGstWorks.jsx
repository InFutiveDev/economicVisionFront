export default function HowGstWorks() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-navy">How this works</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        GST can be added on top of a price, or already included in it. Intra-state supplies split the tax into CGST and
        SGST; inter-state supplies use IGST.
      </p>
      <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
        <li>Exclusive: GST = amount × rate / 100</li>
        <li>Inclusive: GST = amount × rate / (100 + rate)</li>
        <li>Does not cover cess, exemptions or ITC adjustments</li>
      </ul>
    </aside>
  );
}
