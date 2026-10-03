"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Economy",
    topics: ["Top", "Policy", "GDP", "Inflation", "Trade", "More"],
    image: "/image/hub-economy.jpg",
    headline: "Indian economy shows strong growth momentum in Q2",
    summary: "Experts say robust domestic demand and higher exports may keep the momentum alive.",
  },
  {
    title: "Business",
    topics: ["Top", "Companies", "Markets", "Deals", "Startups"],
    image: "/image/hub-business.jpg",
    headline: "Tata Group plans ₹1.2 lakh crore investment in next 5 years",
    summary: "The investment will focus on clean energy, semiconductors and new-age businesses.",
  },
  {
    title: "Money",
    topics: ["Top", "Mutual Funds", "Personal Finance", "Tax", "More"],
    image: "/image/hub-money.jpg",
    headline: "Small savings schemes continue to attract strong inflows",
    summary: "SIPs and fixed deposits remain popular choices for retail investors.",
  },
];

const tools = [
  { name: "SIP Calculator", blurb: "Plan your investments", tone: "red", icon: "calc", href: "/tools/sip-calculator" },
  { name: "Loan Calculator", blurb: "Check your eligibility", tone: "blue", icon: "card", href: "/tools/loan-calculator" },
  { name: "Tax Calculator", blurb: "Estimate your tax", tone: "red", icon: "tax", href: "/tools/income-tax-calculator" },
];

export default function EconomyBusiness() {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <HubCard key={column.title} {...column} />
      ))}
      <ToolsCard />
    </section>
  );
}

function HubCard({ title, topics, image, headline, summary }) {
  const [active, setActive] = useState("Top");

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3.5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[16px] font-extrabold uppercase tracking-[0.04em] text-navy">{title}</h2>
        <Link href="#" className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7b8ba3] hover:text-brand-red">
          View All →
        </Link>
      </div>
      <div className="mt-2 flex flex-nowrap gap-x-3 overflow-x-auto">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => setActive(topic)}
            className={`shrink-0 pb-1 text-[12px] ${
              active === topic
                ? "border-b-2 border-brand-red font-semibold text-brand-red"
                : "font-medium text-slate-400 hover:text-navy"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
      <Link href="#" className="group mt-2.5 block">
        <div className="relative h-[92px] overflow-hidden rounded-md bg-slate-200">
          <Image src={image} alt={headline} fill className="object-cover" sizes="260px" />
        </div>
        <h3 className="mt-2.5 font-serif text-[15px] font-bold leading-snug text-navy group-hover:text-brand-red">{headline}</h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{summary}</p>
      </Link>
    </article>
  );
}

function ToolsCard() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-3.5">
      <h2 className="text-[16px] font-extrabold uppercase tracking-[0.04em] text-navy">Tools</h2>
      <ul className="mt-4">
        {tools.map((tool) => (
          <li key={tool.name} className="border-b border-slate-100 last:border-b-0">
            <Link href={tool.href} className="group flex items-center gap-3 py-3.5">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  tool.tone === "blue" ? "bg-sky-50 text-[#3b82f6]" : "bg-red-50 text-brand-red"
                }`}
              >
                <ToolIcon name={tool.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <p className="text-[14px] font-bold text-navy group-hover:text-brand-red">{tool.name}</p>
                <p className="text-[12px] text-slate-400">{tool.blurb}</p>
              </span>
              <span className="text-[18px] text-slate-300">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function ToolIcon({ name }) {
  if (name === "card") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    );
  }
  if (name === "tax") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 3h8l4 4v14H7z" />
        <path d="M15 3v4h4M9 13l6 6M15 13l-6 6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </svg>
  );
}
