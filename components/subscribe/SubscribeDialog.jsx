"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SubscribeForm from "./SubscribeForm";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeSubscribe, selectSubscribeDialogOpen } from "@/lib/redux/slices/subscribeSlice";

export default function SubscribeDialog() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectSubscribeDialogOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event) {
      if (event.key === "Escape") dispatch(closeSubscribe());
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dispatch]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close subscribe form"
        className="absolute inset-0 bg-black/50"
        onClick={() => dispatch(closeSubscribe())}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-dialog-title"
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => dispatch(closeSubscribe())}
          className="absolute right-3 top-3 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-navy"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Newsletter</p>
        <h2 id="subscribe-dialog-title" className="mt-1 font-serif text-[22px] font-bold leading-snug text-navy">
          Subscribe to The Economic Vision
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
          Get the latest news, insights and market updates, straight to your inbox.
        </p>
        <SubscribeForm variant="dialog" source="header" autoFocus />
      </div>
    </div>,
    document.body
  );
}
