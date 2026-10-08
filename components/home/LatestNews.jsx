import Link from "next/link";
import StoryTypeLabel from "@/components/article/StoryTypeLabel";
import CoverImage from "@/components/media/CoverImage";

const featured = {
  tag: "Economy",
  time: "45 min ago",
  title: "RBI signals focus on growth, keeps policy rate unchanged",
  summary: "RBI maintains repo rate at 6.50%, says inflation is moderating but global risks remain.",
  image: "/image/latest-featured.jpg",
};

const latestUpdates = [
  { time: "09:42 AM", title: "Rupee gains 12 paise against US dollar" },
  { time: "09:35 AM", title: "India's Q2 GDP grows 6.7% YoY" },
  { time: "09:28 AM", title: "Adani Group stocks rally after positive brokerage note" },
  { time: "09:20 AM", title: "Govt to push next-gen GST reforms" },
  { time: "09:15 AM", title: "Gold prices rise ahead of US inflation data" },
];

const isLive = false;

export default function LatestNews({ featured: cmsFeatured, updates }) {
  const lead = cmsFeatured || featured;
  const items = updates?.length ? updates : latestUpdates;
  return (
    <section className="bg-white rounded-lg py-4 px-4 border border-slate-200">
      <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[18px] font-extrabold uppercase tracking-[0.06em] text-navy">Latest News</h2>
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              Live
            </span>
          ) : (
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Latest</span>
          )}
        </div>
        <Link href="#" className="text-[13px] text-slate-400 hover:text-brand-red">
          View All News →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-stretch lg:gap-8">
        <Link href={lead.href || "#"} className="group block">
          <div className="relative h-[148px] overflow-hidden rounded-md bg-slate-200 sm:h-[168px]">
            <CoverImage
              src={lead.image}
              alt={lead.title}
              className="object-cover object-[center_30%] transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </div>
          <h3 className="mt-3 font-serif text-[20px] font-bold leading-[1.25] text-navy group-hover:text-brand-red">
            {lead.title}
          </h3>
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] leading-none">
            <StoryTypeLabel type="News" />
            <span className="font-bold uppercase tracking-[0.14em] text-brand-red">{lead.tag}</span>
            <span className="mx-2 font-normal text-slate-300">|</span>
            <span className="text-slate-400">{lead.time}</span>
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{lead.summary}</p>
        </Link>

        <ul className="flex min-h-[260px] flex-col justify-between lg:min-h-0">
          {items.map((item) => (
            <li key={`${item.time}-${item.title}`} className="border-b border-slate-200 last:border-b-0">
              <Link href={item.href || "#"} className="group flex items-center gap-5 py-[13px]">
                <time className="w-[78px] shrink-0 text-[13px] font-semibold tabular-nums text-brand-red">
                  {item.time}
                </time>
                <h4 className="font-serif text-[14px] font-semibold leading-snug text-navy group-hover:text-brand-red">
                  {item.title}
                </h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
