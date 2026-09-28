"use client";

import { useState } from "react";
import Link from "next/link";
import { snapshotIndices } from "@/lib/articles";
import { topGainers, topLosers } from "@/lib/marketData";

const tabs = ["Indices", "Top Gainers", "Top Losers"];

export default function MarketsSnapshot() {
  const [tab, setTab] = useState("Indices");
  const rows =
    tab === "Indices" ? snapshotIndices : tab === "Top Gainers" ? topGainers : topLosers;

  return (
    <aside className="border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <span className="text-brand-red">▸</span>
        <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy">Markets Snapshot</h2>
      </div>
      <div className="flex gap-5 border-b border-slate-200 px-4">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`py-2.5 text-[12px] ${
              tab === item
                ? "border-b-2 border-brand-red font-semibold text-navy"
                : "font-medium text-slate-400 hover:text-navy"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <ul>
        {rows.map((row) => (
          <li key={row.name} className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-2.5">
            <span className="text-[13px] text-navy">{row.name}</span>
            <span className="flex items-center gap-4 text-[13px] font-semibold tabular-nums">
              {row.value ? <span className="text-navy">{row.value}</span> : null}
              <span className={`min-w-[58px] text-right ${row.up ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                {row.change.startsWith("+") || row.change.startsWith("-") ? row.change : `${row.up ? "+" : "-"}${row.change}`}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/markets"
        className="flex items-center justify-center gap-1 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-red hover:underline"
      >
        View Full Market Data →
      </Link>
    </aside>
  );
}
