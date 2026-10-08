"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CoverImage from "@/components/media/CoverImage";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCategoryHub, selectHubEntry } from "@/lib/redux/slices/categoryHubSlice";

const columns = [
  {
    slug: "economy",
    title: "Economy",
    topics: ["GDP", "Inflation", "GST", "Jobs", "Trade"],
    placeholder: {
      image: "/image/hub-economy.jpg",
      title: "Indian economy shows strong growth momentum in Q2",
      excerpt: "Experts say robust domestic demand and higher exports may keep the momentum alive.",
    },
  },
  {
    slug: "business",
    title: "Business",
    topics: ["Corporate", "Startups", "MSME", "Real Estate", "Auto"],
    placeholder: {
      image: "/image/hub-business.jpg",
      title: "Tata Group plans ₹1.2 lakh crore investment in next 5 years",
      excerpt: "The investment will focus on clean energy, semiconductors and new-age businesses.",
    },
  },
  {
    slug: "money",
    title: "Money",
    topics: ["Tax", "SIP", "Mutual Funds", "Insurance", "Loans", "Retirement"],
    placeholder: {
      image: "/image/hub-money.jpg",
      title: "Small savings schemes continue to attract strong inflows",
      excerpt: "SIPs and fixed deposits remain popular choices for retail investors.",
    },
  },
];

const toSlug = (name) =>
  name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

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

function HubCard({ slug, title, topics, placeholder }) {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState("");
  const top = useAppSelector(selectHubEntry(slug));
  const current = useAppSelector(selectHubEntry(slug, active));

  useEffect(() => {
    dispatch(fetchCategoryHub({ slug, sub: active }));
  }, [dispatch, slug, active]);

  const category = top?.category;
  const tabs = [
    { name: "Top", slug: "" },
    ...(category?.children?.length
      ? category.children.map((child) => ({ name: child.name, slug: child.slug }))
      : topics.map((name) => ({ name, slug: toSlug(name) }))),
  ];
  const activeTab = tabs.find((tab) => tab.slug === active) || tabs[0];
  const categoryHref = category?.href || `/category/${slug}`;
  const loading = !current || current.status === "loading";

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3.5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[16px] font-extrabold uppercase tracking-[0.04em] text-navy">{title}</h2>
        <Link href={categoryHref} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7b8ba3] hover:text-brand-red">
          View All →
        </Link>
      </div>
      <div className="mt-2 flex flex-nowrap gap-x-3 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.slug || "top"}
            type="button"
            onClick={() => setActive(tab.slug)}
            aria-pressed={activeTab.slug === tab.slug}
            className={`shrink-0 pb-1 text-[12px] ${
              activeTab.slug === tab.slug
                ? "border-b-2 border-brand-red font-semibold text-brand-red"
                : "font-medium text-slate-400 hover:text-navy"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {loading ? (
        <HubSkeleton />
      ) : current.article ? (
        <HubStory
          href={current.article.href}
          image={current.article.coverImage}
          title={current.article.title}
          excerpt={current.article.excerpt}
        />
      ) : active ? (
        <div className="mt-2.5 flex h-[180px] flex-col items-center justify-center rounded-md bg-slate-50 px-4 text-center">
          <p className="text-[13px] font-semibold text-navy">No {activeTab.name} stories yet.</p>
          <Link href={categoryHref} className="mt-2 text-[12px] font-semibold text-brand-red hover:underline">
            See all {title} news →
          </Link>
        </div>
      ) : (
        <HubStory href={categoryHref} {...placeholder} />
      )}
    </article>
  );
}

function HubStory({ href, image, title, excerpt }) {
  return (
    <Link href={href} className="group mt-2.5 block">
      <div className="relative h-[92px] overflow-hidden rounded-md bg-slate-200">
        <CoverImage src={image} alt={title} sizes="260px" />
      </div>
      <h3 className="mt-2.5 line-clamp-2 font-serif text-[15px] font-bold leading-snug text-navy group-hover:text-brand-red">
        {title}
      </h3>
      {excerpt ? <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-slate-500">{excerpt}</p> : null}
    </Link>
  );
}

function HubSkeleton() {
  return (
    <div className="mt-2.5 animate-pulse" aria-hidden="true">
      <div className="h-[92px] rounded-md bg-slate-200" />
      <div className="mt-3 h-4 w-11/12 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />
      <div className="mt-3 h-3 w-full rounded bg-slate-100" />
    </div>
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
