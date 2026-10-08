import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleGrid from "@/components/listing/ArticleGrid";
import Pagination from "@/components/listing/Pagination";
import { getCategoryPage } from "@/lib/cms";

export const dynamic = "force-dynamic";

function readPage(value) {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(page) && page > 1 ? Math.floor(page) : 1;
}

async function load(params, searchParams) {
  const { slug } = await params;
  if (!slug?.length || slug.length > 2) return null;
  const page = readPage((await searchParams)?.page);
  return getCategoryPage(slug[0], slug[1], page);
}

export async function generateMetadata({ params, searchParams }) {
  const data = await load(params, searchParams);
  if (!data) return { title: "Category | The Economic Vision" };
  const label = data.category.sub ? `${data.category.sub.name} · ${data.category.name}` : data.category.name;
  return {
    title: `${label} News | The Economic Vision`,
    description: data.category.description || `Latest ${label} news and analysis from The Economic Vision.`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const data = await load(params, searchParams);
  if (!data) notFound();

  const { category, articles, page, pages, total } = data;
  const active = category.sub;

  return (
    <main>
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-slate-400">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span>›</span>
          {active ? (
            <>
              <Link href={category.href} className="hover:text-navy">{category.name}</Link>
              <span>›</span>
              <span className="text-slate-500">{active.name}</span>
            </>
          ) : (
            <span className="text-slate-500">{category.name}</span>
          )}
        </nav>

        <header className="mt-4 border-b-[3px] border-brand-red pb-3">
          <h1 className="text-[28px] font-extrabold uppercase leading-none tracking-wide text-navy sm:text-[34px]">
            {active ? active.name : category.name}
          </h1>
          {category.description && !active ? (
            <p className="mt-2 max-w-3xl text-[14px] text-slate-500">{category.description}</p>
          ) : null}
          <p className="mt-2 text-[12px] text-slate-400">
            {total} {total === 1 ? "story" : "stories"}
          </p>
        </header>

        {category.children.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip href={category.href} active={!active}>All {category.name}</Chip>
            {category.children.map((child) => (
              <Chip key={child.href} href={child.href} active={active?.href === child.href}>
                {child.name}
              </Chip>
            ))}
          </div>
        ) : null}

        <div className="mt-8">
          <ArticleGrid
            articles={articles}
            emptyText={`No ${active ? active.name : category.name} stories have been published yet.`}
          />
        </div>

        <Pagination basePath={active ? active.href : category.href} page={page} pages={pages} />
      </div>
    </main>
  );
}

function Chip({ href, active, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition ${
        active
          ? "border-brand-red bg-brand-red text-white"
          : "border-slate-200 bg-white text-navy hover:border-brand-red hover:text-brand-red"
      }`}
    >
      {children}
    </Link>
  );
}
