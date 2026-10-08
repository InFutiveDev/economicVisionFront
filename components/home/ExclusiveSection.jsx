import Link from "next/link";
import CoverImage from "@/components/media/CoverImage";

const exclusiveStories = [
  {
    type: "EXCLUSIVE",
    typeClass: "bg-brand-red text-white",
    title: "India's $1 Trillion Infra Push: The Road to a Stronger Economy",
    summary:
      "Our original reporting on how infrastructure investment could reshape growth, jobs and global competitiveness.",
    readTime: "6 MIN READ",
    image:
      "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1200&q=85",
    href: "#",
  },
  {
    type: "EXPLAINER",
    typeClass: "bg-blue-600 text-white",
    title: "RBI's Rate Pause: What It Means for You",
    summary:
      "A simple guide to understanding the impact of interest rates on loans, savings and markets.",
    readTime: "5 MIN READ",
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=85",
    href: "#",
  },
  {
    type: "ANALYSIS",
    typeClass: "bg-purple-600 text-white",
    title: "Are Markets Overvalued? A Data-Driven View",
    summary:
      "Our analysts break down valuations, risks and what investors should watch next.",
    readTime: "8 MIN READ",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=85",
    href: "#",
  },
];

const TYPE_CLASSES = {
  EXCLUSIVE: "bg-brand-red text-white",
  EXPLAINER: "bg-blue-600 text-white",
  ANALYSIS: "bg-purple-600 text-white",
};

export default function ExclusiveSection({ items }) {
  const stories = items?.length
    ? items.map((item) => ({
        ...item,
        type: (item.type || "EXCLUSIVE").toUpperCase(),
        typeClass: TYPE_CLASSES[(item.type || "").toUpperCase()] || TYPE_CLASSES.EXCLUSIVE,
      }))
    : exclusiveStories;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            {/* Section icon */}
            

            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h2 className="text-[20px] font-extrabold uppercase tracking-[0.04em] text-navy ">
                  The Economic Vision{" "}
                  <span className="text-brand-red">Exclusive</span>
                </h2>

                
              </div>
            </div>
          </div>

          
        </div>
      </div>

      {/* Stories */}
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => (
          <Link
            key={story.href !== "#" ? story.href : story.title}
            href={story.href || "#"}
            className={`group relative p-4 sm:p-5 ${
              index !== stories.length - 1
                ? "border-b border-slate-200 lg:border-b-0 lg:border-r"
                : ""
            }`}
          >
            {/* Image */}
            <div className="relative aspect-[16/8.5] overflow-hidden rounded-lg bg-slate-100">
              <CoverImage
                src={story.image}
                alt={story.title}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60" />

              {/* Type Badge */}
              <span
                className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-extrabold tracking-wide shadow-sm ${story.typeClass}`}
              >
                {story.type}
              </span>
            </div>

            {/* Content */}
            <div className="pt-4">
              <h3 className="font-serif text-[17px] font-bold leading-[1.3] text-navy hover:text-brand-red transition-colors duration-200  sm:text-[18px]">
                {story.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-[12px] leading-[1.6] text-slate-500 sm:text-[13px]">
                {story.summary}
              </p>

              {/* Meta */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.08em] text-slate-400">
                  {story.readTime}
                </span>

               
              </div>
            </div>

            {/* Hover accent */}
            <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand-red  " />
          </Link>
        ))}
      </div>
    </section>
  );
}