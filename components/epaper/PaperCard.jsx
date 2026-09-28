import Image from "next/image";
import Link from "next/link";

export default function PaperCard({ edition }) {
  return (
    <Link
      href={`/epaper/${edition.slug}`}
      className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden bg-slate-200 sm:h-56">
        <Image
          src={edition.cover}
          alt={`${edition.name} ${edition.city}`}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {edition.today && (
          <span className="absolute left-3 top-3 rounded bg-brand-red px-2 py-0.5 text-[11px] font-bold uppercase text-white">
            Today
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brand-red">{edition.city}</p>
        <h2 className="mt-1 text-lg font-bold text-navy group-hover:text-brand-red">{edition.name}</h2>
        <p className="mt-1 text-sm text-slate-500">{edition.dateShort}</p>
        <p className="mt-3 text-sm font-semibold text-brand-red">Read now →</p>
      </div>
    </Link>
  );
}
