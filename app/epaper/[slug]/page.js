import { notFound } from "next/navigation";
import { editions, getEdition } from "@/components/epaper/epaperData";
import EPaperView from "@/components/epaper/EPaperView";

export function generateStaticParams() {
  return editions.map((edition) => ({ slug: edition.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const edition = getEdition(slug);
  if (!edition) return { title: "E-Paper | EconomicVision" };
  return {
    title: `${edition.name} · ${edition.city} | E-Paper`,
    description: `Read ${edition.name}, ${edition.city} — ${edition.date}.`,
  };
}

export default async function EPaperEditionPage({ params }) {
  const { slug } = await params;
  const edition = getEdition(slug);
  if (!edition) notFound();

  return (
    <main className="bg-slate-100">
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-8">
        <EPaperView edition={edition} />
      </div>
    </main>
  );
}
