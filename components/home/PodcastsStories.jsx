import Link from "next/link";
import SectionHeader from "./SectionHeader";
import CoverImage from "@/components/media/CoverImage";
import SmartLink from "@/components/media/SmartLink";

const fallbackPodcasts = [
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

const fallbackStories = [
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

export default function PodcastsStories({
  podcasts,
  stories,
  showPodcasts = true,
  showStories = true,
  compact = false,
  limit = 3,
}) {
  const podcastItems = (podcasts?.length ? podcasts : fallbackPodcasts).slice(0, limit);
  const storyItems = (stories?.length ? stories : fallbackStories).slice(0, limit);

  return (
    <section className={compact ? "h-full min-w-0" : "space-y-8"}>
      {showPodcasts ? (
        compact ? (
          <div className="h-full rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4">
            <BandHeader title="Podcasts" href="/media#podcasts" />
            <CoverRow items={podcastItems} />
          </div>
        ) : (
          <div id="podcasts" className="scroll-mt-24">
            <SectionHeader title="Podcasts" cta={null} />
            <CoverRow items={podcastItems} />
          </div>
        )
      ) : null}

      {showStories ? (
        compact ? (
          <div className="h-full rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4">
            <BandHeader title="Stories" href="/media#stories" />
            <CoverRow items={storyItems} />
          </div>
        ) : (
          <div id="stories" className="scroll-mt-24">
            <SectionHeader title="Stories" cta={null} />
            <CoverRow items={storyItems} />
          </div>
        )
      ) : null}
    </section>
  );
}

function BandHeader({ title, href }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-extrabold uppercase tracking-[0.06em] text-navy sm:text-[16px]">{title}</h2>
      <Link href={href} className="shrink-0 text-[12px] text-[#7b8ba3] hover:text-brand-red">
        View All →
      </Link>
    </div>
  );
}

function CoverRow({ items }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <SmartLink key={item.id || item.title} href={item.url || "#"} className="group min-w-0">
          <div className="relative h-[260px] overflow-hidden rounded-md bg-slate-200 sm:h-[260px]">
            <CoverImage src={item.image} alt={item.title} sizes="180px" />
            {item.subCategory || item.category ? (
              <span className="absolute left-2 top-2 rounded bg-black/65 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                {item.subCategory || item.category}
              </span>
            ) : null}
          </div>
          <h3 className="mt-1.5 text-center font-serif text-[11px] font-semibold leading-tight text-navy group-hover:text-brand-red">
            {item.title}
          </h3>
        </SmartLink>
      ))}
    </div>
  );
}
