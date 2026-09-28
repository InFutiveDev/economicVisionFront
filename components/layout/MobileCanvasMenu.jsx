"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { moreLinks, navLinks } from "./navLinks";
import GoogleTranslate from "./GoogleTranslate";

export default function MobileCanvasMenu({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Close menu"
      />

      <aside
        id="mobile-canvas-menu"
        className={`absolute left-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <Link href="/" onClick={onClose} className="shrink-0">
            <Image
              src="/image/logo.svg"
              alt="The Economic Vision"
              width={140}
              height={56}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-navy hover:bg-slate-100"
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-md px-3 py-3 text-base font-medium text-navy hover:bg-slate-50"
              >
                {link.label}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  onClick={onClose}
                  className="block rounded-md px-3 py-2 pl-6 text-[14px] text-slate-600 hover:bg-slate-50 hover:text-brand-red"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}

          <p className="mt-3 px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            More
          </p>
          {moreLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="block rounded-md px-3 py-2.5 text-[15px] font-medium text-navy hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}

          <div className="my-3 border-t border-slate-200" />

          <Link href="/epaper" onClick={onClose} className="flex items-center gap-2 rounded-md px-3 py-3 text-navy hover:bg-slate-50">
            <PaperIcon />
            E-Paper
          </Link>
          <Link href="#" onClick={onClose} className="flex items-center gap-2 rounded-md px-3 py-3 text-navy hover:bg-slate-50">
            <MicIcon />
            Podcast
          </Link>
          <GoogleTranslate variant="menu" />
        </nav>

        <div className="flex gap-3 border-t border-slate-200 p-4">
          <Link
            href="#"
            onClick={onClose}
            className="flex-1 rounded-md border border-brand-red py-2.5 text-center text-sm font-semibold text-brand-red"
          >
            Login
          </Link>
          <Link
            href="#"
            onClick={onClose}
            className="flex-1 rounded-md bg-brand-red py-2.5 text-center text-sm font-semibold text-white"
          >
            Subscribe
          </Link>
        </div>
      </aside>
    </div>
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
