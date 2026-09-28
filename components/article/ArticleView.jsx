import Image from "next/image";
import Link from "next/link";
import MarketsSnapshot from "./MarketsSnapshot";
import StoryTypeLabel from "./StoryTypeLabel";
import { moreFromMarkets, relatedStories, trendingNow } from "@/lib/articles";

export default function ArticleView({ article }) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
      <article className="min-w-0">
        <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-slate-400">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span>›</span>
          <Link href="/markets" className="hover:text-navy">{article.section}</Link>
          <span>›</span>
          <span>{article.subsection}</span>
          <span>›</span>
          <span className="line-clamp-1 text-slate-500">{article.title.split(";")[0]}</span>
        </nav>

        <p className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-navy">
          <StoryTypeLabel type={article.kind} />
          <span className="text-brand-red">▸</span>
          {article.tagLeft}
          <span className="text-brand-red">|</span>
          <span>{article.tagRight}</span>
        </p>

        <h1 className="mt-3 font-serif text-[32px] font-bold leading-[1.15] text-navy sm:text-[40px]">
          {article.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-slate-600">{article.dek}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-slate-200">
              <Image src={article.avatar} alt={article.author} fill className="object-cover" sizes="44px" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-navy">
                By {article.author}
                <span className="ml-1 font-normal text-slate-400">{article.role}</span>
              </p>
              <p className="mt-0.5 text-[12px] text-slate-400">
                {article.date} <span className="mx-1">|</span> {article.time} <span className="mx-1">|</span> {article.readTime}
              </p>
            </div>
          </div>
          <ShareRow />
        </div>

        <figure className="mt-5">
          <div className="relative h-[240px] overflow-hidden bg-slate-200 sm:h-[380px]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
          </div>
          <figcaption className="mt-2 text-[12px] leading-relaxed text-slate-400">{article.caption}</figcaption>
        </figure>

        <div className="mt-6 max-w-3xl space-y-5 text-[16px] leading-[1.75] text-slate-700">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {article.quote ? (
          <blockquote className="mt-8 border-l-[3px] border-brand-red bg-[#f8fafc] px-5 py-4">
            <p className="font-serif text-[18px] leading-relaxed text-navy sm:text-[20px]">
              “{article.quote.text}”
            </p>
            <footer className="mt-3 text-[13px] text-slate-500">— {article.quote.credit}</footer>
          </blockquote>
        ) : null}

        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-navy">
            <span className="text-brand-red">▸</span>
            Why it matters
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {article.whyItMatters.map((item) => (
              <div key={item.key} className="rounded-lg border border-slate-100 bg-[#f8fafc] px-4 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-navy shadow-sm">
                  <ImpactIcon name={item.icon} />
                </span>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.1em] text-navy">{item.key}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">Tags :</span>
          {article.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[12px] text-navy">
              {tag}
            </span>
          ))}
        </div>

        <section className="mt-10 border-t border-slate-200 pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-bold uppercase tracking-[0.08em] text-navy">More from {article.section}</h2>
            <Link href="/markets" className="text-[11px] font-bold uppercase tracking-[0.1em] text-brand-red hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {moreFromMarkets.map((item) => (
              <Link key={item.title} href="#" className="group min-w-0">
                <div className="relative h-[120px] overflow-hidden bg-slate-200">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="240px" />
                </div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-red">{item.tag}</p>
                <h3 className="mt-1 font-serif text-[14px] font-semibold leading-snug text-navy group-hover:text-brand-red">
                  {item.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-400">{item.time}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <aside className="flex flex-col gap-5 lg:sticky lg:top-20 lg:self-start">
        <MarketsSnapshot />

        <section className="border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
            <span className="text-brand-red">▸</span>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy">Related Stories</h2>
          </div>
          <ul>
            {relatedStories.map((item) => (
              <li key={item.title} className="border-b border-slate-100 last:border-b-0">
                <Link href="#" className="group flex gap-3 px-4 py-3">
                  <div className="relative h-14 w-[72px] shrink-0 overflow-hidden bg-slate-200">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="72px" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-[13px] font-semibold leading-snug text-navy group-hover:text-brand-red">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-400">{item.time}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <MorningBriefCard />

        <section className="border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
            <span className="text-brand-red">▸</span>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy">Trending Now</h2>
          </div>
          <ol>
            {trendingNow.map((title, index) => (
              <li key={title} className="border-b border-slate-100 last:border-b-0">
                <Link href="#" className="flex gap-3 px-4 py-2.5 hover:bg-slate-50">
                  <span className="w-4 shrink-0 text-[15px] font-bold tabular-nums text-brand-red">{index + 1}</span>
                  <span className="font-serif text-[13px] font-semibold leading-snug text-navy">{title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </aside>
    </div>
  );
}

function MorningBriefCard() {
  return (
    <section className="border border-slate-200 bg-white px-4 py-5 text-center">
      <Image src="/image/logo.svg" alt="The Economic Vision" width={140} height={48} className="mx-auto h-10 w-auto" />
      <p className="mt-3 text-[15px] font-bold text-navy">The Economic Vision</p>
      <p className="text-[13px] font-semibold text-navy">Morning Brief</p>
      <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
        Get the 5 biggest stories every morning in your inbox.
      </p>
      <form className="mt-4 flex gap-2">
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="h-10 min-w-0 flex-1 border border-slate-200 px-3 text-[12px] outline-none focus:border-navy"
        />
        <button
          type="submit"
          className="h-10 shrink-0 bg-brand-red px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white hover:bg-red-700"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}

function ShareRow() {
  const icons = [
    { label: "Save", path: "M6 3h12v18l-6-4-6 4V3z" },
    { label: "Copy link", path: "M8 12h8M7 7h4a3 3 0 013 3v1M17 17h-4a3 3 0 01-3-3v-1" },
    { label: "Share", path: "M18 8a3 3 0 10-2.8-4H15L8.5 9.5M6 12a3 3 0 100 6 3 3 0 000-6zm12 0a3 3 0 100 6 3 3 0 000-6z" },
  ];
  return (
    <div className="flex items-center gap-2 text-slate-400">
      {icons.map((icon) => (
        <button
          key={icon.label}
          type="button"
          aria-label={icon.label}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 hover:border-navy hover:text-navy"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d={icon.path} />
          </svg>
        </button>
      ))}
    </div>
  );
}

function ImpactIcon({ name }) {
  const common = "h-5 w-5";
  if (name === "people") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="9" cy="8" r="2.4" />
        <circle cx="16" cy="8.5" r="2" />
        <path d="M4.5 18c.6-2.6 2.4-4 4.5-4s3.9 1.4 4.5 4M13 18c.4-2 1.7-3.2 3.2-3.2 1.6 0 2.9 1.2 3.3 3.2" />
      </svg>
    );
  }
  if (name === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19V9M10 19V5M16 19v-7M20 19H3" />
      </svg>
    );
  }
  if (name === "building") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 20V8l8-4 8 4v12" />
        <path d="M9 20v-6h6v6M10 10h.01M14 10h.01M10 13h.01M14 13h.01" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 16l5-5 4 3 7-8" />
      <path d="M14 6h6v6" />
    </svg>
  );
}
