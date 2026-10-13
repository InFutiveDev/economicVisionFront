import { notFound } from "next/navigation";
import { editions as fallbackEditions, getEdition as getFallbackEdition } from "@/components/epaper/epaperData";
import { getEpaper, getEpapers } from "@/lib/epaper";
import EPaperView from "@/components/epaper/EPaperView";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const editions = await getEpapers();
  const list = editions?.length ? editions : fallbackEditions;
  return list.map((edition) => ({ slug: edition.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const edition = (await getEpaper(slug)) || getFallbackEdition(slug);
  if (!edition) return { title: "E-Paper | EconomicVision" };
  return {
    title: `${edition.name} · ${edition.city} | E-Paper`,
    description: `Read ${edition.name}, ${edition.city} — ${edition.date}.`,
  };
}

export default async function EPaperEditionPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const edition = (await getEpaper(slug)) || getFallbackEdition(slug);
  if (!edition) notFound();

  return (
    <main className="bg-slate-100">
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-8">
        <EPaperView edition={edition} />
      </div>
    </main>
  );
}
