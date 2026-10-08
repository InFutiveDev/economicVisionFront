import Link from "next/link";
import ArticleGrid from "@/components/listing/ArticleGrid";
import Pagination from "@/components/listing/Pagination";
import { getArticleList } from "@/lib/cms";

export const dynamic = "force-dynamic";

function decodeTag(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function readPage(value) {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(page) && page > 1 ? Math.floor(page) : 1;
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const label = decodeTag(tag);
  return {
    title: `${label} | The Economic Vision`,
    description: `Stories tagged ${label} on The Economic Vision.`,
  };
}

export default async function TagPage({ params, searchParams }) {
  const { tag } = await params;
  const label = decodeTag(tag);
  const page = readPage((await searchParams)?.page);
  const data = await getArticleList({ tag: label, page });

  return (
    <main>
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-slate-400">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span>›</span>
          <span className="text-slate-500">Tag</span>
        </nav>
        <header className="mt-4 border-b-[3px] border-brand-red pb-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red">Tag</p>
          <h1 className="mt-1 text-[28px] font-extrabold uppercase leading-none tracking-wide text-navy sm:text-[34px]">
            {label}
          </h1>
          <p className="mt-2 text-[12px] text-slate-400">
            {data?.total ?? 0} {data?.total === 1 ? "story" : "stories"}
          </p>
        </header>
        <div className="mt-8">
          <ArticleGrid articles={data?.articles} emptyText={`No stories tagged “${label}” yet.`} />
        </div>
        <Pagination basePath={`/tag/${encodeURIComponent(label)}`} page={data?.page} pages={data?.pages} />
      </div>
    </main>
  );
}
