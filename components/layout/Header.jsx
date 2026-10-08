"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileCanvasMenu from "./MobileCanvasMenu";
import GoogleTranslate, { GoogleTranslateWidget } from "./GoogleTranslate";
import SubscribeButton from "@/components/subscribe/SubscribeButton";

export default function Header({ links }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="border-b border-white/[0.08] bg-white">
      <div className="hidden border-b border-white/[0.08] bg-navy text-[12px] font-regular text-white lg:block">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
          <p>
            <IstClock />
            <span className="mx-2 text-white">|</span> New Delhi, India
          </p>
          <p>Stay Informed, Make Better Decisions.</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-8xl items-center gap-3 px-4 py-2 sm:gap-5 sm:px-6 lg:px-8">
        <Link href="/" className="notranslate shrink-0">
          <Image
            src="/image/logo.svg"
            alt="The Economic Vision"
            width={220}
            height={80}
            className="h-[80px] w-auto object-contain object-left"
            priority
          />
          
        </Link>

        <form action="/search" role="search" className="hidden min-w-0 flex-1 md:block">
          <SearchField />
        </form>

        <div className="hidden items-center gap-4 lg:flex">
          <GoogleTranslate />
          <HeaderLink icon="paper" label="E-Paper" href="/epaper" />
          <HeaderLink icon="mic" label="Podcast" href="/media#podcasts" />
          <Link
            href="#"
            className="ml-2 rounded-md border border-brand-red px-3.5 py-1.5 text-sm font-semibold text-brand-red transition hover:bg-red-50"
          >
            Login
          </Link>
          <SubscribeButton className="rounded-md bg-brand-red px-3.5 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700" />
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <button
            type="button"
            className="rounded-md p-2 text-navy hover:bg-slate-50 md:hidden"
            onClick={() => setSearchOpen((value) => !value)}
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
          </button>
          <button
            className="rounded-md p-2 text-navy hover:bg-slate-50"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-canvas-menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {searchOpen ? (
        <form action="/search" role="search" className="border-t border-slate-100 px-4 py-2 md:hidden">
          <SearchField autoFocus />
        </form>
      ) : null}

      <GoogleTranslateWidget />
      <MobileCanvasMenu links={links} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

const istDate = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "long",
  day: "numeric",
  month: "short",
  year: "numeric",
});

const istTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

function formatIst(date) {
  return `${istDate.format(date)} | ${istTime.format(date).toUpperCase()} IST`;
}

function IstClock() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => setLabel(formatIst(new Date()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {label}
    </time>
  );
}

function SearchField({ autoFocus = false }) {
  return (
    <div className="relative">
      <input
        type="search"
        name="q"
        aria-label="Search news"
        required
        placeholder="Search news, stocks, funds..."
        autoFocus={autoFocus}
        className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-5 pr-12 text-sm outline-none transition focus:border-navy focus:bg-white"
      />
      <button
        type="submit"
        className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-white"
        aria-label="Search"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" />
        </svg>
      </button>
    </div>
  );
}

function HeaderLink({ icon, label, href = "#" }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy"
    >
      {icon === "paper" ? <PaperIcon /> : <MicIcon />}
      {label}
    </Link>
  );
}

function PaperIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" />
    </svg>
  );
}
