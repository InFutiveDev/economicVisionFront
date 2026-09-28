import Image from "next/image";

export default function PageThumbs({ pages, currentIndex, onSelect }) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-navy">Pages</p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {pages.map((page, index) => {
          const active = index === currentIndex;
          return (
            <button
              key={page.image}
              type="button"
              onClick={() => onSelect(index)}
              className={`w-[92px] shrink-0 text-left ${
                active ? "ring-2 ring-brand-red" : "ring-1 ring-slate-200"
              }`}
            >
              <div className="relative h-32 overflow-hidden bg-slate-200">
                <Image src={page.image} alt={page.title} fill className="object-cover object-top" sizes="92px" />
              </div>
              <p className={`px-1 py-1.5 text-center text-xs font-semibold ${active ? "text-brand-red" : "text-slate-700"}`}>
                {index + 1}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
