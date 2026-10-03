"use client";

import { useMemo, useState } from "react";
import { calculateLoan, formatInr, loanYearBreakdown } from "@/lib/calculators";
import CalculatorField from "./CalculatorField";
import LoanResult from "./LoanResult";
import LoanBreakdown from "./LoanBreakdown";

const defaults = {
  principal: 1000000,
  annualRate: 8.5,
  years: 5,
};

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(defaults.principal);
  const [annualRate, setAnnualRate] = useState(defaults.annualRate);
  const [years, setYears] = useState(defaults.years);

  const result = useMemo(
    () => calculateLoan({ principal, annualRate, years }),
    [principal, annualRate, years]
  );
  const rows = useMemo(
    () => loanYearBreakdown({ principal, annualRate, years }),
    [principal, annualRate, years]
  );

  return (
    <div>
      <section className="border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <CalculatorField
              label="Loan amount"
              prefix="₹"
              min={50000}
              max={20000000}
              step={50000}
              value={principal}
              displayValue={formatInr(principal, { compact: true })}
              onChange={setPrincipal}
            />
            <CalculatorField
              label="Interest rate"
              suffix="%"
              min={5}
              max={24}
              step={0.1}
              value={annualRate}
              onChange={setAnnualRate}
            />
            <CalculatorField
              label="Loan tenure"
              suffix="Yrs"
              min={1}
              max={30}
              step={1}
              value={years}
              onChange={setYears}
            />
          </div>
          <div className="p-4 sm:p-6">
            <LoanResult {...result} />
          </div>
        </div>
      </section>

      <LoanBreakdown rows={rows} />

      <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
        This is an illustrative EMI estimate, not a loan offer. Processing fees, GST and floating-rate resets are not
        included.
      </p>
    </div>
  );
}
