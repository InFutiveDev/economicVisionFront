import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

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

export default function Videos({ compact = false }) {
  const [featured, ...rest] = videos;

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
          <Link href="#" className="group min-w-0">
            <div className="relative h-[220px] overflow-hidden rounded-md bg-slate-200">
              <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="280px" />
              <PlayBadge featured />
              <Duration label={featured.duration} />
            </div>
            <h3 className="mt-2 font-serif text-[13px] font-bold leading-snug text-navy group-hover:text-brand-red">
              {featured.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500">{featured.summary}</p>
          </Link>

          <ul className="flex flex-col gap-2.5 self-start">
            {rest.map((video) => (
              <li key={video.title}>
                <Link href="#" className="group flex items-center gap-2.5">
                  <div className="relative h-[44px] w-[72px] shrink-0 overflow-hidden rounded-md bg-slate-200">
                    <Image src={video.image} alt={video.title} fill className="object-cover" sizes="72px" />
                    <PlayBadge />
                    <Duration label={video.duration} compact />
                  </div>
                  <h3 className="font-serif text-[12px] font-semibold leading-snug text-navy group-hover:text-brand-red">
                    {video.title}
                  </h3>
                </Link>
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
        <Link href="#" className="group lg:col-span-3">
          <div className="relative h-56 overflow-hidden bg-slate-200 sm:h-72 lg:h-[340px]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <PlayBadge large />
            <Duration label={featured.duration} />
          </div>
          <h3 className="mt-3 font-serif text-xl font-bold leading-snug text-slate-900 group-hover:text-brand-red sm:text-2xl">
            {featured.title}
          </h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">{featured.summary}</p>
        </Link>

        <div className="flex flex-col divide-y divide-slate-200 lg:col-span-2 lg:border-l lg:border-slate-200 lg:pl-5">
          {rest.map((video) => (
            <Link key={video.title} href="#" className="group flex gap-3 py-3 first:pt-0 last:pb-0">
              <div className="relative h-[78px] w-[128px] shrink-0 overflow-hidden bg-slate-200">
                <Image src={video.image} alt={video.title} fill className="object-cover" sizes="128px" />
                <PlayBadge />
                <Duration label={video.duration} />
              </div>
              <h3 className="line-clamp-3 font-serif text-[15px] font-semibold leading-snug text-slate-900 group-hover:text-brand-red">
                {video.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
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
