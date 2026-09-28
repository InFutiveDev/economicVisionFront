import { readFile } from "node:fs/promises";
import path from "node:path";

const LOCAL_FILE = path.join(process.cwd(), "content", "breaking-news.json");

/**
 * Breaking News is CMS-driven.
 * Set BREAKING_NEWS_CMS_URL to a JSON endpoint with:
 * { enabled: boolean, items: [{ id, headline, href, sortOrder, active }] }
 * If unset, content/breaking-news.json is used.
 */
export async function getBreakingNews() {
  try {
    const cmsUrl = process.env.BREAKING_NEWS_CMS_URL;
    const payload = cmsUrl ? await fetchFromCms(cmsUrl) : await readLocalFile();
    return normalizeBreakingNews(payload);
  } catch {
    return { enabled: false, items: [] };
  }
}

async function fetchFromCms(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Breaking news CMS responded with ${response.status}`);
  }
  return response.json();
}

async function readLocalFile() {
  const raw = await readFile(LOCAL_FILE, "utf8");
  return JSON.parse(raw);
}

export function normalizeBreakingNews(payload) {
  const source = payload?.data && !Array.isArray(payload.data) ? payload.data : payload;
  const items = Array.isArray(source?.items) ? source.items : [];

  const headlines = items
    .filter((item) => item && item.active !== false && String(item.headline || "").trim())
    .sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0))
    .map((item, index) => ({
      id: String(item.id ?? `breaking-${index}`),
      headline: String(item.headline).trim(),
      href: item.href || "#",
    }));

  return {
    enabled: Boolean(source?.enabled) && headlines.length > 0,
    items: headlines,
  };
}
