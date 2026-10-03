"use client";

import { useState } from "react";
import { formatInr } from "@/lib/calculators";

export default function IncomeTaxBreakdown({ result }) {
  const [view, setView] = useState("new");
  const regime = view === "new" ? result.new : result.old;

  return (
    <section className="mt-6 border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
        <h2 className="text-[15px] font-bold uppercase tracking-[0.14em] text-navy">Tax breakup</h2>
        <div className="flex gap-2">
          {[
            { id: "new", label: "New" },
            { id: "old", label: "Old" },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setView(option.id)}
              className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                view === option.id ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:text-navy"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-px border-b border-slate-200 bg-slate-100 sm:grid-cols-4">
        <Summary label="Taxable income" value={formatInr(regime.taxable)} />
        <Summary label="Tax before cess" value={formatInr(regime.slabTax - regime.rebate)} />
        <Summary label="Cess + surcharge" value={formatInr(regime.cess + regime.surcharge)} />
        <Summary label="In-hand (annual)" value={formatInr(regime.takeHome)} />
      </dl>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[13px]">
          <thead className="bg-[#f8fafc] text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-4 py-3 sm:px-5">Slab</th>
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Income in slab</th>
              <th className="px-4 py-3 sm:px-5">Tax</th>
            </tr>
          </thead>
          <tbody>
            {regime.slabs.map((row) => (
              <tr key={`${row.from}-${row.rate}`} className="border-t border-slate-100">
                <td className="px-4 py-3 font-semibold text-navy sm:px-5">{slabLabel(row)}</td>
                <td className="px-4 py-3 tabular-nums text-slate-600">{row.rate}%</td>
                <td className="px-4 py-3 tabular-nums text-slate-600">{formatInr(row.income)}</td>
                <td className="px-4 py-3 font-semibold tabular-nums text-navy sm:px-5">{formatInr(row.tax)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Summary({ label, value }) {
  return (
    <div className="bg-white px-4 py-3">
      <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</dt>
      <dd className="mt-1 text-[15px] font-bold tabular-nums text-navy">{value}</dd>
    </div>
  );
}

function slabLabel(row) {
  if (!row.to) return `Above ${formatInr(row.from)}`;
  if (row.from === 0) return `Up to ${formatInr(row.to)}`;
  return `${formatInr(row.from)} – ${formatInr(row.to)}`;
}
