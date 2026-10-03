"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    slug: "markets-rally-as-banking-stocks-lead-gains",
    tagLeft: "Markets",
    tagRight: "Breaking",
    type: "News",
    readTime: "8 min read",
    cta: "Read Full Story",
    title: "Markets Rally as Banking Stocks Lead Gains",
    dek: "Sensex surges over 400 points as banking and financial stocks drive market higher. Analysts see further upside if global cues remain positive.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    sensex: "+1.22%",
  },
  {
    slug: "india-gdp-growth-seen-at-7-in-fy26",
    tagLeft: "Economy",
    tagRight: "Breaking",
    type: "News",
    readTime: "3 min read",
    cta: "Read Full Story",
    title: "India's GDP growth seen at 7% in FY26, says RBI",
    dek: "The central bank retains its growth forecast, citing strong domestic demand and a resilient financial sector.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
    sensex: "+0.41%",
  },
  {
    slug: "tata-group-plans-investment",
    tagLeft: "Business",
    tagRight: "Exclusive",
    type: "News",
    readTime: "4 min read",
    cta: "Read Full Story",
    title: "Tata Group plans ₹1.2 lakh crore investment over next 5 years",
    dek: "The outlay spans manufacturing, green energy and digital infrastructure as the group doubles down on growth.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
    sensex: "+0.55%",
  },
  {
    slug: "new-tax-regime-vs-old",
    tagLeft: "Money",
    tagRight: "Guide",
    type: "Analysis",
    readTime: "5 min read",
    cta: "Read Analysis",
    title: "New tax regime vs old: which is better for you?",
    dek: "A clear read on FY26 slabs, deductions and who should still stay on the old regime.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1600&q=80",
    sensex: "+0.22%",
  },
  {
    slug: "global-markets-extend-gains",
    tagLeft: "Global",
    tagRight: "Markets",
    type: "News",
    readTime: "3 min read",
    cta: "Read Full Story",
    title: "Global markets extend gains as US inflation cools",
    dek: "Asia follows Wall Street higher after a softer US inflation print eases pressure on policy.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    sensex: "+0.31%",
  },
];

const categories = ["Economy", "Business", "Markets", "Money", "Global"];

const topStories = [
  {
    category: "Economy",
    title: "India's GDP growth accelerates to 7.2%",
    summary: "Domestic demand and investment support growth momentum as the RBI holds its FY26 outlook.",
    time: "45 min ago",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80",
    href: "/article/india-gdp-growth-seen-at-7-in-fy26",
  },
  {
    category: "Economy",
    title: "RBI keeps repo rate unchanged at 6.50%",
    summary: "The central bank maintains status quo, citing moderating inflation and lingering global risks.",
    time: "1 hour ago",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80",
    href: "#",
  },
  {
    category: "Business",
    title: "Govt plans sweeping GST reforms to boost consumption",
    summary: "A simpler rate structure is being discussed to lift demand without hurting tax collections.",
    time: "1 hour ago",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=80",
    href: "#",
  },
  {
    category: "Markets",
    title: "US markets end higher as inflation cools",
    summary: "A softer print eases rate-cut fears and lifts risk appetite across global equities.",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=400&q=80",
    href: "/article/global-markets-extend-gains",
  },
  {
    category: "Global",
    title: "India pushes for faster global trade rules at G20",
    summary: "New Delhi wants quicker dispute resolution and fewer barriers for emerging-market exporters.",
    time: "3 hours ago",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    href: "#",
  },
  {
    category: "Money",
    title: "New tax regime vs old: which is better for you?",
    summary: "FY26 slabs favour simplicity, but deductions can still make the old regime the better choice.",
    time: "4 hours ago",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80",
    href: "/article/new-tax-regime-vs-old",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Economy");
  const slide = slides[index];
  const lastIndex = slides.length - 1;

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setIndex((value) => (value === lastIndex ? 0 : value + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, index, lastIndex]);

  return (
    <section className="grid grid-cols-1 border border-slate-200 rounded-lg bg-white gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(240px,0.85fr)] lg:items-stretch">
      <article
        className="relative min-h-[280px] overflow-hidden bg-navy sm:min-h-[360px] lg:min-h-[420px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <p className="absolute right-4 top-4 text-[13px] font-bold text-[#4ade80] sm:right-6 sm:text-[18px]">
          SENSEX <span className="ml-1">▲ {slide.sensex}</span>
        </p>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
            {slide.tagLeft}
            <span className="mx-2 text-brand-red">|</span>
            <span>{slide.type}</span>
            <span className="mx-2 text-brand-red">|</span>
            <span className="text-white/80">{slide.readTime}</span>
          </p>
          <Link href={`/article/${slide.slug}`}>
            <h1 className="mt-2 max-w-xl font-serif text-[26px] font-bold leading-[1.12] text-white sm:text-[34px]">
              {slide.title}
            </h1>
            <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-white/85 sm:text-[14px]">{slide.dek}</p>
            <span className="mt-3 inline-flex text-[14px] font-semibold text-white">
              {slide.cta} <span className="ml-1 text-brand-red">→</span>
            </span>
          </Link>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-1.5 py-1">
          <button
            type="button"
            onClick={() => setIndex(index === 0 ? lastIndex : index - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/10"
            aria-label="Previous story"
          >
            ‹
          </button>
          <span className="min-w-[40px] text-center text-[12px] tabular-nums text-white/90">
            {index + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => setIndex(index === lastIndex ? 0 : index + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/10"
            aria-label="Next story"
          >
            ›
          </button>
        </div>
      </article>

      <aside className="min-w-0 px-4 sm:px-0">
        <div className="flex items-center justify-between py-2">
          <h2 className="text-[18px] font-bold uppercase tracking-tight text-navy">Top Stories</h2>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 border-b border-slate-200">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`pb-2 text-[12px] font-semibold ${
                activeCategory === category
                  ? "border-b-2 border-brand-red text-brand-red"
                  : "text-slate-500 hover:text-navy"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <ul>
          {topStories
            .filter((story) => story.category === activeCategory)
            .map((story) => (
              <li key={story.title} className="border-b border-slate-100 px-2 last:border-b-0">
                <Link href={story.href} className="group flex items-start gap-3 py-3">
                  <div className="relative mt-0.5 h-14 w-[72px] shrink-0 overflow-hidden bg-slate-200">
                    <Image src={story.image} alt={story.title} fill className="object-cover" sizes="72px" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      {story.category}
                      <span className="mx-1.5 text-brand-red">|</span>
                      <span className="font-semibold tracking-normal text-slate-400">{story.time}</span>
                    </p>
                    <h3 className="mt-1 font-serif text-[14px] font-semibold leading-snug text-navy group-hover:text-brand-red">
                      {story.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-slate-500">{story.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </aside>
    </section>
  );
}
