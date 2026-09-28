import Link from "next/link";

const topics = [
  { rank: 1, title: "RBI Policy Decision" },
  { rank: 2, title: "India Q2 GDP" },
  { rank: 3, title: "Adani Stocks" },
  { rank: 4, title: "US Elections 2024" },
  { rank: 5, title: "Gold Prices" },
];

export default function TrendingTopics() {
  return (
    <aside className="border border-white/[0.08] bg-white rounded-lg">
      <div className="flex items-center justify-between border-b-[3px] border-brand-red px-3 py-2.5">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy">Trending</h3>
        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-red">
          View All
        </Link>
      </div>
      <ol>
        {topics.map((topic) => (
          <li key={topic.rank} className="border-b border-slate-100 last:border-b-0">
            <Link href="#" className="flex gap-2 px-3 py-2 hover:bg-slate-50">
              <span className="w-4 shrink-0 text-[13px] font-bold tabular-nums text-brand-red">{topic.rank}</span>
              <span className="font-serif text-[13px] font-semibold leading-snug text-navy">{topic.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
