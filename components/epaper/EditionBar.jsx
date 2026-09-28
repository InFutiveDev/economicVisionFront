import Link from "next/link";

export default function EditionBar({ edition, currentPage, totalPages }) {
  return (
    <div className="mb-5 border-b-[3px] border-brand-red pb-4">
      <Link href="/epaper" className="text-sm font-semibold text-brand-red hover:underline">
        ← All editions
      </Link>
      <h1 className="mt-2 font-serif text-2xl font-bold text-navy sm:text-3xl">{edition.name}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {edition.city} · {edition.date} · Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}
