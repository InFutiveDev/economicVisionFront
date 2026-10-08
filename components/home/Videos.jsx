"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import CoverImage from "@/components/media/CoverImage";
import SmartLink from "@/components/media/SmartLink";

const videos = [
  {
    title: "Budget 2025: What to Expect?",
    summary: "Our experts decode the key expectations from the upcoming Union Budget.",
    duration: "12:48",
    image: "/image/video-featured.jpg",
  },
  {
    title: "India's EV Revolution",
    duration: "08:24",
    image:
      "https://images.unsplash.com/photo-1449965408889-eefc6d101e97?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Global Markets Outlook",
    duration: "06:12",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Is Gold Still a Safe Haven?",
    duration: "07:36",
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "RBI Policy: What Markets Expect",
    duration: "09:18",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "How SIPs Build Long-Term Wealth",
    duration: "05:44",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80",
  },
];

const FILE_VIDEO = /\.(mp4|webm|ogg|mov|m3u8)(\?|#|$)/i;

function playSource(video) {
  if (video?.embedUrl) {
    const join = video.embedUrl.includes("?") ? "&" : "?";
    return { kind: "embed", src: `${video.embedUrl}${join}autoplay=1&rel=0&playsinline=1` };
  }
  if (video?.url && FILE_VIDEO.test(video.url)) {
    return { kind: "file", src: video.url };
  }
  return null;
}

function keyOf(video, index) {
  return video.id || `${video.title}-${index}`;
}

export default function Videos({ items, compact = false }) {
  const list = (items?.length ? items : videos).slice(0, compact ? 6 : 7);
  const [activeKey, setActiveKey] = useState(null);
  const [playing, setPlaying] = useState(false);

  const activeIndex = Math.max(
    0,
    list.findIndex((video, index) => keyOf(video, index) === activeKey)
  );
  const featured = list[activeIndex];
  const rest = list
    .map((video, index) => ({ video, key: keyOf(video, index) }))
    .filter((_, index) => index !== activeIndex);

  if (!featured) return null;

  const source = playing ? playSource(featured) : null;

  const playFeatured = () => {
    if (playSource(featured)) setPlaying(true);
  };

  const select = (key, video) => (event) => {
    if (!playSource(video)) return;
    event.preventDefault();
    setActiveKey(key);
    setPlaying(true);
  };

  if (compact) {
    return (
      <section className="h-full rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-extrabold uppercase tracking-[0.06em] text-navy sm:text-[16px]">
            Videos
          </h2>
          <Link href="/media" className="shrink-0 text-[12px] text-[#7b8ba3] hover:text-brand-red">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <FeaturedVideo
            video={featured}
            source={source}
            onPlay={playFeatured}
            frameClass="relative h-[220px] overflow-hidden rounded-md bg-slate-200"
            sizes="280px"
            badge={<PlayBadge featured />}
            titleClass="mt-2 font-serif text-[13px] font-bold leading-snug text-navy group-hover:text-brand-red"
            summaryClass="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500"
          />

          <ul className="flex flex-col gap-2.5 self-start">
            {rest.map(({ video, key }) => (
              <li key={key}>
                <SmartLink
                  href={video.url || "#"}
                  onClick={select(key, video)}
                  className="group flex items-center gap-2.5"
                >
                  <div className="relative h-[44px] w-[72px] shrink-0 overflow-hidden rounded-md bg-slate-200">
                    <CoverImage src={video.image} alt={video.title} sizes="72px" />
                    <PlayBadge />
                    <Duration label={video.duration} compact />
                  </div>
                  <h3 className="font-serif text-[12px] font-semibold leading-snug text-navy group-hover:text-brand-red">
                    {video.title}
                  </h3>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title="Video" cta="View All →" href="/media" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <FeaturedVideo
            video={featured}
            source={source}
            onPlay={playFeatured}
            frameClass="relative h-56 overflow-hidden bg-slate-200 sm:h-72 lg:h-[340px]"
            imageClass="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 60vw"
            badge={<PlayBadge large />}
            titleClass="mt-3 font-serif text-xl font-bold leading-snug text-slate-900 group-hover:text-brand-red sm:text-2xl"
            summaryClass="mt-1.5 text-[14px] leading-relaxed text-slate-500"
          />
        </div>

        <div className="flex flex-col divide-y divide-slate-200 lg:col-span-2 lg:border-l lg:border-slate-200 lg:pl-5">
          {rest.map(({ video, key }) => (
            <SmartLink
              key={key}
              href={video.url || "#"}
              onClick={select(key, video)}
              className="group flex gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="relative h-[78px] w-[128px] shrink-0 overflow-hidden bg-slate-200">
                <CoverImage src={video.image} alt={video.title} sizes="128px" />
                <PlayBadge />
                <Duration label={video.duration} />
              </div>
              <h3 className="line-clamp-3 font-serif text-[15px] font-semibold leading-snug text-slate-900 group-hover:text-brand-red">
                {video.title}
              </h3>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedVideo({
  video,
  source,
  onPlay,
  frameClass,
  imageClass,
  sizes,
  badge,
  titleClass,
  summaryClass,
}) {
  const playable = Boolean(playSource(video));

  const body = (
    <>
      <h3 className={titleClass}>{video.title}</h3>
      {video.summary ? <p className={summaryClass}>{video.summary}</p> : null}
    </>
  );

  if (source) {
    return (
      <div className="min-w-0">
        <div className={`${frameClass} bg-black`}>
          {source.kind === "embed" ? (
            <iframe
              src={source.src}
              title={video.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={source.src}
              className="absolute inset-0 h-full w-full"
              controls
              autoPlay
              playsInline
            />
          )}
        </div>
        {body}
      </div>
    );
  }

  const cover = (
    <div className={frameClass}>
      <CoverImage src={video.image} alt={video.title} className={imageClass} sizes={sizes} />
      {badge}
      <Duration label={video.duration} />
    </div>
  );

  if (playable) {
    return (
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play ${video.title}`}
        className="group block w-full min-w-0 text-left"
      >
        {cover}
        {body}
      </button>
    );
  }

  return (
    <SmartLink href={video.url || "#"} className="group block min-w-0">
      {cover}
      {body}
    </SmartLink>
  );
}

function PlayBadge({ large = false, featured = false }) {
  const size = featured || large ? "h-8 w-8" : "h-5 w-5";
  const icon = featured || large ? "h-3.5 w-3.5" : "h-2.5 w-2.5";
  return (
    <span
      className={
        featured
          ? "absolute left-2.5 top-1/2 -translate-y-1/2"
          : "absolute inset-0 flex items-center justify-center"
      }
    >
      <span
        className={`flex items-center justify-center rounded-full bg-black/70 text-white group-hover:bg-brand-red ${size}`}
      >
        <svg viewBox="0 0 24 24" className={icon} fill="currentColor">
          <path d="M9 7.5v9l8-4.5-8-4.5z" />
        </svg>
      </span>
    </span>
  );
}

function Duration({ label, compact = false }) {
  if (!label) return null;
  return (
    <span
      className={`absolute rounded bg-black/80 font-semibold text-white ${
        compact
          ? "bottom-1 right-1 px-1 py-px text-[9px]"
          : "bottom-1.5 right-1.5 px-1.5 py-0.5 text-[11px]"
      }`}
    >
      {label}
    </span>
  );
}
