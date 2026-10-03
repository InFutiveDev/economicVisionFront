"use client";

import { useMemo, useState } from "react";
import { formatInr } from "@/lib/calculators";
import { ageGroups, calculateIncomeTax } from "@/lib/taxCalculator";
import CalculatorField from "./CalculatorField";
import IncomeTaxResult from "./IncomeTaxResult";
import IncomeTaxBreakdown from "./IncomeTaxBreakdown";

const defaults = {
  income: 1800000,
  ageId: "below60",
  deduction80c: 150000,
  deduction80d: 25000,
  otherDeductions: 0,
};

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(defaults.income);
  const [ageId, setAgeId] = useState(defaults.ageId);
  const [deduction80c, setDeduction80c] = useState(defaults.deduction80c);
  const [deduction80d, setDeduction80d] = useState(defaults.deduction80d);
  const [otherDeductions, setOtherDeductions] = useState(defaults.otherDeductions);

  const result = useMemo(
    () =>
      calculateIncomeTax({
        income,
        ageId,
        deduction80c,
        deduction80d,
        otherDeductions,
      }),
    [income, ageId, deduction80c, deduction80d, otherDeductions]
  );

  return (
    <div>
      <section className="border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <CalculatorField
              label="Annual income"
              prefix="₹"
              min={300000}
              max={10000000}
              step={25000}
              value={income}
              displayValue={formatInr(income, { compact: true })}
              onChange={setIncome}
            />
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">Age</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {ageGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setAgeId(group.id)}
                    className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                      ageId === group.id ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:text-navy"
                    }`}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            </div>
            <CalculatorField
              label="80C deductions"
              prefix="₹"
              min={0}
              max={150000}
              step={5000}
              value={deduction80c}
              onChange={setDeduction80c}
            />
            <CalculatorField
              label="80D medical insurance"
              prefix="₹"
              min={0}
              max={100000}
              step={5000}
              value={deduction80d}
              onChange={setDeduction80d}
            />
            <CalculatorField
              label="Other old-regime deductions"
              prefix="₹"
              min={0}
              max={500000}
              step={5000}
              value={otherDeductions}
              displayValue="HRA, home loan interest, NPS"
              onChange={setOtherDeductions}
            />
          </div>
          <div className="p-4 sm:p-6">
            <IncomeTaxResult result={result} />
          </div>
        </div>
      </section>

      <IncomeTaxBreakdown result={result} />

      <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
        Illustrative estimate for a resident individual in FY 2025-26. It does not cover capital gains, special-rate
        income, employer exemptions or professional tax advice.
      </p>
    </div>
  );
}
