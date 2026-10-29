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
  "Midcap Nifty": "^NSEMDCP50",
  FinNifty: "^CNXFIN",
  Bankex: "BSE-BANK.BO",
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

// GIFT Nifty is not on Yahoo; Moneycontrol appfeeds (in;gsx) and NSE /api/marketStatus both publish it.
const GIFT_NIFTY_NAME = "GIFT Nifty";
const GIFT_REFRESH_SECONDS = 120;

let giftMemo = { at: 0, live: null };

async function giftNiftyFromMoneycontrol() {
  const response = await fetch(
    "https://appfeeds.moneycontrol.com/jsonapi/market/indices&ind_id=in%3Bgsx&type=0",
    { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" }, cache: "no-store" }
  );
  if (!response.ok) throw new Error(`Moneycontrol GIFT Nifty responded with ${response.status}`);
  const indices = (await response.json())?.indices;
  const last = number(String(indices?.lastprice || "").replace(/,/g, ""));
  const change = number(indices?.percentchange);
  if (last === null || change === null) return null;
  return {
    name: GIFT_NIFTY_NAME,
    value: price(last),
    change: percent(change),
    up: change >= 0,
  };
}

async function giftNiftyFromNse() {
  const home = await fetch("https://www.nseindia.com/", {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "text/html" },
    cache: "no-store",
  });
  const cookie = (home.headers.getSetCookie?.() || []).map((part) => part.split(";")[0]).join("; ");
  const response = await fetch("https://www.nseindia.com/api/marketStatus", {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
      Referer: "https://www.nseindia.com/market-data/live-market-indices",
      Cookie: cookie,
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`NSE marketStatus responded with ${response.status}`);
  const gift = (await response.json())?.giftnifty;
  const last = number(gift?.LASTPRICE);
  const change = number(gift?.PERCHANGE);
  if (last === null || change === null) return null;
  return {
    name: GIFT_NIFTY_NAME,
    value: price(last),
    change: percent(change),
    up: change >= 0,
  };
}

async function giftNiftyData() {
  if (giftMemo.live && Date.now() - giftMemo.at < GIFT_REFRESH_SECONDS * 1000) return giftMemo.live;

  try {
    const item = (await giftNiftyFromMoneycontrol().catch(() => null)) || (await giftNiftyFromNse().catch(() => null));
    if (item) giftMemo = { at: Date.now(), live: { [GIFT_NIFTY_NAME]: item } };
  } catch {
    /* keep last good quote */
  }
  return giftMemo.live;
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

const stockTapeRow = (row) => ({
  symbol: row.symbol,
  value: price(row.price),
  change: price(Math.abs(row.changeAbs)),
  percent: `${Math.abs(row.change).toFixed(2)}%`,
  up: row.change >= 0,
});

// NSE homepage stock strip: full Nifty 50 book from equity-stock-indices (cookie session required).
const STOCK_TAPE_REFRESH_SECONDS = 120;
let stockTapeMemo = { at: 0, live: null };

async function nseSessionCookie() {
  const home = await fetch("https://www.nseindia.com/", {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "text/html" },
    cache: "no-store",
  });
  return (home.headers.getSetCookie?.() || []).map((part) => part.split(";")[0]).join("; ");
}

async function stockTapeFromNse() {
  const cookie = await nseSessionCookie();
  const response = await fetch("https://www.nseindia.com/api/equity-stock-indices?index=NIFTY%2050", {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
      Referer: "https://www.nseindia.com/",
      Cookie: cookie,
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`NSE stock indices responded with ${response.status}`);
  const rows = ((await response.json())?.data || [])
    .filter((row) => row?.series === "EQ" && row?.symbol)
    .map((row) => {
      const last = number(row.lastPrice);
      const changePct = number(row.pChange);
      const changeAbs = number(row.change);
      if (last === null || changePct === null || changeAbs === null) return null;
      return { symbol: row.symbol, price: last, change: changePct, changeAbs };
    })
    .filter(Boolean);
  return rows.length ? rows.map(stockTapeRow) : null;
}

async function stockTapeFromYahoo() {
  const codes = Object.keys(NIFTY_50);
  const chunks = [];
  for (let index = 0; index < codes.length; index += 20) chunks.push(codes.slice(index, index + 20).map((code) => `${code}.NS`));
  const results = await Promise.allSettled(chunks.map(sparkChunk));
  return results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => Object.entries(result.value || {}))
    .map(([symbol, quote]) => {
      const code = symbol.replace(/\.NS$/, "");
      const last = number(quote?.close?.at(-1));
      const previous = number(quote?.chartPreviousClose ?? quote?.previousClose);
      if (last === null || previous === null) return null;
      return {
        symbol: code,
        price: last,
        change: ((last - previous) / previous) * 100,
        changeAbs: last - previous,
      };
    })
    .filter(Boolean)
    .map(stockTapeRow);
}

async function stockTapeData() {
  if (stockTapeMemo.live && Date.now() - stockTapeMemo.at < STOCK_TAPE_REFRESH_SECONDS * 1000) return stockTapeMemo.live;

  try {
    const tape = (await stockTapeFromNse().catch(() => null)) || (await stockTapeFromYahoo().catch(() => null));
    if (tape?.length) stockTapeMemo = { at: Date.now(), live: tape };
  } catch {
    /* keep last good tape */
  }
  return stockTapeMemo.live;
}

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
  const [indices, gift, gold, movers, stockTape] = await Promise.all([
    indexData().catch(() => indexMemo.live),
    giftNiftyData().catch(() => giftMemo.live),
    goldData().catch(() => goldMemo.live),
    moversData().catch(() => moversMemo.live),
    stockTapeData().catch(() => stockTapeMemo.live),
  ]);
  const live = { ...(indices || {}), ...(gift || {}), ...(gold || {}), ...(movers || {}) };

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
    stockTape: stockTape?.length ? stockTape : fallback.stockTape,
    topGainers: live.topGainers || fallback.topGainers,
    topLosers: live.topLosers || fallback.topLosers,
    marketMeta: { ...fallback.marketMeta, updated: live.updated || fallback.marketMeta.updated },
  };
}
