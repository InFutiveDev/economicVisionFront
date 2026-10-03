import Link from "next/link";
import { toolsLinks } from "@/components/layout/navLinks";

export default function ToolsSidebar({ current }) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-3.5">
      <h2 className="text-[16px] font-extrabold uppercase tracking-[0.04em] text-navy">Tools</h2>
      <ul className="mt-3">
        {toolsLinks.map((tool) => {
          const active = tool.href === current;
          return (
            <li key={tool.label} className="border-b border-slate-100 last:border-b-0">
              <Link
                href={tool.href}
                className={`group flex items-center gap-3 py-3 ${active ? "pointer-events-none" : ""}`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    active ? "bg-red-50 text-brand-red" : "bg-slate-50 text-navy"
                  }`}
                >
                  <CalcIcon />
                </span>
                <span className="min-w-0 flex-1">
                  <p className={`text-[14px] font-bold ${active ? "text-brand-red" : "text-navy group-hover:text-brand-red"}`}>
                    {tool.label}
                  </p>
                </span>
                <span className="text-[18px] text-slate-300">›</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function CalcIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </svg>
  );
}
