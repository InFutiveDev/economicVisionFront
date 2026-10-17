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

const PENDING_KEY = "ev_gt_pending";

function cookieLanguageCode() {
  if (typeof document === "undefined") return "en";
  const codes = [...document.cookie.matchAll(/(?:^|;\s*)googtrans=([^;]*)/g)].map((match) => {
    const value = decodeURIComponent(match[1] || "");
    const parts = value.split("/").filter(Boolean);
    // values look like en/hi or /en/hi
    return parts[1] || parts[0] || "";
  });
  const code = [...codes].reverse().find((value) => value && value !== "en") || codes.at(-1) || "en";
  return code === "en" || !code ? "en" : code;
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
  const domains = cookieDomainList();
  const flagSets = [
    "",
    "; SameSite=Lax",
    "; SameSite=None; Secure",
    window.location.protocol === "https:" ? "; Secure" : "",
    `; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`,
  ];

  domains.forEach((domain) => {
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

function stripGoogTransHash() {
  if (!window.location.hash.toLowerCase().includes("googtrans")) return;
  history.replaceState(null, "", window.location.pathname + window.location.search);
}

function hardReload() {
  window.location.href = `${window.location.pathname}${window.location.search}`;
}

function resetToEnglishCookies() {
  stripGoogTransHash();
  clearGoogTransCookies();
  writeGoogTransCookie("/en/en");
}

function applyTargetLanguage(code) {
  stripGoogTransHash();
  clearGoogTransCookies();
  writeGoogTransCookie(`/en/${code}`);
}

export function GoogleTranslateWidget() {
  useEffect(() => {
    // Finish a two-step switch: English reset → apply pending language → reload.
    const pending = sessionStorage.getItem(PENDING_KEY);
    if (pending && translateLanguages.some((lang) => lang.code === pending && pending !== "en")) {
      sessionStorage.removeItem(PENDING_KEY);
      applyTargetLanguage(pending);
      hardReload();
      return undefined;
    }

    if (document.getElementById("google-translate-script")) return undefined;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate || document.querySelector(".goog-te-combo")) return;
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

    function hideTranslatePopups() {
      document
        .querySelectorAll("#goog-gt-tt, .goog-te-balloon-frame, .goog-te-banner-frame, iframe.goog-te-banner-frame")
        .forEach((node) => {
          node.remove();
        });
    }

    const observer = new MutationObserver(hideTranslatePopups);
    observer.observe(document.body, { childList: true, subtree: true });
    hideTranslatePopups();

    return () => observer.disconnect();
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
  const rootRef = useRef(null);

  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_KEY);
    setCurrent(pending ? labelForCode(pending) : labelForCode(cookieLanguageCode()));
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

  function changeLanguage(code, label) {
    setOpen(false);
    setCurrent(label);

    const active = cookieLanguageCode();
    if (code === active && !sessionStorage.getItem(PENDING_KEY)) return;

    // English: clear translation and reload once.
    if (code === "en") {
      sessionStorage.removeItem(PENDING_KEY);
      resetToEnglishCookies();
      hardReload();
      return;
    }

    // From English: set target and reload once.
    if (active === "en") {
      sessionStorage.removeItem(PENDING_KEY);
      applyTargetLanguage(code);
      hardReload();
      return;
    }

    // Non-English → another language (including a previous one).
    // Google ignores re-selecting a language, so reset to English first, then apply on next load.
    sessionStorage.setItem(PENDING_KEY, code);
    resetToEnglishCookies();
    hardReload();
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={
          variant === "menu"
            ? "flex w-full items-center gap-2 border border-[#d9e2ec] rounded-lg px-3 py-3 text-left text-navy hover:bg-slate-50"
            : "notranslate flex items-center gap-1 rounded-lg border border-[#d9e2ec] px-2.5 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy"
        }
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Change language"
      >
        {variant === "menu" ? <GlobeIcon /> : null}
        <span className="notranslate">{current}</span>
        <span className="text-[9px] text-slate-400">▼</span>
      </button>
      {open && (
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
      )}
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
