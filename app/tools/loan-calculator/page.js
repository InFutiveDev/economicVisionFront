import Link from "next/link";
import HowLoanWorks from "@/components/tools/HowLoanWorks";
import LoanCalculator from "@/components/tools/LoanCalculator";
import ToolsSidebar from "@/components/tools/ToolsSidebar";

export const metadata = {
  title: "Loan Calculator | EconomicVision",
  description: "Estimate monthly EMI, total interest and outstanding balance for home, auto and personal loans.",
};

export default function LoanCalculatorPage() {
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
          <span className="text-slate-500">Loan Calculator</span>
        </nav>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Tools</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy">Loan Calculator</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Check the monthly EMI on a home, auto or personal loan, and see how much of each year goes to interest.
        </p>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <LoanCalculator />
          <div className="space-y-6 lg:sticky lg:top-20">
            <ToolsSidebar current="/tools/loan-calculator" />
            <HowLoanWorks />
          </div>
        </div>
      </div>
    </main>
  );
}
