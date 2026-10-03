export default function HowLumpsumWorks() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-navy">How this works</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        A lumpsum is a one-time investment. This estimate compounds that amount once a year at the expected return —
        the usual way mutual-fund lumpsum calculators work.
      </p>
      <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
        <li>Corpus = investment × (1 + return)<sup>years</sup></li>
        <li>Returns = estimated corpus − invested amount</li>
        <li>Market returns vary year to year and can be negative</li>
      </ul>
    </aside>
  );
}
