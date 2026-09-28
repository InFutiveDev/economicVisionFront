"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function PaperViewer({
  page,
  pages,
  pageNumber,
  totalPages,
  onPrev,
  onNext,
  onSelect,
  downloadHref,
}) {
  const [zoom, setZoom] = useState(100);
  const frameRef = useRef(null);

  function zoomOut() {
    setZoom((value) => Math.max(50, value - 10));
  }

  function zoomIn() {
    setZoom((value) => Math.min(200, value + 10));
  }

  async function sharePage() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: page.title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
  }

  function printPage() {
    const popup = window.open(page.image, "_blank");
    if (!popup) return;
    popup.addEventListener("load", () => popup.print());
  }

  async function toggleFullScreen() {
    const node = frameRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await node.requestFullscreen();
  }

  return (
    <div
      ref={frameRef}
      className="overflow-hidden rounded-2xl border border-slate-300 bg-slate-200 shadow-lg"
    >
      <div className="flex items-center justify-between gap-3 bg-slate-100 px-4 py-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={pageNumber === 1}
          className="flex items-center gap-1 text-sm font-medium text-slate-600 disabled:opacity-40"
        >
          ‹ Previous
        </button>

        <label className="relative">
          <select
            value={pageNumber}
            onChange={(event) => onSelect(Number(event.target.value) - 1)}
            className="h-9 appearance-none rounded-full border border-slate-300 bg-white px-5 pr-8 text-sm font-medium text-slate-700 outline-none"
          >
            {pages.map((_, index) => (
              <option key={index} value={index + 1}>
                Page {index + 1} of {totalPages}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
            ▼
          </span>
        </label>

        <button
          type="button"
          onClick={onNext}
          disabled={pageNumber === totalPages}
          className="flex items-center gap-1 text-sm font-medium text-slate-600 disabled:opacity-40"
        >
          Next ›
        </button>
      </div>

      <div className="bg-slate-300 px-4 py-4 sm:px-8 sm:py-6">
        <div className="mx-auto max-h-[75vh] overflow-auto bg-white shadow-md">
          <div
            className="origin-top transition-transform"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <Image
              src={page.image}
              alt={page.title}
              width={1200}
              height={1700}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-[#3d4450] px-4 py-3 text-sm text-white">
        <div className="flex items-center gap-2">
          <ToolbarButton label="Zoom out" onClick={zoomOut}>
            −
          </ToolbarButton>
          <span className="min-w-12 text-center text-xs">{zoom}%</span>
          <ToolbarButton label="Zoom in" onClick={zoomIn}>
            +
          </ToolbarButton>
        </div>

        <span className="hidden h-4 w-px bg-white/30 sm:block" />

        <a href={downloadHref} download className="inline-flex items-center gap-1.5 hover:text-white/80">
          <DownloadIcon />
          Download
        </a>
        <button type="button" onClick={printPage} className="inline-flex items-center gap-1.5 hover:text-white/80">
          <PrintIcon />
          Print
        </button>
        <button type="button" onClick={sharePage} className="inline-flex items-center gap-1.5 hover:text-white/80">
          <ShareIcon />
          Share
        </button>

        <span className="hidden h-4 w-px bg-white/30 sm:block" />

        <button type="button" onClick={toggleFullScreen} className="inline-flex items-center gap-1.5 hover:text-white/80">
          <FullScreenIcon />
          Full Screen
        </button>
      </div>
    </div>
  );
}

function ToolbarButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 text-base leading-none hover:bg-white/10"
    >
      {children}
    </button>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4v12M7 12l5 5 5-5M5 20h14" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 8V4h10v4M7 17H5a2 2 0 01-2-2v-5h18v5a2 2 0 01-2 2h-2" />
      <rect x="7" y="13" width="10" height="7" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}

function FullScreenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" />
    </svg>
  );
}
