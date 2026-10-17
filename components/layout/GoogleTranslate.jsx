"use client";

import { useEffect, useRef, useState } from "react";

export const translateLanguages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "bn", label: "বাংলা" },
];

const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

function cookieLanguageCode() {
  if (typeof document === "undefined") return "en";
  const codes = [...document.cookie.matchAll(/(?:^|;\s*)googtrans=([^;]*)/g)].map((match) => {
    const value = decodeURIComponent(match[1] || "");
    const parts = value.split("/").filter(Boolean);
    return parts[1] || parts[0] || "";
  });
  const code = [...codes].reverse().find((value) => value && value !== "en") || codes.at(-1) || "en";
  return !code || code === "en" ? "en" : code;
}

function labelForCode(code) {
  return translateLanguages.find((lang) => lang.code === code)?.label || "English";
}

function rootDomain(hostname) {
  const parts = hostname.split(".").filter(Boolean);
  if (parts.length <= 2) return hostname;
  return parts.slice(-2).join(".");
}

function isLocalHost(hostname) {
  return !hostname || hostname === "localhost" || hostname.endsWith(".localhost") || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname);
}

function cookieDomainList() {
  const hostname = window.location.hostname;
  const domains = new Set(["", hostname]);
  if (!isLocalHost(hostname)) {
    const root = rootDomain(hostname);
    domains.add(`.${hostname}`);
    domains.add(root);
    domains.add(`.${root}`);
  }
  return [...domains];
}

function clearGoogTransCookies() {
  const flagSets = [
    "",
    "; SameSite=Lax",
    "; SameSite=None; Secure",
    window.location.protocol === "https:" ? "; Secure" : "",
    `; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`,
  ];
  cookieDomainList().forEach((domain) => {
    const domainPart = domain ? `; domain=${domain}` : "";
    flagSets.forEach((flags) => {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}${flags}`;
      document.cookie = `googtrans=; Max-Age=0; path=/${domainPart}${flags}`;
    });
  });
}

function writeGoogTransCookie(value) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  cookieDomainList().forEach((domain) => {
    const domainPart = domain ? `; domain=${domain}` : "";
    document.cookie = `googtrans=${value}; path=/; SameSite=Lax${secure}${domainPart}`;
  });
}

function syncCookie(code) {
  clearGoogTransCookies();
  writeGoogTransCookie(code === "en" ? "/en/en" : `/en/${code}`);
}

function getCombo() {
  return document.querySelector("#google_translate_element select.goog-te-combo, select.goog-te-combo");
}

async function waitForCombo(timeoutMs = 8000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const combo = getCombo();
    if (combo) return combo;
    await delay(100);
  }
  return null;
}

function fireComboChange(combo, value) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value")?.set;
  setter?.call(combo, value);
  combo.dispatchEvent(new Event("change", { bubbles: true }));
}

/**
 * Google Translate only reliably switches languages if we:
 * 1) reset the combo to "" (original),
 * 2) wait,
 * 3) set the target code,
 * and when returning to English, fire change twice.
 */
async function translateTo(code) {
  const combo = await waitForCombo();
  if (!combo) return false;

  const active = combo.value || cookieLanguageCode();
  if (active === code || (code === "en" && !active)) {
    syncCookie(code);
    return true;
  }

  // Always return to original first — required to re-select a previous language.
  fireComboChange(combo, "");
  // English needs a second change event (Google replaces "en" with a blank option).
  fireComboChange(combo, "");
  await delay(700);

  if (code === "en") {
    syncCookie("en");
    // Reload clears leftover <font> wrappers from the previous translation.
    window.location.reload();
    return true;
  }

  fireComboChange(combo, code);
  // If Google ignored the first set (common when revisiting a language), try again.
  await delay(400);
  if (combo.value !== code) {
    fireComboChange(combo, "");
    await delay(500);
    fireComboChange(combo, code);
  }

  syncCookie(code);
  return combo.value === code || cookieLanguageCode() === code;
}

export function GoogleTranslateWidget() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return undefined;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate || getCombo()) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: translateLanguages.map((lang) => lang.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Do NOT remove Google's banner/iframe nodes — that breaks language re-selection.
    // They are hidden via CSS in globals.css instead.
    return undefined;
  }, []);

  return (
    <div
      id="google_translate_element"
      className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
      aria-hidden="true"
    />
  );
}

export default function GoogleTranslate({ variant = "header" }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("English");
  const [busy, setBusy] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    setCurrent(labelForCode(cookieLanguageCode()));
  }, []);

  useEffect(() => {
    function onClick(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function changeLanguage(code, label) {
    if (busy) return;
    setOpen(false);
    setCurrent(label);
    setBusy(true);

    try {
      const ok = await translateTo(code);
      if (!ok) {
        // Last resort: cookie + full navigation.
        syncCookie(code);
        window.location.href = `${window.location.pathname}${window.location.search}`;
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        disabled={busy}
        className={
          variant === "menu"
            ? "flex w-full items-center gap-2 border border-[#d9e2ec] rounded-lg px-3 py-3 text-left text-navy hover:bg-slate-50 disabled:opacity-60"
            : "notranslate flex items-center gap-1 rounded-lg border border-[#d9e2ec] px-2.5 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy disabled:opacity-60"
        }
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Change language"
      >
        {variant === "menu" ? <GlobeIcon /> : null}
        <span className="notranslate">{busy ? "Translating…" : current}</span>
        <span className="text-[9px] text-slate-400">▼</span>
      </button>
      {open && !busy ? (
        <ul
          role="listbox"
          className={
            variant === "menu"
              ? "notranslate mt-1 rounded-md border border-slate-200 bg-white py-1"
              : "notranslate absolute right-0 z-50 mt-2 w-44 rounded-md border border-slate-200 bg-white py-1 shadow-lg"
          }
        >
          {translateLanguages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => changeLanguage(lang.code, lang.label)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                  current === lang.label ? "font-semibold text-brand-red" : "text-slate-700"
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}
