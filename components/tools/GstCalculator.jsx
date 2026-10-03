"use client";

import { useMemo, useState } from "react";
import { calculateGst, formatInr, gstRates } from "@/lib/calculators";
import CalculatorField from "./CalculatorField";
import GstResult from "./GstResult";

const defaults = {
  amount: 10000,
  rate: 18,
  mode: "exclusive",
  place: "intra",
};

export default function GstCalculator() {
  const [amount, setAmount] = useState(defaults.amount);
  const [rate, setRate] = useState(defaults.rate);
  const [mode, setMode] = useState(defaults.mode);
  const [place, setPlace] = useState(defaults.place);

  const result = useMemo(() => calculateGst({ amount, rate, mode }), [amount, rate, mode]);

  return (
    <div>
      <section className="border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <CalculatorField
              label={mode === "inclusive" ? "Amount (incl. GST)" : "Amount (excl. GST)"}
              prefix="₹"
              min={100}
              max={10000000}
              step={100}
              value={amount}
              displayValue={formatInr(amount, { compact: true })}
              onChange={setAmount}
            />
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">GST rate</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {gstRates.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRate(option)}
                    className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                      rate === option ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:text-navy"
                    }`}
                  >
                    {option}%
                  </button>
                ))}
              </div>
            </div>
            <PillGroup
              label="Price type"
              value={mode}
              onChange={setMode}
              options={[
                { id: "exclusive", label: "Add GST" },
                { id: "inclusive", label: "Remove GST" },
              ]}
            />
            <PillGroup
              label="Supply"
              value={place}
              onChange={setPlace}
              options={[
                { id: "intra", label: "Intra-state" },
                { id: "inter", label: "Inter-state" },
              ]}
            />
          </div>
          <div className="p-4 sm:p-6">
            <GstResult {...result} place={place} />
          </div>
        </div>
      </section>

      <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
        Illustrative GST split only. Compensation cess, exemptions and input-tax credit are not included.
      </p>
    </div>
  );
}

function PillGroup({ label, value, onChange, options }) {
  return (
    <div>
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
              value === option.id ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:text-navy"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
