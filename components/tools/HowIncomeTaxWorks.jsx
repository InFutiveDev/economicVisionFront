export default function HowIncomeTaxWorks() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-bold uppercase tracking-[0.12em] text-navy">FY 2025-26 rules</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        New regime is the default. It uses the Budget 2025 slabs and a rebate that can make income up to ₹12 lakh
        tax-free after the standard deduction.
      </p>
      <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
        <li>New regime standard deduction: ₹75,000</li>
        <li>Old regime standard deduction: ₹50,000</li>
        <li>80C, 80D and other deductions apply only in the old regime</li>
        <li>Health and education cess of 4% is included</li>
      </ul>
    </aside>
  );
}
