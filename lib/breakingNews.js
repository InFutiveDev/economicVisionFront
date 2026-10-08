const BASE = process.env.FRONT_API_URL || "http://localhost:4000";
const PAGE_SIZE = 50;
const MAX_PAGES = 10;

const istDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const dayOf = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : istDay.format(date);
};

/**
 * Breaking News lists every article published today (India time), newest first.
 * The API returns articles sorted by publishedAt desc, so paging stops at the first older story.
 */
export async function getBreakingNews() {
  try {
    const today = istDay.format(new Date());
    const items = [];

    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const response = await fetch(`${BASE}/api/articles?limit=${PAGE_SIZE}&page=${page}`, {
        cache: "no-store",
      });
      if (!response.ok) break;
      const data = await response.json();
      const articles = data?.articles || [];

      const todays = articles.filter((article) => dayOf(article.publishedAt) === today);
      items.push(...todays);
      if (todays.length < articles.length || page >= (data?.pages || 1)) break;
    }

    const headlines = items
      .filter((article) => String(article.title || "").trim())
      .map((article) => ({
        id: String(article.id || article.slug),
        headline: String(article.title).trim(),
        href: article.href || `/article/${article.slug}`,
      }));

    return { enabled: headlines.length > 0, items: headlines };
  } catch {
    return { enabled: false, items: [] };
  }
}
