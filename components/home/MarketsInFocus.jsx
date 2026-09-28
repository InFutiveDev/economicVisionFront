"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { marketToday, marketTape, sectors, topGainers, topLosers } from "@/lib/marketData";

const tabs = ["Market Today", "Top Gainers", "Top Losers", "Sectors"];

const sparkPaths = [
  "M0 42 L8 40 L14 36 L20 38 L28 30 L36 32 L44 22 L52 24 L60 16 L70 18 L78 12 L88 10 L98 14 L108 6 L120 4",
  "M0 40 L10 38 L18 28 L26 30 L34 20 L42 24 L50 14 L60 16 L72 10 L84 12 L96 7 L108 9 L120 3",
  "M0 44 L12 40 L20 34 L28 36 L38 24 L46 26 L58 16 L68 18 L80 10 L92 12 L104 6 L120 5",
];

function AreaSpark({ path, gid }) {
  return (
    <svg viewBox="0 0 120 48" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#bbf7d0" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L120 48 L0 48 Z`} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke="#16a34a" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function MarketsInFocus() {
  const [tab, setTab] = useState("Market Today");
  const uid = useId().replace(/:/g, "");

  return (
    <section className="bg-white border border-slate-200 rounded-lg py-4 px-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <h2 className="text-[20px] font-extrabold uppercase tracking-[0.04em] text-navy">Markets Now</h2>
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`relative pb-1 text-[14px] ${
                tab === item ? "font-semibold text-brand-red" : "font-medium text-slate-400 hover:text-navy"
              }`}
            >
              {item}
              {tab === item ? <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand-red" /> : null}
            </button>
          ))}
        </div>
        <Link href="/markets" className="text-[13px] text-[#7b8ba3] hover:text-brand-red">
          View Full Market Data →
        </Link>
      </div>

      {tab === "Market Today" ? (
        <div className="grid grid-cols-3 gap-2.5 lg:grid-cols-5">
          {marketToday.map((item, index) => (
            <article
              key={item.name}
              className="relative min-h-[108px] overflow-hidden rounded-xl border border-slate-200 bg-white p-3"
            >
              <div className="relative z-10">
                <p className="text-[13px] font-medium text-navy">{item.name}</p>
                <p className="mt-1 text-[20px] font-bold tabular-nums leading-none tracking-tight text-navy lg:text-[22px]">
                  {item.value}
                </p>
                <p className="mt-1.5 text-[12px] font-bold text-[#16a34a]">▲ {item.change}</p>
              </div>
              <div className="pointer-events-none absolute bottom-0 right-0 h-[70%] w-[58%]">
                <AreaSpark path={sparkPaths[index]} gid={`${uid}g${index}`} />
              </div>
            </article>
          ))}
          <div className="col-span-3 lg:col-span-1">
            <Movers title="Top Gainers" rows={topGainers} />
          </div>
          <div className="col-span-3 lg:col-span-1">
            <Movers title="Top Losers" rows={topLosers} />
          </div>
        </div>
      ) : null}

      {tab === "Top Gainers" ? <Movers title="Top Gainers" rows={topGainers} /> : null}
      {tab === "Top Losers" ? <Movers title="Top Losers" rows={topLosers} /> : null}
      {tab === "Sectors" ? <Movers title="Sectors" rows={sectors} /> : null}

      <div className="mt-4 grid grid-cols-2 border-t border-slate-200 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-slate-200">
        {marketTape.map((item) => (
          <article
            key={item.name}
            className="flex min-w-0 items-baseline justify-between gap-2 px-2 py-3 sm:flex-col sm:items-start sm:justify-center lg:px-3"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{item.name}</p>
            <p className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-[14px] font-bold tabular-nums text-navy">{item.value}</span>
              {item.change ? (
                <span className={`text-[11px] font-bold tabular-nums ${item.up ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                  {item.up ? "▲" : "▼"} {item.change}
                </span>
              ) : (
                <span className={`text-[11px] font-bold tabular-nums ${item.up ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                  {item.up ? "▲" : "▼"}
                </span>
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Movers({ title, rows }) {
  const headingColor =
    title === "Top Losers" ? "text-[#dc2626]" : title === "Top Gainers" ? "text-[#16a34a]" : "text-navy";

  return (
    <div>
      <p className={`mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${headingColor}`}>{title}</p>
      <ul>
        {rows.map((row) => (
          <li
            key={row.name}
            className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 border-b border-slate-200 py-[6px] last:border-b-0"
          >
            <span className="truncate text-[13px] text-navy">{row.name}</span>
            {row.value ? <span className="text-[13px] tabular-nums text-slate-500">{row.value}</span> : null}
            <span
              className={`flex min-w-[64px] items-center justify-end gap-1 text-[13px] font-semibold tabular-nums ${
                row.up ? "text-[#16a34a]" : "text-[#dc2626]"
              }`}
            >
              <span aria-hidden="true">{row.up ? "▲" : "▼"}</span>
              {String(row.change).replace(/[+\-]/g, "")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
