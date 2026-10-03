import Link from "next/link";
import HowIncomeTaxWorks from "@/components/tools/HowIncomeTaxWorks";
import IncomeTaxCalculator from "@/components/tools/IncomeTaxCalculator";
import ToolsSidebar from "@/components/tools/ToolsSidebar";

export const metadata = {
  title: "Income Tax Calculator | EconomicVision",
  description: "Compare old vs new income-tax regime for FY 2025-26 and see which one leaves more in hand.",
};

export default function IncomeTaxCalculatorPage() {
  return (
    <main className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-slate-400">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <span>›</span>
          <span>Tools</span>
          <span>›</span>
          <span className="text-slate-500">Income Tax Calculator</span>
        </nav>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Tools</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy">Income Tax Calculator</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Compare the old and new regimes for FY 2025-26, including standard deduction, 87A rebate and 4% cess.
        </p>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <IncomeTaxCalculator />
          <div className="space-y-6 lg:sticky lg:top-20">
            <ToolsSidebar current="/tools/income-tax-calculator" />
            <HowIncomeTaxWorks />
          </div>
        </div>
      </div>
    </main>
  );
}
