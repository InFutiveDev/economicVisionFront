import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

const podcasts = [
  {
    title: "The Growth Story",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Money Matters",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Market Wrap",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",
  },
];

const stories = [
  {
    title: "The Makers of New India",
    image: "/image/story-1.jpg",
  },
  {
    title: "India's Green Bet",
    image: "/image/story-2.jpg",
  },
  {
    title: "Women in Business",
    image: "/image/story-3.jpg",
  },
];

export default function PodcastsStories({ showPodcasts = true, showStories = true, compact = false }) {
  return (
    <section className={compact ? "h-full min-w-0" : "space-y-8"}>
      {showPodcasts ? (
        compact ? (
          <div className="h-full rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4">
            <BandHeader title="Podcasts" />
            <CoverRow items={podcasts} />
          </div>
        ) : (
          <div>
            <SectionHeader title="Podcasts" cta="View All →" href="/media" />
            <CoverRow items={podcasts} />
          </div>
        )
      ) : null}

      {showStories ? (
        compact ? (
          <div className="h-full rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4">
            <BandHeader title="Stories" />
            <CoverRow items={stories} />
          </div>
        ) : (
          <div>
            <SectionHeader title="Stories" cta="View All →" href="/media" />
            <CoverRow items={stories} />
          </div>
        )
      ) : null}
    </section>
  );
}

function BandHeader({ title }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-extrabold uppercase tracking-[0.06em] text-navy sm:text-[16px]">{title}</h2>
      <Link href="/media" className="shrink-0 text-[12px] text-[#7b8ba3] hover:text-brand-red">
        View All →
      </Link>
    </div>
  );
}

function CoverRow({ items }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <Link key={item.title} href="#" className="group min-w-0">
          <div className="relative h-[260px] overflow-hidden rounded-md bg-slate-200 sm:h-[260px]">
            <Image src={item.image} alt={item.title} fill className="object-cover" sizes="180px" />
          </div>
          <h3 className="mt-1.5 text-center font-serif text-[11px] font-semibold leading-tight text-navy group-hover:text-brand-red">
            {item.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
