export default function HowLoanWorks() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-navy">How this works</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        EMI is the fixed monthly amount that covers both principal and interest. This estimate uses the standard
        reducing-balance formula used by most Indian home, auto and personal loans.
      </p>
      <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
        <li>EMI stays the same each month</li>
        <li>Early years pay more interest, later years more principal</li>
        <li>Actual bank EMI can differ with fees and rate resets</li>
      </ul>
    </aside>
  );
}
