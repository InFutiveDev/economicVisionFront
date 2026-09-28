import Link from "next/link";

export default function SectionHeader({ title, href = "#", cta = "More →", accent = "line" }) {
  return (
    <div
      className={`mb-4 flex items-end justify-between pb-2 ${
        accent === "line" ? "border-b-[3px] border-brand-red" : "border-b border-slate-200"
      }`}
    >
      <h2 className="text-[22px] font-bold uppercase leading-none tracking-wide text-navy">{title}</h2>
      {cta ? (
        <Link
          href={href}
          className="pb-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red hover:underline"
        >
          {cta}
        </Link>
      ) : null}
    </div>
  );
}
