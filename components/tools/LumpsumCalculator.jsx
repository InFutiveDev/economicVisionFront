"use client";

import { useMemo, useState } from "react";
import { calculateLumpsum, formatInr, lumpsumYearBreakdown } from "@/lib/calculators";
import CalculatorField from "./CalculatorField";
import LumpsumResult from "./LumpsumResult";
import LumpsumBreakdown from "./LumpsumBreakdown";

const defaults = {
  amount: 100000,
  annualRate: 12,
  years: 10,
};

export default function LumpsumCalculator() {
  const [amount, setAmount] = useState(defaults.amount);
  const [annualRate, setAnnualRate] = useState(defaults.annualRate);
  const [years, setYears] = useState(defaults.years);

  const result = useMemo(
    () => calculateLumpsum({ amount, annualRate, years }),
    [amount, annualRate, years]
  );
  const rows = useMemo(
    () => lumpsumYearBreakdown({ amount, annualRate, years }),
    [amount, annualRate, years]
  );

  return (
    <div>
      <section className="border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <CalculatorField
              label="Investment amount"
              prefix="₹"
              min={1000}
              max={10000000}
              step={1000}
              value={amount}
              displayValue={formatInr(amount, { compact: true })}
              onChange={setAmount}
            />
            <CalculatorField
              label="Expected return"
              suffix="%"
              min={1}
              max={20}
              step={0.5}
              value={annualRate}
              onChange={setAnnualRate}
            />
            <CalculatorField
              label="Time period"
              suffix="Yrs"
              min={1}
              max={40}
              step={1}
              value={years}
              onChange={setYears}
            />
          </div>
          <div className="p-4 sm:p-6">
            <LumpsumResult {...result} />
          </div>
        </div>
      </section>

      <LumpsumBreakdown rows={rows} />

      <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
        This is an illustrative estimate, not investment advice. Mutual fund NAVs fluctuate, so actual corpus can differ.
      </p>
    </div>
  );
}
