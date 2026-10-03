"use client";

import { useMemo, useState } from "react";
import {
  calculateCompoundInterest,
  compoundFrequencies,
  compoundInterestYearBreakdown,
  formatInr,
} from "@/lib/calculators";
import CalculatorField from "./CalculatorField";
import CompoundInterestResult from "./CompoundInterestResult";
import CompoundInterestBreakdown from "./CompoundInterestBreakdown";

const defaults = {
  principal: 100000,
  annualRate: 8,
  years: 5,
  frequency: 1,
};

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(defaults.principal);
  const [annualRate, setAnnualRate] = useState(defaults.annualRate);
  const [years, setYears] = useState(defaults.years);
  const [frequency, setFrequency] = useState(defaults.frequency);

  const result = useMemo(
    () => calculateCompoundInterest({ principal, annualRate, years, frequency }),
    [principal, annualRate, years, frequency]
  );
  const rows = useMemo(
    () => compoundInterestYearBreakdown({ principal, annualRate, years, frequency }),
    [principal, annualRate, years, frequency]
  );

  return (
    <div>
      <section className="border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <CalculatorField
              label="Principal amount"
              prefix="₹"
              min={1000}
              max={10000000}
              step={1000}
              value={principal}
              displayValue={formatInr(principal, { compact: true })}
              onChange={setPrincipal}
            />
            <CalculatorField
              label="Interest rate"
              suffix="%"
              min={1}
              max={20}
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
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">Compounding</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {compoundFrequencies.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFrequency(option.id)}
                    className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                      frequency === option.id ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:text-navy"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <CompoundInterestResult {...result} />
          </div>
        </div>
      </section>

      <CompoundInterestBreakdown rows={rows} />

      <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
        This is an illustrative estimate. Actual FD, debt fund or savings returns can differ with tax, fees and
        compounding conventions.
      </p>
    </div>
  );
}
