import Link from "next/link";

const impacts = [
  {
    key: "People",
    hi: "महंगाई से household expenses पर क्या असर?",
    text: "See how this affects your daily life, savings and borrowing costs.",
    icon: "people",
  },
  {
    key: "Investor",
    hi: "Markets और investments पर क्या असर?",
    text: "Understand what this means for your portfolio and wealth creation.",
    icon: "chart",
  },
  {
    key: "Business",
    hi: "Companies और businesses के लिए क्या बदलेगा?",
    text: "Impact on corporate earnings, expansion plans and sector outlook.",
    icon: "briefcase",
  },
  {
    key: "Economy",
    hi: "GDP, inflation, jobs और growth पर क्या असर?",
    text: "How this shapes India's economic trajectory and long-term opportunities.",
    icon: "bank",
  },
];

export default function WhyItMatters({
  items = impacts,
  href = "/article/markets-rally-as-banking-stocks-lead-gains",
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[16px] font-extrabold uppercase tracking-[0.08em] text-navy">
            Why it <span className="text-brand-red">matters</span>
          </h3>
          
        </div>
        {/* <Link href={href} className="shrink-0 text-[13px] text-[#7b8ba3] hover:text-brand-red">
          View Details →
        </Link> */}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <Link key={item.key} href={href} className="group min-w-0 rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
            <span className="flex items-center gap-2 text-navy">
              <ImpactIcon name={item.icon} />
              <span className="text-[14px] font-bold uppercase tracking-[0.06em]">{item.key}</span>
            </span>
            <p className="mt-3 text-[14px] font-semibold leading-snug text-navy">{item.hi}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-500">{item.text}</p>
            <span className="mt-5 flex text-[14px] text-[#7b8ba3] group-hover:text-brand-red transition-colors duration-200">
              Read More 
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ImpactIcon({ name }) {
  const common = "h-[35px] w-[35px] shrink-0";
  if (name === "people") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="red" strokeWidth="1.7">
        <circle cx="12" cy="8" r="3" />
        <path d="M5 19c1.2-3.2 3.4-5 7-5s5.8 1.8 7 5" />
      </svg>
    );
  }
  if (name === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="red" strokeWidth="1.7">
        <path d="M4 19V10M10 19V5M16 19v-7M20 19H3" />
      </svg>
    );
  }
  if (name === "briefcase") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="red" strokeWidth="1.7">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="red" strokeWidth="1.7">
      <path d="M4 20h16M6 20V11h12v9M10 20v-4h4v4M12 4l8 7H4l8-7z" />
    </svg>
  );
}
