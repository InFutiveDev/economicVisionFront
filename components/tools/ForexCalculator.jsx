"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateForex, fallbackForexRates, forexCurrencies, formatForex } from "@/lib/forex";
import CalculatorField from "./CalculatorField";
import ForexResult from "./ForexResult";

const istClock = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export default function ForexCalculator() {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState(fallbackForexRates);
  const [live, setLive] = useState(false);
  const [updatedLabel, setUpdatedLabel] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/forex", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (cancelled || !data?.rates) return;
        setRates(data.rates);
        setLive(Number(data.live) > 0);
        if (data.updatedAt) {
          setUpdatedLabel(`${istClock.format(new Date(data.updatedAt)).toUpperCase()} IST`);
        }
      } catch {
        /* keep fallback rates */
      }
    }

    load();
    const timer = setInterval(load, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const result = useMemo(
    () => calculateForex({ amount, from, to, rates }),
    [amount, from, to, rates]
  );

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div>
      <section className="border border-slate-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 border-b border-slate-200 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <CalculatorField
              label="Amount"
              prefix={forexCurrencies.find((item) => item.code === from)?.symbol}
              min={1}
              max={10000000}
              step={1}
              value={amount}
              displayValue={formatForex(amount, from)}
              onChange={setAmount}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <CurrencySelect label="From" value={from} onChange={setFrom} exclude={to} />
              <button
                type="button"
                onClick={swap}
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-navy hover:bg-slate-50"
                aria-label="Swap currencies"
              >
                ⇄
              </button>
              <CurrencySelect label="To" value={to} onChange={setTo} exclude={from} />
            </div>

            <div className="flex flex-wrap gap-2">
              {["USD", "EUR", "GBP", "AED", "JPY"].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setFrom(code);
                    setTo("INR");
                  }}
                  className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                    from === code && to === "INR"
                      ? "bg-navy text-white"
                      : "bg-slate-100 text-slate-600 hover:text-navy"
                  }`}
                >
                  {code} → INR
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <ForexResult
              amount={amount}
              from={from}
              to={to}
              live={live}
              updatedLabel={updatedLabel}
              {...result}
            />
          </div>
        </div>
      </section>

      <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
        Mid-market indicative rates for planning only. Banks, cards and remittance apps add their own markup and fees.
      </p>
    </div>
  );
}

function CurrencySelect({ label, value, onChange, exclude }) {
  return (
    <label className="block">
      <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2.5 h-11 w-full border border-slate-200 bg-[#f8fafc] px-3 text-[14px] font-semibold text-navy outline-none focus:border-navy"
      >
        {forexCurrencies
          .filter((item) => item.code !== exclude)
          .map((item) => (
            <option key={item.code} value={item.code}>
              {item.code} — {item.label}
            </option>
          ))}
      </select>
    </label>
  );
}
