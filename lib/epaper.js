import { cache } from "react";
import { editions as fallbackEditions, getEdition as getFallbackEdition } from "@/components/epaper/epaperData";

const PRIMARY_BASE = (
  process.env.FRONT_API_URL ||
  process.env.NEXT_PUBLIC_FRONT_API_URL ||
  "http://localhost:3001"
).replace(/\/+$/, "");

function buildQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });
  const text = search.toString();
  return text ? `?${text}` : "";
}

async function fetchFromApi(path, options = {}) {
  const fetchOptions = {
    cache: "no-store",
    headers: { Accept: "application/json" },
    ...options,
  };

  // Try primary API base first
  try {
    const url = `${PRIMARY_BASE}${path}`;
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Primary request network failure — will fall back to static data
  }

  return null;
}

/**
 * Fetch all e-paper editions with optional filters.
 *
 * @param {Object} [params]
 * @param {string} [params.city] - Filter by edition city
 * @param {boolean} [params.today] - Filter by today's edition flag
 * @param {string} [params.q] - Search query (title, name, city, date, slug)
 * @param {string} [params.status] - Filter by status ("published" | "draft")
 * @returns {Promise<Array>} Array of serialized e-paper editions
 */
export const getEpapers = cache(async function getEpapers(params = {}) {
  try {
    const queryString = buildQuery(params);
    const data = await fetchFromApi(`/api/epapers${queryString}`);

    if (data?.epapers && Array.isArray(data.epapers) && data.epapers.length > 0) {
      return data.epapers;
    }

    // Also try alias endpoint /api/epaper if needed
    if (!data?.epapers) {
      const aliasData = await fetchFromApi(`/api/epaper${queryString}`);
      if (aliasData?.epapers && Array.isArray(aliasData.epapers) && aliasData.epapers.length > 0) {
        return aliasData.epapers;
      }
    }
  } catch (error) {
    console.error("Error fetching epapers:", error);
  }

  // Fallback to static sample editions if API returns nothing or is offline
  return fallbackEditions;
});

/**
 * Fetch a single e-paper edition by slug or MongoDB ObjectId.
 *
 * @param {string} idOrSlug - Slug or ObjectId of the edition
 * @returns {Promise<Object|null>} Serialized e-paper edition
 */
export const getEpaper = cache(async function getEpaper(idOrSlug) {
  if (!idOrSlug) return null;

  try {
    const data = await fetchFromApi(`/api/epapers/${encodeURIComponent(idOrSlug)}`);
    if (data?.epaper) {
      return data.epaper;
    }

    // Try alias endpoint /api/epaper/:id
    const aliasData = await fetchFromApi(`/api/epaper/${encodeURIComponent(idOrSlug)}`);
    if (aliasData?.epaper) {
      return aliasData.epaper;
    }
  } catch (error) {
    console.error(`Error fetching epaper [${idOrSlug}]:`, error);
  }

  // Fallback to local static sample data
  return getFallbackEdition(idOrSlug) || null;
});

/**
 * Get distinct cities available in e-paper editions.
 *
 * @returns {Promise<string[]>}
 */
export async function getEpaperCities() {
  const papers = await getEpapers();
  const cities = papers.map((p) => p.city).filter(Boolean);
  return [...new Set(cities)];
}
