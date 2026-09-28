"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const POLL_MS = 60_000;

export default function BreakingNewsStrip({ initialData }) {
  const [data, setData] = useState(initialData);
  const [start, setStart] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const response = await fetch("/api/breaking-news", { cache: "no-store" });
        if (!response.ok) return;
        const next = await response.json();
        if (!cancelled) setData(next);
      } catch {
        /* keep last good payload */
      }
    }

    const timer = setInterval(refresh, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  if (!data?.enabled || !data.items?.length) return null;

  const count = data.items.length;
  const rotated = [...data.items.slice(start), ...data.items.slice(0, start)];
  const loop = [...rotated, ...rotated, ...rotated, ...rotated];
  const duration = Math.max(22, count * 10);

  return (
    <div className="flex overflow-hidden rounded-lg border border-red-100 bg-white shadow-[0_1px_6px_rgba(225,6,0,0.08)]">
      <div className="flex shrink-0 items-center gap-2 bg-brand-red px-3.5 py-2.5 text-white sm:px-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em]">Breaking News</p>
      </div>

      <div className="group relative min-w-0 flex-1 overflow-hidden">
        <div
          className="breaking-ticker-track flex w-max items-center py-2.5"
          style={{ animationDuration: `${duration}s` }}
        >
          {loop.map((item, index) => (
            <span key={`${item.id}-${index}`} className="flex items-center">
              <Link
                href={item.href}
                className="whitespace-nowrap px-4 text-[13px] font-medium text-navy hover:text-brand-red sm:text-sm"
              >
                {item.headline}
              </Link>
              <span className="select-none text-slate-300" aria-hidden="true">
                |
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 border-l border-slate-100 px-2">
        <button
          type="button"
          onClick={() => setStart((value) => (value === 0 ? count - 1 : value - 1))}
          className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-slate-50 hover:text-navy"
          aria-label="Previous breaking headline"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setStart((value) => (value === count - 1 ? 0 : value + 1))}
          className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-slate-50 hover:text-navy"
          aria-label="Next breaking headline"
        >
          ›
        </button>
      </div>
    </div>
  );
}
