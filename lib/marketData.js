export const liveTickers = [
  { name: "GIFT Nifty", value: "22,536.50", percent: "-0.78%", up: false },
  { name: "Sensex", value: "82,456.32", percent: "+0.50%", up: true },
  { name: "Nifty 50", value: "25,189.45", percent: "+0.51%", up: true },
  { name: "Bank Nifty", value: "51,230.80", percent: "+0.38%", up: true },
  { name: "Midcap Nifty", value: "16,790.95", percent: "-0.92%", up: false },
  { name: "FinNifty", value: "26,821.50", percent: "-1.43%", up: false },
  { name: "Bankex", value: "62,479.85", percent: "-0.46%", up: false },
  { name: "USD/INR", value: "83.12", percent: "-0.10%", up: false },
  { name: "Gold 24K", value: "₹72,540", percent: "+0.44%", up: true },
  { name: "Brent Crude", value: "$64.20", percent: "-0.43%", up: false },
];

export const marketMeta = {
  updated: "09:42 AM IST",
  status: "Live | Delayed",
};

export const marketToday = [
  { name: "GIFT Nifty", value: "22,536.50", change: "-0.78%", up: false },
  { name: "Nifty 50", value: "25,189.45", change: "+0.51%", up: true },
  { name: "Sensex", value: "82,456.32", change: "+0.50%", up: true },
  { name: "Bank Nifty", value: "51,230.80", change: "+0.38%", up: true },
  { name: "Midcap Nifty", value: "16,790.95", change: "-0.92%", up: false },
  { name: "FinNifty", value: "26,821.50", change: "-1.43%", up: false },
  { name: "Bankex", value: "62,479.85", change: "-0.46%", up: false },
];

export const marketTape = [
  { name: "India VIX", value: "12.84", change: "-2.10%", up: false },
  { name: "USD/INR", value: "83.12", change: "-0.10%", up: false },
  { name: "Gold 24K", value: "₹72,540", change: "+0.44%", up: true },
  { name: "Brent Crude", value: "$64.20", change: "-0.43%", up: false },
];

export const topGainers = [
  { name: "HDFC Bank", value: "1,748.50", change: "2.35%", up: true },
  { name: "ICICI Bank", value: "1,287.20", change: "1.92%", up: true },
  { name: "Axis Bank", value: "1,144.30", change: "1.85%", up: true },
  { name: "Kotak Bank", value: "1,923.60", change: "1.62%", up: true },
  { name: "SBI", value: "812.40", change: "1.48%", up: true },
];

export const topLosers = [
  { name: "Tata Motors", value: "867.20", change: "2.14%", up: false },
  { name: "NTPC", value: "311.80", change: "1.62%", up: false },
  { name: "Power Grid", value: "287.40", change: "1.35%", up: false },
  { name: "Hindalco", value: "612.10", change: "1.28%", up: false },
  { name: "ONGC", value: "263.90", change: "1.12%", up: false },
];

/** NSE-style stock strip under Markets Live (Nifty 50 constituents). */
export const stockTape = [
  { symbol: "RELIANCE", value: "1,174.40", change: "16.40", percent: "1.42%", up: true },
  { symbol: "HDFCBANK", value: "683.70", change: "1.60", percent: "0.23%", up: false },
  { symbol: "ICICIBANK", value: "1,287.20", change: "12.40", percent: "0.97%", up: true },
  { symbol: "INFY", value: "1,133.35", change: "10.20", percent: "0.91%", up: true },
  { symbol: "TCS", value: "3,512.00", change: "18.50", percent: "0.53%", up: true },
  { symbol: "BHARTIARTL", value: "1,962.60", change: "14.50", percent: "0.74%", up: true },
  { symbol: "SBIN", value: "812.40", change: "8.20", percent: "1.02%", up: true },
  { symbol: "BAJFINANCE", value: "926.30", change: "9.05", percent: "0.99%", up: true },
  { symbol: "CIPLA", value: "1,368.00", change: "2.40", percent: "0.18%", up: true },
  { symbol: "COALINDIA", value: "412.50", change: "3.10", percent: "0.76%", up: true },
];
