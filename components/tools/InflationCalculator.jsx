"use client";

import { useMemo, useState } from "react";
import { calculateInflation, formatInr, inflationYearBreakdown } from "@/lib/calculators";
import CalculatorField from "./CalculatorField";
import InflationResult from "./InflationResult";
import InflationBreakdown from "./InflationBreakdown";

const defaults = {
  amount: 10000,
  annualRate: 6,
  years: 10,
};

export default function InflationCalculator() {
  const [amount, setAmount] = useState(defaults.amount);
  const [annualRate, setAnnualRate] = useState(defaults.annualRate);
  const [years, setYears] = useState(defaults.years);

  const result = useMemo(
    () => calculateInflation({ amount, annualRate, years }),
    [amount, annualRate, years]
  );
  const rows = useMemo(
    () => inflationYearBreakdown({ amount, annualRate, years }),
    [amount, annualRate, years]
  );

  return (
    <div>
      <section className="border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <CalculatorField
              label="Current cost"
              prefix="₹"
              min={100}
              max={1000000}
              step={100}
              value={amount}
              displayValue={formatInr(amount, { compact: true })}
              onChange={setAmount}
            />
            <CalculatorField
              label="Inflation rate"
              suffix="%"
              min={1}
              max={15}
              step={0.1}
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
            <InflationResult {...result} />
          </div>
        </div>
      </section>

      <InflationBreakdown rows={rows} />

      <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
        Illustrative only. Household inflation depends on rent, fuel, food and city, so the actual rise can differ.
      </p>
    </div>
  );
}
