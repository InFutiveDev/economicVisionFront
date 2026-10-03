import Link from "next/link";
import CompoundInterestCalculator from "@/components/tools/CompoundInterestCalculator";
import HowCompoundInterestWorks from "@/components/tools/HowCompoundInterestWorks";
import ToolsSidebar from "@/components/tools/ToolsSidebar";

export const metadata = {
  title: "Compound Interest Calculator | EconomicVision",
  description: "Estimate how a lumpsum grows with yearly, half-yearly, quarterly or monthly compounding.",
};

export default function CompoundInterestCalculatorPage() {
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
          <span className="text-slate-500">Compound Interest Calculator</span>
        </nav>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Tools</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy">Compound Interest Calculator</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          See how a one-time investment grows when interest is added back to the principal each compounding period.
        </p>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <CompoundInterestCalculator />
          <div className="space-y-6 lg:sticky lg:top-20">
            <ToolsSidebar current="/tools/compound-interest-calculator" />
            <HowCompoundInterestWorks />
          </div>
        </div>
      </div>
    </main>
  );
}
