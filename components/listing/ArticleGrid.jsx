import Link from "next/link";
import CoverImage from "@/components/media/CoverImage";

export default function ArticleGrid({ articles, emptyText = "No stories here yet." }) {
  if (!articles?.length) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-[14px] text-slate-500">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <article key={article.id} className="group min-w-0">
          <Link href={article.href} className="block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-slate-200">
              <CoverImage
                src={article.coverImage}
                alt={article.title}
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </Link>
          <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em]">
            <Link href={article.categoryHref} className="text-brand-red hover:underline">
              {article.category}
            </Link>
            {article.subCategory ? (
              <>
                <span className="text-slate-300">›</span>
                <Link href={article.subCategoryHref} className="text-slate-500 hover:text-brand-red">
                  {article.subCategory}
                </Link>
              </>
            ) : null}
          </p>
          <Link href={article.href}>
            <h2 className="mt-1.5 font-serif text-[18px] font-bold leading-snug text-navy group-hover:text-brand-red">
              {article.title}
            </h2>
          </Link>
          {article.excerpt ? (
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{article.excerpt}</p>
          ) : null}
          <p className="mt-2 text-[11px] text-slate-400">
            {[article.author, article.timeAgo, article.readTime].filter(Boolean).join("  ·  ")}
          </p>
        </article>
      ))}
    </div>
  );
}
