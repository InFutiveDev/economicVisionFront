import Link from "next/link";

const headlines = [
  { time: "09:42", text: "RBI keeps repo rate unchanged at 6.50%" },
  { time: "09:35", text: "Rupee gains 12 paise against the US dollar" },
  { time: "09:28", text: "Sensex jumps 400 points as banking stocks rally" },
  { time: "09:20", text: "Govt to review investment strategy" },
  { time: "09:15", text: "Crude oil slips below $65 per barrel" },
];

export default function LiveNews() {
  return (
    <aside className="border border-white/[0.08] bg-white rounded-lg">
      <div className="flex items-center justify-between border-b-[3px] border-brand-red px-3 py-2.5">
        <h3 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-navy">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
          </span>
          Live News
        </h3>
        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-red">
          View All
        </Link>
      </div>
      <ul>
        {headlines.map((item) => (
          <li key={item.time} className="flex gap-2 border-b border-slate-100 px-3 py-2 last:border-b-0">
            <time className="w-10 shrink-0 text-[11px] font-bold tabular-nums text-brand-red">{item.time}</time>
            <p className="font-serif text-[12px] font-semibold leading-snug text-navy">{item.text}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
