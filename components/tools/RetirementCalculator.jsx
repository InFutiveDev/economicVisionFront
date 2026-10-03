"use client";

import { useMemo, useState } from "react";
import {
  calculateRetirement,
  formatInr,
  retirementExpenseBreakdown,
} from "@/lib/calculators";
import CalculatorField from "./CalculatorField";
import RetirementResult from "./RetirementResult";
import RetirementBreakdown from "./RetirementBreakdown";

const defaults = {
  currentAge: 30,
  retirementAge: 60,
  lifeExpectancy: 85,
  monthlyExpense: 50000,
  inflation: 6,
  annualReturn: 12,
  currentSavings: 500000,
};

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(defaults.currentAge);
  const [retirementAge, setRetirementAge] = useState(defaults.retirementAge);
  const [lifeExpectancy, setLifeExpectancy] = useState(defaults.lifeExpectancy);
  const [monthlyExpense, setMonthlyExpense] = useState(defaults.monthlyExpense);
  const [inflation, setInflation] = useState(defaults.inflation);
  const [annualReturn, setAnnualReturn] = useState(defaults.annualReturn);
  const [currentSavings, setCurrentSavings] = useState(defaults.currentSavings);

  function changeCurrentAge(value) {
    setCurrentAge(value);
    if (value >= retirementAge) setRetirementAge(Math.min(75, value + 1));
  }

  function changeRetirementAge(value) {
    const next = Math.max(value, currentAge + 1);
    setRetirementAge(next);
    if (next >= lifeExpectancy) setLifeExpectancy(Math.min(100, next + 5));
  }

  const result = useMemo(
    () =>
      calculateRetirement({
        currentAge,
        retirementAge,
        lifeExpectancy,
        monthlyExpense,
        inflation,
        annualReturn,
        currentSavings,
      }),
    [currentAge, retirementAge, lifeExpectancy, monthlyExpense, inflation, annualReturn, currentSavings]
  );
  const rows = useMemo(
    () =>
      retirementExpenseBreakdown({
        currentAge,
        retirementAge,
        monthlyExpense,
        inflation,
      }),
    [currentAge, retirementAge, monthlyExpense, inflation]
  );

  return (
    <div>
      <section className="border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <CalculatorField
              label="Current age"
              suffix="Yrs"
              min={22}
              max={60}
              step={1}
              value={currentAge}
              onChange={changeCurrentAge}
            />
            <CalculatorField
              label="Retirement age"
              suffix="Yrs"
              min={40}
              max={75}
              step={1}
              value={retirementAge}
              onChange={changeRetirementAge}
            />
            <CalculatorField
              label="Life expectancy"
              suffix="Yrs"
              min={70}
              max={100}
              step={1}
              value={lifeExpectancy}
              onChange={(value) => setLifeExpectancy(Math.max(value, retirementAge + 1))}
            />
            <CalculatorField
              label="Monthly expenses"
              prefix="₹"
              min={10000}
              max={500000}
              step={5000}
              value={monthlyExpense}
              displayValue={formatInr(monthlyExpense, { compact: true })}
              onChange={setMonthlyExpense}
            />
            <CalculatorField
              label="Inflation"
              suffix="%"
              min={2}
              max={12}
              step={0.5}
              value={inflation}
              onChange={setInflation}
            />
            <CalculatorField
              label="Expected return"
              suffix="%"
              min={6}
              max={16}
              step={0.5}
              value={annualReturn}
              onChange={setAnnualReturn}
            />
            <CalculatorField
              label="Current savings"
              prefix="₹"
              min={0}
              max={20000000}
              step={50000}
              value={currentSavings}
              displayValue={formatInr(currentSavings, { compact: true })}
              onChange={setCurrentSavings}
            />
          </div>
          <div className="p-4 sm:p-6">
            <RetirementResult {...result} />
          </div>
        </div>
      </section>

      <RetirementBreakdown rows={rows} />

      <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
        Illustrative plan, not financial advice. Taxes, EPF, NPS annuity rules and healthcare shocks are not modelled.
      </p>
    </div>
  );
}
