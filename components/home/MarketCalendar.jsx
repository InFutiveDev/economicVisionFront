import Link from "next/link";

const events = [
  { date: "18 Nov", title: "Retail Sales", time: "10:30 AM", importance: "High" },
  { date: "19 Nov", title: "Inflation Data", time: "12:00 PM", importance: "Medium" },
  { date: "20 Nov", title: "US Jobless Claims", time: "06:00 PM", importance: "High" },
  { date: "21 Nov", title: "RBI MPC Minutes", time: "05:00 PM", importance: "Medium" },
];

export default function MarketCalendar() {
  return (
    <aside className="border border-slate-200 bg-white rounded-lg">
      <div className="flex items-center justify-between border-b-[3px] border-brand-red px-3 py-2.5">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy">Economic Calendar</h3>
        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-red">
          View All
        </Link>
      </div>
      <ul>
        {events.map((event) => (
          <li key={event.title} className="flex items-start gap-2 border-b border-slate-100 px-3 py-2 last:border-b-0">
            <span className="w-10 shrink-0 text-[11px] font-bold text-brand-red">{event.date}</span>
            <span className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold leading-snug text-navy">{event.title}</p>
              <p className="text-[11px] text-slate-400">{event.time}</p>
            </span>
            <span className={`text-[10px] font-bold ${event.importance === "High" ? "text-brand-red" : "text-slate-400"}`}>
              {event.importance}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
