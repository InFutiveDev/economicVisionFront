export default function HowInflationWorks() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-navy">How this works</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        Inflation raises the price of the same basket of goods over time. This estimate compounds the current cost at
        the assumed annual inflation rate.
      </p>
      <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
        <li>Future cost = today’s price × (1 + inflation)<sup>years</sup></li>
        <li>Buying power shows what today’s rupee will buy later</li>
        <li>Actual CPI can be higher or lower than the rate you enter</li>
      </ul>
    </aside>
  );
}
