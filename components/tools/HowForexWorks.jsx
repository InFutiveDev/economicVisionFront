export default function HowForexWorks() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-navy">How this works</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        Enter an amount, pick the currency you have and the currency you want. Rates are shown against the Indian
        rupee and updated from live mid-market quotes when available.
      </p>
      <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
        <li>Converted = amount × (INR per from-currency ÷ INR per to-currency)</li>
        <li>Swap currencies with one click to reverse the conversion</li>
        <li>Bank / card / remittance fees are not included</li>
      </ul>
    </aside>
  );
}
