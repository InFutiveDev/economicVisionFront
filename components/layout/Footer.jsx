"use client";

import Link from "next/link";
import Image from "next/image";
import { navLinks } from "./navLinks";

const exploreItems = [...navLinks, { href: "/epaper", label: "E-Paper" }];

const companyItems = [
  { label: "About Us", href: "#" },
  { label: "Our Team", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Advertise", href: "#" },
  { label: "Media Kit", href: "#" },
  { label: "Contact Us", href: "#" },
];

const legalItems = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Disclaimer", href: "#" },
  { label: "Sitemap", href: "#" },
];

const editorialItems = [
  { label: "Editorial Policy", href: "#" },
  { label: "Corrections Policy", href: "#" },
  { label: "Fact-Checking Policy", href: "#" },
  { label: "Ownership / About", href: "#" },
  { label: "Contact Editorial Team", href: "#" },
];

const shortcuts = [
  { label: "Markets", icon: "chart" },
  { label: "Insights", icon: "doc" },
  { label: "Ideas", icon: "idea" },
  { label: "Opportunities", icon: "people" },
];

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/image/footer.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1c33] via-[#0a1c33]/80 to-[#0a1c33]/40" />

      <div className="relative z-10 mx-auto grid max-w-8xl grid-cols-1 gap-10 px-6 py-11 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.62fr_0.62fr_0.62fr_0.9fr_1.45fr] lg:gap-6 lg:px-8">
        <div className="border-r border-white/15 pr-6">
          <Link href="/" className="notranslate inline-block">
            <Image
              src="/image/logo-light.svg"
              alt="The Economic Vision"
              width={230}
              height={78}
              className="h-[70px] w-auto object-contain object-left"
            />
          </Link>
          <p className="mt-4 max-w-[230px] text-[13px] leading-6 text-white">
            Premium financial news and economic intelligence for a smarter tomorrow.
          </p>
          <span className="mt-3 block h-[2px] w-9 bg-brand-red" />

          <div className="mt-5 flex max-w-[250px] items-start justify-between text-white">
            {shortcuts.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5">
                <ShortcutIcon name={item.icon} />
                <span className="text-[12px] font-semibold leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[12px] font-regular text-white">
            Be informed. Make better decisions.
          </p>
        </div>

        <FooterColumn title="Explore" items={exploreItems} />
        <FooterColumn title="Company" items={companyItems} />
        <FooterColumn title="Legal" items={legalItems} />
        <FooterColumn title="Editorial Standards" items={editorialItems} />

        <div>
          <h3 className="text-[16px] font-bold">
            Stay Connected
            <span className="mt-2 block h-[2px] w-8 bg-brand-red" />
          </h3>
          <p className="mt-3 max-w-sm text-[13px] font-regular leading-6 text-white">
            Get the latest news, insights and market updates, straight to your inbox.
          </p>

          <form className="mt-4 flex items-center gap-2" onSubmit={(event) => event.preventDefault()}>
            <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-navy outline-none placeholder:text-slate-400"
              />
            </label>
            <button
              type="submit"
              className="h-10 shrink-0 rounded-full bg-brand-red px-4 text-[13px] font-semibold hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>

          <label className="mt-3 flex items-center gap-2 text-[12px] font-regular text-white">
            <input type="checkbox" className="accent-brand-red" />
            I agree to receive newsletters and updates.
          </label>

          <h4 className="mt-5 text-[16px] font-bold">Follow Us</h4>
          <div className="mt-2.5 flex items-center gap-2">
            <SocialIcon label="Facebook">
              <path d="M15 8h-2.2c-.4 0-.8.4-.8.9v1.9H15l-.4 2.8h-2.6V22h-3v-8.4H7v-2.8h2V9.2A3.2 3.2 0 0112.3 6H15z" />
            </SocialIcon>
            <SocialIcon label="X">
              <path d="M17.8 4H20l-6.2 7.1L20.7 20h-5.2l-4-5.3L6.8 20H4.6l6.6-7.6L3.4 4h5.3l3.7 4.9L17.8 4zm-1.8 14.4h1.4L8.1 5.5H6.6l9.4 12.9z" />
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <path d="M6.5 9H4v11h2.5V9zM5.2 3.4A1.6 1.6 0 105.2 6.6 1.6 1.6 0 005.2 3.4zM20 20h-2.5v-6c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.8.8-2.1 1.5-.1.3-.1.6-.1.9V20H11V9h2.4v1.5c.6-.9 1.6-2.2 3.9-2.2 2.8 0 4.7 1.8 4.7 5.7V20z" />
            </SocialIcon>
            <SocialIcon label="YouTube">
              <path d="M21.6 7.2a2.7 2.7 0 00-1.9-1.9C18.1 5 12 5 12 5s-6.1 0-7.7.3a2.7 2.7 0 00-1.9 1.9A28 28 0 002 12a28 28 0 00.4 4.8 2.7 2.7 0 001.9 1.9C5.9 19 12 19 12 19s6.1 0 7.7-.3a2.7 2.7 0 001.9-1.9A28 28 0 0022 12a28 28 0 00-.4-4.8zM10 15.2V8.8L15.5 12 10 15.2z" />
            </SocialIcon>
            <SocialIcon label="Instagram">
              <path d="M8 3h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5zm8 1.8H8A3.2 3.2 0 004.8 8v8A3.2 3.2 0 008 19.2h8A3.2 3.2 0 0019.2 16V8A3.2 3.2 0 0016 4.8zM12 7.4A4.6 4.6 0 1112 16.6 4.6 4.6 0 0112 7.4zm0 1.8A2.8 2.8 0 1014.8 12 2.8 2.8 0 0012 9.2zM17.4 6.4a1 1 0 11-1 1 1 1 0 011-1z" />
            </SocialIcon>
          </div>

          <div className="mt-5 flex flex-nowrap items-center gap-2.5">
            <StoreBadge store="apple" />
            <StoreBadge store="google" />
            
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-8xl flex-col gap-1 px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-[12px] font-regular text-white">© 2026 The Economic Vision.</p>
          <p className="flex items-center gap-2 text-[10px] font-regular text-white">
            Designed & Developed by Infutive Technology Pvt. Ltd.
            <span className="h-px w-6 bg-brand-red" />
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="border-r border-white/15 pr-6">
      <h3 className="text-[16px] font-bold">
        {title}
        <span className="mt-2 block h-[2px] w-8 bg-brand-red" />
      </h3>
      <ul className="mt-4 max-w-[150px] space-y-2.5 text-[13px] font-regular text-white">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="flex items-center justify-between gap-3 hover:text-brand-red">
              <span>{item.label}</span>
              
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ label, children }) {
  return (
    <Link
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        {children}
      </svg>
    </Link>
  );
}

function ShortcutIcon({ name }) {
  const className = "h-6 w-6";
  if (name === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 19V12M9 19V8M14 19v-6M20 19H3" />
        <path d="M4 11l5-4 4 3 5-6" />
      </svg>
    );
  }
  if (name === "doc") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    );
  }
  if (name === "idea") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3 11c.4.4.8 1.2.9 2h4.2c.1-.8.5-1.6.9-2A6 6 0 0012 3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="8" r="2.2" />
      <circle cx="16" cy="9" r="1.8" />
      <path d="M4.5 18c.4-2.6 2.2-4 4.5-4s4.1 1.4 4.5 4M13 18c.3-1.8 1.4-3 3-3 1.5 0 2.6 1 3 2.6" />
    </svg>
  );
}

function StoreBadge({ store }) {
  if (store === "apple") {
    return (
      <Link href="#" className="flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-black px-2.5">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-1-3-.9c-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.3 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.3c1-.1 2-1.1 2.5-2.2-6.3-2.4-5.3-9-3.8-10zM14.2 5.8c.6-.8 1.1-1.8.9-2.8-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.8 1.1.1 2.2-.6 2.9-1.5z" />
        </svg>
        <span className="leading-tight">
          <span className="block text-[8px] text-white/70">Download on the</span>
          <span className="block text-[11px] font-semibold">App Store</span>
        </span>
      </Link>
    );
  }
  return (
    <Link href="#" className="flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-black px-2.5">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M4.3 3.2v17.6c0 .5.4.7.8.4l9.7-8.6c.5-.4.5-1.2 0-1.6L5.1 2.8c-.4-.4-.8-.1-.8.4z" fill="#34A853" />
        <path d="M16.3 12.2l-2.3-2 9.3-5.3c.7-.4 1.4.2 1.1.9l-8.1 6.4z" fill="#FBBC04" />
        <path d="M16.3 11.8l8.1 6.4c.3.7-.4 1.3-1.1.9l-9.3-5.3 2.3-2z" fill="#EA4335" />
        <path d="M14 13.8l-8.9 7.5c.5.3 1.1 0 1.8-.4l9.4-5.4L14 13.8z" fill="#4285F4" />
      </svg>
      <span className="leading-tight">
        <span className="block text-[8px] text-white/70">GET IT ON</span>
        <span className="block text-[11px] font-semibold">Google Play</span>
      </span>
    </Link>
  );
}
