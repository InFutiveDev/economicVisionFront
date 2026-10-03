export default function HowRetirementWorks() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-navy">How this works</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        Today’s monthly spend is inflated to retirement. The corpus is the amount needed to keep paying that lifestyle,
        growing with inflation, till the life expectancy you enter.
      </p>
      <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
        <li>Post-retirement return is taken 2 percentage points below the pre-retirement return</li>
        <li>Existing savings are grown till retirement and subtracted from the corpus</li>
        <li>Monthly SIP is the amount needed to cover the remaining shortfall</li>
      </ul>
    </aside>
  );
}
