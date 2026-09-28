import Link from "next/link";

const picks = [
  "Is India ready for the next wave of growth?",
  "The long-term question in India's green economy",
  "Why global investors are betting on India",
];

export default function EditorsPick() {
  return (
    <aside className="border border-slate-200 bg-white rounded-lg">
      <div className="flex items-center justify-between border-b-[3px] border-brand-red px-3 py-2.5">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy">Editor&apos;s Pick</h3>
        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-red">
          View All
        </Link>
      </div>
      <ul>
        {picks.map((title) => (
          <li key={title} className="border-b border-slate-100 last:border-b-0">
            <Link href="#" className="block px-3 py-2.5 font-serif text-[13px] font-semibold leading-snug text-navy hover:text-brand-red">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
