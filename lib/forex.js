export const forexCurrencies = [
  { code: "INR", label: "Indian Rupee", symbol: "₹" },
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥" },
  { code: "AED", label: "UAE Dirham", symbol: "د.إ" },
  { code: "SGD", label: "Singapore Dollar", symbol: "S$" },
  { code: "AUD", label: "Australian Dollar", symbol: "A$" },
  { code: "CAD", label: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", label: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", label: "Chinese Yuan", symbol: "¥" },
];

// INR per 1 unit of currency (illustrative fallback if live fetch fails).
export const fallbackForexRates = {
  INR: 1,
  USD: 83.5,
  EUR: 90.2,
  GBP: 105.8,
  JPY: 0.56,
  AED: 22.75,
  SGD: 62.4,
  AUD: 54.1,
  CAD: 60.3,
  CHF: 94.5,
  CNY: 11.5,
};

const YAHOO_PAIRS = {
  USD: "USDINR=X",
  EUR: "EURINR=X",
  GBP: "GBPINR=X",
  JPY: "JPYINR=X",
  AED: "AEDINR=X",
  SGD: "SGDINR=X",
  AUD: "AUDINR=X",
  CAD: "CADINR=X",
  CHF: "CHFINR=X",
  CNY: "CNYINR=X",
};

export function calculateForex({ amount, from, to, rates }) {
  const table = rates || fallbackForexRates;
  const fromRate = Number(table[from]) || 0;
  const toRate = Number(table[to]) || 0;
  const safeAmount = Number(amount) || 0;

  if (!fromRate || !toRate) {
    return { converted: 0, rate: 0, inverse: 0 };
  }

  const converted = safeAmount * (fromRate / toRate);
  const rate = fromRate / toRate;
  const inverse = toRate / fromRate;

  return { converted, rate, inverse };
}

export function formatForex(value, code, { digits } = {}) {
  const currency = forexCurrencies.find((item) => item.code === code);
  const places =
    digits ??
    (code === "JPY" ? 0 : code === "INR" && Math.abs(value) >= 100 ? 2 : Math.abs(value) < 1 ? 4 : 2);

  const number = value.toLocaleString("en-IN", {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  });

  return `${currency?.symbol || ""}${number}`;
}

export async function fetchForexRates() {
  const entries = Object.entries(YAHOO_PAIRS);
  const results = await Promise.allSettled(
    entries.map(async ([code, symbol]) => {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`,
        { headers: { "User-Agent": "Mozilla/5.0" }, cache: "no-store" }
      );
      if (!response.ok) throw new Error(`${symbol} ${response.status}`);
      const price = Number((await response.json())?.chart?.result?.[0]?.meta?.regularMarketPrice);
      if (!Number.isFinite(price) || price <= 0) throw new Error(`${symbol} empty`);
      return [code, price];
    })
  );

  const rates = { ...fallbackForexRates, INR: 1 };
  let live = 0;
  results.forEach((result, index) => {
    if (result.status !== "fulfilled") return;
    const [code, price] = result.value;
    rates[code] = price;
    live += 1;
  });

  return {
    rates,
    live,
    updatedAt: live ? new Date().toISOString() : null,
  };
}
