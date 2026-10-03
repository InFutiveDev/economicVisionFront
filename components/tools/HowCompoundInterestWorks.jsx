export default function HowCompoundInterestWorks() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-navy">How this works</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        Compound interest earns returns on both the principal and the interest already accumulated. More frequent
        compounding grows the corpus slightly faster.
      </p>
      <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
        <li>Maturity = principal × (1 + r/n)<sup>n × t</sup></li>
        <li>Interest = maturity amount − principal</li>
        <li>Bank FDs and debt products may use different day-count rules</li>
      </ul>
    </aside>
  );
}
