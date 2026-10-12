import { cache } from "react";

const BASE = (process.env.NEXT_PUBLIC_FRONT_API_URL || process.env.FRONT_API_URL || "http://localhost:4000").replace(/\/+$/, "");

async function readJson(path, { revalidate } = {}) {
  const options = revalidate ? { next: { revalidate } } : { cache: "no-store" };
  const response = await fetch(`${BASE}${path}`, options);
  if (!response.ok) return null;
  return response.json();
}

async function safely(request) {
  try {
    return await request();
  } catch {
    return null;
  }
}

function query(params) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  });
  const text = search.toString();
  return text ? `?${text}` : "";
}

export const getHomeFeed = cache(async function getHomeFeed() {
  return safely(() => readJson("/api/home"));
});

export const getPublishedArticle = cache(async function getPublishedArticle(slug) {
  return safely(() => readJson(`/api/articles/${encodeURIComponent(slug)}`));
});

export const getNavCategories = cache(async function getNavCategories() {
  const data = await safely(() => readJson("/api/categories?nav=1", { revalidate: 60 }));
  return data?.categories || [];
});

export const getCategoryPage = cache(async function getCategoryPage(slug, sub, page = 1) {
  const path = sub
    ? `/api/categories/${encodeURIComponent(slug)}/${encodeURIComponent(sub)}`
    : `/api/categories/${encodeURIComponent(slug)}`;
  return safely(() => readJson(`${path}${query({ page })}`));
});

export const getArticleList = cache(async function getArticleList({ tag, q, page = 1, limit = 18 } = {}) {
  return safely(() => readJson(`/api/articles${query({ tag, q, page, limit })}`));
});

export const getMedia = cache(async function getMedia(type) {
  const data = await safely(() => readJson(`/api/media${query({ type })}`));
  return data?.items || [];
});

export async function getArticleComments(slug) {
  if (!slug) return [];
  const data = await safely(() => readJson(`/api/articles/${encodeURIComponent(slug)}/comments`));
  return data?.comments || [];
}

export async function postArticleComment(slug, { name, text }) {
  if (!slug) throw new Error("Article slug is required");
  const BASE = (process.env.NEXT_PUBLIC_FRONT_API_URL || process.env.FRONT_API_URL || "http://localhost:4000").replace(/\/+$/, "");
  const response = await fetch(`${BASE}/api/articles/${encodeURIComponent(slug)}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, text }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to post comment");
  }
  return response.json();
}
