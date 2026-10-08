import ArticleGrid from "@/components/listing/ArticleGrid";
import Pagination from "@/components/listing/Pagination";
import { getArticleList } from "@/lib/cms";

export const dynamic = "force-dynamic";

const first = (value) => (Array.isArray(value) ? value[0] : value) || "";

export async function generateMetadata({ searchParams }) {
  const q = first((await searchParams)?.q).trim();
  return { title: q ? `“${q}” — Search | The Economic Vision` : "Search | The Economic Vision" };
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const q = first(params?.q).trim().slice(0, 100);
  const pageNumber = Number(first(params?.page));
  const page = Number.isFinite(pageNumber) && pageNumber > 1 ? Math.floor(pageNumber) : 1;
  const data = q ? await getArticleList({ q, page }) : null;

  return (
    <main>
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="border-b-[3px] border-brand-red pb-4">
          <h1 className="text-[28px] font-extrabold uppercase leading-none tracking-wide text-navy">Search</h1>
          <form action="/search" role="search" className="mt-4 flex max-w-2xl gap-2">
            <input
              type="search"
              name="q"
              defaultValue={q}
              required
              aria-label="Search news"
              placeholder="Search news, topics, tags…"
              className="h-11 min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-4 text-[14px] outline-none focus:border-navy"
            />
            <button
              type="submit"
              className="h-11 rounded-md bg-brand-red px-5 text-[14px] font-semibold text-white hover:bg-red-700"
            >
              Search
            </button>
          </form>
          {q ? (
            <p className="mt-3 text-[13px] text-slate-500">
              {data?.total ?? 0} {data?.total === 1 ? "result" : "results"} for “{q}”
            </p>
          ) : null}
        </header>

        {q ? (
          <>
            <div className="mt-8">
              <ArticleGrid
                articles={data?.articles}
                emptyText={`Nothing matched “${q}”. Try a different word or a broader topic.`}
              />
            </div>
            <Pagination basePath="/search" params={{ q }} page={data?.page} pages={data?.pages} />
          </>
        ) : (
          <p className="mt-8 text-[14px] text-slate-500">Type a word, topic or tag to find stories.</p>
        )}
      </div>
    </main>
  );
}
