import { editions as fallbackEditions } from "./epaperData";
import PaperCard from "./PaperCard";

export default function PaperGrid({ editions: propEditions }) {
  const editions = propEditions?.length ? propEditions : fallbackEditions;
  return (
    <section>
      <div className="mb-6 border-b-[3px] border-brand-red pb-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">E-Paper</p>
        <h1 className="mt-1 font-serif text-2xl font-bold text-navy sm:text-3xl">Digital Editions</h1>
        <p className="mt-1 text-sm text-slate-500">Select a newspaper to read page by page.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {editions.map((edition) => (
          <PaperCard key={edition.slug || edition.id} edition={edition} />
        ))}
      </div>
    </section>
  );
}
