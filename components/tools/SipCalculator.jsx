"use client";

import { useMemo, useState } from "react";
import { calculateSip, sipYearBreakdown } from "@/lib/calculators";
import CalculatorField from "./CalculatorField";
import SipResult from "./SipResult";
import SipBreakdown from "./SipBreakdown";

const defaults = {
  monthly: 5000,
  annualRate: 12,
  years: 10,
};

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(defaults.monthly);
  const [annualRate, setAnnualRate] = useState(defaults.annualRate);
  const [years, setYears] = useState(defaults.years);

  const result = useMemo(
    () => calculateSip({ monthly, annualRate, years }),
    [monthly, annualRate, years]
  );
  const rows = useMemo(
    () => sipYearBreakdown({ monthly, annualRate, years }),
    [monthly, annualRate, years]
  );

  return (
    <div>
      <section className="border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <CalculatorField
              label="Monthly SIP"
              prefix="₹"
              min={500}
              max={100000}
              step={500}
              value={monthly}
              onChange={setMonthly}
            />
            <CalculatorField
              label="Expected return"
              suffix="%"
              min={1}
              max={30}
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
            <SipResult {...result} />
          </div>
        </div>
      </section>

      <SipBreakdown rows={rows} />

      <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
        This is an illustrative estimate, not investment advice. Mutual fund NAVs fluctuate, so actual corpus can differ.
      </p>
    </div>
  );
}
