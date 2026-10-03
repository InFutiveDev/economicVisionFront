export default function HowSipWorks() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-navy">How this works</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        A SIP invests a fixed amount every month. This estimate compounds that amount at the expected annual return,
        using the standard future-value formula.
      </p>
      <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
        <li>Invested = monthly SIP × number of months</li>
        <li>Returns = estimated corpus − invested amount</li>
        <li>Actual mutual fund returns can be higher or lower</li>
      </ul>
    </aside>
  );
}
