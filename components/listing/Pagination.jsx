import Link from "next/link";

function pageHref(basePath, params, page) {
  const search = new URLSearchParams(params);
  if (page > 1) search.set("page", String(page));
  else search.delete("page");
  const text = search.toString();
  return text ? `${basePath}?${text}` : basePath;
}

export default function Pagination({ basePath, page, pages, params = {} }) {
  if (!pages || pages <= 1) return null;

  const linkClass =
    "rounded-md border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-navy hover:border-brand-red hover:text-brand-red";

  return (
    <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
      {page > 1 ? (
        <Link href={pageHref(basePath, params, page - 1)} className={linkClass}>
          ← Newer
        </Link>
      ) : null}
      <span className="text-[13px] text-slate-500">
        Page {page} of {pages}
      </span>
      {page < pages ? (
        <Link href={pageHref(basePath, params, page + 1)} className={linkClass}>
          Older →
        </Link>
      ) : null}
    </nav>
  );
}
