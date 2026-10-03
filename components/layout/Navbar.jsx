"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { moreLinks, navLinks, toolsLinks } from "./navLinks";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 hidden overflow-visible bg-navy shadow-md lg:block">
      <div className="mx-auto flex max-w-8xl items-center justify-center overflow-visible px-4 text-center sm:px-6 lg:px-8">
        {navLinks.map((link) =>
          link.children ? (
            <NavDropdown
              key={link.label}
              label={link.label}
              items={link.children}
              pathname={pathname}
            />
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className={`whitespace-nowrap px-3.5 py-3 text-[14px] font-medium leading-tight transition ${
                isActive(pathname, link.href) ? "text-brand-red" : "text-white/90 hover:text-brand-red"
              }`}
            >
              {link.label}
            </Link>
          )
        )}
        <NavDropdown
          label="Tools"
          items={toolsLinks}
          pathname={pathname}
          align="right"
          splitBefore="Retirement Calculator"
        />
        <NavDropdown
          label="More"
          items={moreLinks}
          pathname={pathname}
          align="right"
          splitBefore="Podcasts"
        />
      </div>
    </nav>
  );
}

function isActive(pathname, href) {
  if (!href || href === "#") return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavDropdown({ label, items, pathname, align = "left", splitBefore }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const childActive = items.some((link) => isActive(pathname, link.href));

  useEffect(() => {
    function onClick(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center gap-1 whitespace-nowrap px-3.5 py-3 text-[14px] font-medium leading-tight transition ${
          open || childActive ? "text-brand-red" : "text-white/90 hover:text-brand-red"
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          className={`h-2.5 w-2.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M2.2 4.2a.75.75 0 011.06 0L6 6.94l2.74-2.74a.75.75 0 111.06 1.06L6.53 8.53a.75.75 0 01-1.06 0L2.2 5.26a.75.75 0 010-1.06z" />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          className={`absolute top-[calc(100%-1px)] z-50 w-56 overflow-hidden rounded-b-md border border-slate-200 bg-white py-1.5 shadow-[0_16px_40px_rgba(14,39,68,0.18)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <span className="absolute inset-x-0 top-0 h-0.5 bg-brand-red" />
          {items.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <span key={link.label}>
                {splitBefore && link.label === splitBefore ? (
                  <span className="mx-3 my-1.5 block h-px bg-slate-100" />
                ) : null}
                <Link
                  href={link.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-2 text-left text-[13px] leading-snug transition ${
                    active
                      ? "bg-[#fdecee] font-semibold text-brand-red"
                      : "text-navy hover:bg-slate-50 hover:text-brand-red"
                  }`}
                >
                  {link.label}
                </Link>
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
