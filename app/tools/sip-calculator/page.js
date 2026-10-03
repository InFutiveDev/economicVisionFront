import Link from "next/link";
import HowSipWorks from "@/components/tools/HowSipWorks";
import SipCalculator from "@/components/tools/SipCalculator";
import ToolsSidebar from "@/components/tools/ToolsSidebar";

export const metadata = {
  title: "SIP Calculator | EconomicVision",
  description: "Estimate the future value of a monthly SIP with expected returns and tenure.",
};

export default function SipCalculatorPage() {
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
          <span className="text-slate-500">SIP Calculator</span>
        </nav>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Tools</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy">SIP Calculator</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          See how a monthly systematic investment can grow over time, and how much of the corpus comes from returns.
        </p>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <SipCalculator />
          <div className="space-y-6 lg:sticky lg:top-20">
            <ToolsSidebar current="/tools/sip-calculator" />
            <HowSipWorks />
          </div>
        </div>
      </div>
    </main>
  );
}
