"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = {
  Indices: [
    { name: "SENSEX", value: "82,456.32", change: "+0.50%", up: true },
    { name: "NIFTY 50", value: "25,189.45", change: "+0.51%", up: true },
    { name: "BANK NIFTY", value: "51,230.80", change: "+0.38%", up: true },
    { name: "NIFTY IT", value: "42,110.25", change: "-0.22%", up: false },
  ],
  "Top Gainers": [
    { name: "HDFC BANK", value: "1,672.40", change: "+2.14%", up: true },
    { name: "INFOSYS", value: "1,548.10", change: "+1.82%", up: true },
    { name: "SBIN", value: "812.55", change: "+1.45%", up: true },
    { name: "TCS", value: "4,210.00", change: "+1.12%", up: true },
  ],
  "Top Losers": [
    { name: "ADANIENT", value: "2,318.60", change: "-1.90%", up: false },
    { name: "TATAMOTORS", value: "978.25", change: "-1.42%", up: false },
    { name: "ONGC", value: "268.10", change: "-0.88%", up: false },
    { name: "HINDALCO", value: "642.30", change: "-0.71%", up: false },
  ],
};

export default function MarketOverview() {
  const [activeTab, setActiveTab] = useState("Indices");
  const rows = tabs[activeTab];

  return (
    <aside className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-bold text-navy">Market Overview</h3>
      <div className="mt-3 flex gap-4 border-b border-slate-200 text-sm">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-brand-red text-brand-red"
                : "text-slate-500 hover:text-navy"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span>Index</span>
        <span className="text-right">Value</span>
        <span className="text-right">Change</span>
      </div>

      <ul className="mt-2 flex-1 space-y-3">
        {rows.map((row) => (
          <li key={row.name} className="grid grid-cols-3 text-sm">
            <span className="font-medium text-slate-800">{row.name}</span>
            <span className="text-right text-slate-700">{row.value}</span>
            <span className={`text-right font-semibold ${row.up ? "text-green-600" : "text-red-600"}`}>
              {row.change}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="#"
        className="mt-4 block rounded-md border border-brand-red py-2 text-center text-sm font-semibold text-brand-red hover:bg-red-50"
      >
        View Detailed Market Data
      </Link>
    </aside>
  );
}
