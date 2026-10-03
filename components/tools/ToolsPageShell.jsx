import Link from "next/link";
import ToolsSidebar from "./ToolsSidebar";

export default function ToolsPageShell({ title, description, current, aside, children }) {
  return (
    <main className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-slate-400">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <span>›</span>
          <span>Tools</span>
          <span>›</span>
          <span className="text-slate-500">{title}</span>
        </nav>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Tools</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-navy">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {children}
          <div className="space-y-6 lg:sticky lg:top-20">
            <ToolsSidebar current={current} />
            {aside}
          </div>
        </div>
      </div>
    </main>
  );
}
