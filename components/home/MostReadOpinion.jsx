import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import StoryTypeLabel from "@/components/article/StoryTypeLabel";

const mostRead = [
  "Sensex Rallies 800 Points as FIIs Pump ₹12,000 Cr into Equities",
  "RBI Holds Repo Rate at 6.50%, Signals Caution on Inflation",
  "New vs Old Tax Regime: Which Option Saves You More in FY26?",
  "Gold Hits Fresh Record on MCX as Global Cues Turn Bullish",
  "Tata Group Plans ₹1 Lakh Crore Investment in Green Energy",
];

const featured = {
  author: "Meera Iyer",
  role: "Consulting Editor",
  title: "Why India's consumption slowdown is more structural than cyclical",
 
  image: "/image/opinion-featured.jpg",
};

const opinions = [
  {
    author: "Arjun Malhotra",
    role: "Markets Strategist",
    title: "Do not chase small-caps blindly. Valuations are flashing amber",
   
    meta: "6 min read  ·  17 Nov 2024",
    image: "/image/opinion-arjun.jpg",
  },
  {
    author: "Kavita Rao",
    role: "Personal Finance",
    title: "A 15-year SIP beats timing the market. The data still holds",
    
    meta: "5 min read  ·  16 Nov 2024",
    image: "/image/opinion-kavita.jpg",
  },
  {
    author: "R. K. Sharma",
    role: "Former RBI Advisor",
    title: "India's next growth engine lies in its green transition",
  
    meta: "7 min read  ·  15 Nov 2024",
    image: "/image/opinion-rk.jpg",
  },
];

export default function MostReadOpinion({ showMostRead = true }) {
  return (
    <section className="space-y-8">
      {showMostRead ? (
        <div>
          <SectionHeader title="Most Viewed" cta="View All →" />
          <ol className="divide-y divide-slate-200">
            {mostRead.map((title, index) => (
              <li key={title}>
                <Link href="#" className="group flex gap-4 py-3 first:pt-0">
                  <span className="w-8 shrink-0 text-2xl font-extrabold leading-none text-brand-red">
                    {index + 1}
                  </span>
                  <h3 className="font-serif text-[15px] font-semibold leading-snug text-slate-900 group-hover:text-brand-red">
                    {title}
                  </h3>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="rounded-xl border border-white/[0.08] bg-white p-4 sm:p-5">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-end gap-x-3 gap-y-1">
            <div>
              <h2 className="text-[18px] font-extrabold uppercase leading-none tracking-[0.04em] text-navy">
                Opinion
              </h2>
            
            </div>
            
          </div>
          <Link href="/media" className="shrink-0 text-[12px] text-[#7b8ba3] hover:text-brand-red">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8">
          <Link href="#" className="group min-w-0">
            <div className="relative h-[180px] overflow-hidden rounded-md bg-slate-200 sm:h-[240px]">
              <Image
                src={featured.image}
                alt={featured.author}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* <span className="absolute bottom-3 left-3">
                <StoryTypeLabel type="Opinion" className="bg-brand-red text-white border-brand-red px-2 py-1" />
              </span> */}
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
              <StoryTypeLabel type="Opinion" />
              {featured.author}{" "}
              <span className="font-medium text-slate-400">· {featured.role}</span>
            </p>
            <h3 className="mt-1.5 font-serif text-[18px] font-bold leading-snug text-navy group-hover:text-brand-red">
              {featured.title}
            </h3>
            
            
          </Link>

          <ul className="divide-y divide-slate-200">
            {opinions.map((item) => (
              <li key={item.title}>
                <Link href="#" className="group flex items-start gap-3 mt-3 first:pt-0 last:pb-0">
                  <div className="relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-md bg-slate-200 sm:h-[76px] sm:w-[76px]">
                    <Image src={item.image} alt={item.author} fill className="object-cover object-top" sizes="76px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2 text-[11px]">
                      <StoryTypeLabel type="Opinion" />
                      <span>
                        {item.author}{" "}
                        <span className="font-medium text-slate-400">· {item.role}</span>
                      </span>
                    </p>
                    <h3 className="mt-1 font-serif text-[13px] font-bold leading-snug text-navy group-hover:text-brand-red">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-slate-500">{item.summary}</p>
                    {/* <p className="mt-1.5 text-[11px] text-slate-400">{item.meta}</p> */}
                  </div>
                  <span className="mt-6 hidden shrink-0 text-slate-300 group-hover:text-brand-red sm:block">
                    <Chevron />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="mt-5 flex items-center justify-between gap-4 rounded-md bg-[#fdecee] px-4 py-3 sm:px-5">
          <p className="flex min-w-0 items-start gap-2.5 text-[13px] italic leading-relaxed text-navy sm:text-[14px]">
            <span className="mt-0.5 shrink-0 text-[22px] font-bold not-italic leading-none text-brand-red">
              “
            </span>
            Good journalism isn’t just about what’s happening, but what it means.
          </p>
          <p className="hidden shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:flex">
            The Economic Vision
            <span className="h-px w-8 bg-brand-red" />
          </p>
        </div> */}
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
