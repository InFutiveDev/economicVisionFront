"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

const topics = ["Tax", "SIP", "Mutual Funds", "Insurance", "Loans", "Retirement"];

const featured = {
  tag: "Tax",
  title: "New Tax Regime vs Old Tax Regime",
  summary: "FY26 slabs, deductions and who should still stay on the old regime — without the jargon.",
  image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
};

const tools = [
  { name: "SIP Calculator", blurb: "See how a monthly SIP compounds." },
  { name: "EMI Calculator", blurb: "Plan home, auto and personal loans." },
  { name: "Tax Calculator", blurb: "Compare old vs new regime in minutes." },
];

export default function MoneySection() {
  const [active, setActive] = useState("Tax");

  return (
    <section>
      <SectionHeader title="Money" cta="View All →" href="#" />
      <div className="mb-4 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => setActive(topic)}
            className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
              active === topic ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:text-navy"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <Link href="#" className="group grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="relative h-52 overflow-hidden bg-slate-200 sm:h-64">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">{featured.tag}</p>
          <h3 className="mt-2 font-serif text-[22px] font-bold leading-tight text-navy group-hover:text-brand-red sm:text-[26px]">
            {featured.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{featured.summary}</p>
        </div>
      </Link>

      <div className="mt-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Tools</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href="#"
              className="border border-slate-200 bg-[#f8fafc] px-4 py-4 transition hover:border-navy"
            >
              <p className="text-[14px] font-bold text-navy">{tool.name}</p>
              <p className="mt-1 text-[13px] text-slate-500">{tool.blurb}</p>
              <span className="mt-3 inline-block text-[12px] font-semibold text-brand-red">Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
