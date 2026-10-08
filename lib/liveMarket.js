import * as fallback from "@/lib/marketData";

const number = (value) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const price = (value, digits = 2) =>
  value === null
    ? ""
    : value.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits });

const percent = (value) => `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

const istTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

// Indices, USD/INR and Brent come from Yahoo Finance's public chart endpoint (no key, no quota).
const INDEX_SYMBOLS = {
  Sensex: "^BSESN",
  "Nifty 50": "^NSEI",
  "Bank Nifty": "^NSEBANK",
  "USD/INR": "INR=X",
  "India VIX": "^INDIAVIX",
  "Brent Crude": "BZ=F",
};
const VALUE_PREFIX = { "Brent Crude": "$" };
const INDEX_REFRESH_SECONDS = 120;

let indexMemo = { at: 0, live: null };

async function fetchIndex(name, symbol) {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`,
    { headers: { "User-Agent": "Mozilla/5.0" }, cache: "no-store" }
  );
  if (!response.ok) throw new Error(`Yahoo ${symbol} responded with ${response.status}`);
  const meta = (await response.json())?.chart?.result?.[0]?.meta;
  const last = number(meta?.regularMarketPrice);
  const previous = number(meta?.chartPreviousClose ?? meta?.previousClose);
  if (last === null) return null;
  const change = previous ? ((last - previous) / previous) * 100 : 0;
  return {
    name,
    value: `${VALUE_PREFIX[name] || ""}${price(last)}`,
    change: percent(change),
    up: change >= 0,
    at: meta.regularMarketTime,
  };
}

async function indexData() {
  if (indexMemo.live && Date.now() - indexMemo.at < INDEX_REFRESH_SECONDS * 1000) return indexMemo.live;

  const results = await Promise.allSettled(
    Object.entries(INDEX_SYMBOLS).map(([name, symbol]) => fetchIndex(name, symbol))
  );
  const items = results.filter((result) => result.status === "fulfilled" && result.value).map((result) => result.value);
  if (items.length) {
    const latest = Math.max(...items.map((item) => item.at || 0));
    indexMemo = {
      at: Date.now(),
      live: {
        ...indexMemo.live,
        ...Object.fromEntries(items.map((item) => [item.name, item])),
        updated: latest ? `${istTime.format(new Date(latest * 1000)).toUpperCase()} IST` : undefined,
      },
    };
  }
  return indexMemo.live;
}

// Indian gold rate: IBJA's published 24K (999) benchmark, released around noon (AM) and evening (PM) on trading days.
const GOLD_NAME = "Gold 24K";
const GOLD_REFRESH_SECONDS = 1800;

let goldMemo = { at: 0, live: null };

function ibjaSession(html, tab) {
  const start = html.indexOf(`id="${tab}"`);
  if (start < 0) return [];
  const table = html.slice(start, html.indexOf("</table>", start));
  return [...table.matchAll(/<strong>(\d{2})\/(\d{2})\/(\d{4})<\/strong>\s*<\/td>\s*<td[^>]*data-label="Gold 999">\s*(\d+)/g)].map(
    ([, day, month, year, rate]) => ({ date: `${year}-${month}-${day}`, rate: Number(rate) })
  );
}

async function goldData() {
  if (goldMemo.live && Date.now() - goldMemo.at < GOLD_REFRESH_SECONDS * 1000) return goldMemo.live;

  try {
    const response = await fetch("https://ibjarates.com/", {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`IBJA responded with ${response.status}`);
    const html = await response.text();

    const rates = [
      ...ibjaSession(html, "tab-am").map((row) => ({ ...row, session: 0 })),
      ...ibjaSession(html, "tab-pm").map((row) => ({ ...row, session: 1 })),
    ].sort((a, b) => a.date.localeCompare(b.date) || a.session - b.session);
    const latest = rates.at(-1);
    // Compare with the previous day's closing (PM) rate, as Indian gold rate tables do.
    const previous = rates.filter((row) => row.session === 1 && row.date < latest?.date).at(-1);

    if (latest) {
      const change = previous ? ((latest.rate - previous.rate) / previous.rate) * 100 : 0;
      goldMemo = {
        at: Date.now(),
        live: { [GOLD_NAME]: { name: GOLD_NAME, value: `₹${price(latest.rate, 0)}`, change: percent(change), up: change >= 0 } },
      };
    }
  } catch {
    /* keep last good rate */
  }
  return goldMemo.live;
}

// Top gainers/losers are ranked across Nifty 50 stocks using Yahoo's batch quote endpoint (max 20 symbols per call).
const NIFTY_50 = {
  ADANIENT: "Adani Enterprises",
  ADANIPORTS: "Adani Ports",
  APOLLOHOSP: "Apollo Hospitals",
  ASIANPAINT: "Asian Paints",
  AXISBANK: "Axis Bank",
  "BAJAJ-AUTO": "Bajaj Auto",
  BAJFINANCE: "Bajaj Finance",
  BAJAJFINSV: "Bajaj Finserv",
  BEL: "Bharat Electronics",
  BHARTIARTL: "Bharti Airtel",
  CIPLA: "Cipla",
  COALINDIA: "Coal India",
  DRREDDY: "Dr Reddy's Labs",
  EICHERMOT: "Eicher Motors",
  ETERNAL: "Eternal",
  GRASIM: "Grasim Industries",
  HCLTECH: "HCL Technologies",
  HDFCBANK: "HDFC Bank",
  HDFCLIFE: "HDFC Life",
  HINDALCO: "Hindalco",
  HINDUNILVR: "Hindustan Unilever",
  ICICIBANK: "ICICI Bank",
  INDIGO: "InterGlobe Aviation",
  INDUSINDBK: "IndusInd Bank",
  INFY: "Infosys",
  ITC: "ITC",
  JIOFIN: "Jio Financial",
  JSWSTEEL: "JSW Steel",
  KOTAKBANK: "Kotak Mahindra Bank",
  LT: "Larsen & Toubro",
  "M&M": "Mahindra & Mahindra",
  MARUTI: "Maruti Suzuki",
  NESTLEIND: "Nestle India",
  NTPC: "NTPC",
  ONGC: "ONGC",
  POWERGRID: "Power Grid",
  RELIANCE: "Reliance Industries",
  SBILIFE: "SBI Life",
  SBIN: "SBI",
  SHRIRAMFIN: "Shriram Finance",
  SUNPHARMA: "Sun Pharma",
  TATACONSUM: "Tata Consumer",
  TATASTEEL: "Tata Steel",
  TCS: "TCS",
  TECHM: "Tech Mahindra",
  TITAN: "Titan",
  TMPV: "Tata Motors",
  TRENT: "Trent",
  ULTRACEMCO: "UltraTech Cement",
  WIPRO: "Wipro",
};
const MOVERS_REFRESH_SECONDS = 120;

let moversMemo = { at: 0, live: null };

async function sparkChunk(symbols) {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/spark?symbols=${encodeURIComponent(symbols.join(","))}&range=1d&interval=1d`,
    { headers: { "User-Agent": "Mozilla/5.0" }, cache: "no-store" }
  );
  if (!response.ok) throw new Error(`Yahoo spark responded with ${response.status}`);
  return response.json();
}

const moverRow = (row) => ({
  name: row.name,
  value: price(row.price),
  change: `${Math.abs(row.change).toFixed(2)}%`,
  up: row.change >= 0,
});

async function moversData() {
  if (moversMemo.live && Date.now() - moversMemo.at < MOVERS_REFRESH_SECONDS * 1000) return moversMemo.live;

  const codes = Object.keys(NIFTY_50);
  const chunks = [];
  for (let index = 0; index < codes.length; index += 20) chunks.push(codes.slice(index, index + 20).map((code) => `${code}.NS`));
  const results = await Promise.allSettled(chunks.map(sparkChunk));

  const rows = results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => Object.entries(result.value || {}))
    .map(([symbol, quote]) => {
      const last = number(quote?.close?.at(-1));
      const previous = number(quote?.chartPreviousClose ?? quote?.previousClose);
      return {
        name: NIFTY_50[symbol.replace(/\.NS$/, "")] || symbol,
        price: last,
        change: last !== null && previous ? ((last - previous) / previous) * 100 : null,
      };
    })
    .filter((row) => row.price !== null && row.change !== null)
    .sort((a, b) => b.change - a.change);

  // Partial batches would skew the ranking, so only accept a near-complete set.
  if (rows.length >= codes.length * 0.8) {
    moversMemo = {
      at: Date.now(),
      live: {
        topGainers: rows.filter((row) => row.change > 0).slice(0, 5).map(moverRow),
        topLosers: rows.filter((row) => row.change < 0).reverse().slice(0, 5).map(moverRow),
      },
    };
  }
  return moversMemo.live;
}

const withLive = (rows, live, toRow) => rows.map((row) => (live[row.name] ? toRow(row, live[row.name]) : row));

/** Market widgets data: live indices, Brent, gainers/losers and IBJA gold where available, sample data otherwise. */
export async function getMarketData() {
  const [indices, gold, movers] = await Promise.all([
    indexData().catch(() => indexMemo.live),
    goldData().catch(() => goldMemo.live),
    moversData().catch(() => moversMemo.live),
  ]);
  const live = { ...(indices || {}), ...(gold || {}), ...(movers || {}) };

  return {
    liveTickers: withLive(fallback.liveTickers, live, (row, item) => ({
      ...row,
      value: item.value,
      percent: item.change,
      up: item.up,
    })),
    marketTape: withLive(fallback.marketTape, live, (row, item) => ({
      ...row,
      value: item.value,
      change: item.change,
      up: item.up,
    })),
    marketToday: withLive(fallback.marketToday, live, (row, item) => ({
      ...row,
      value: item.value,
      change: item.change,
      up: item.up,
    })),
    topGainers: live.topGainers || fallback.topGainers,
    topLosers: live.topLosers || fallback.topLosers,
    marketMeta: { ...fallback.marketMeta, updated: live.updated || fallback.marketMeta.updated },
  };
}
