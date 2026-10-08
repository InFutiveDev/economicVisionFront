"use client";

import { useId, useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { subscribeEmail } from "@/lib/redux/slices/subscribeSlice";
import { validateEmail } from "@/lib/validateEmail";

const variants = {
  footer: {
    form: "mt-4 flex items-center gap-2",
    field: "flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3",
    input: "min-w-0 flex-1 bg-transparent text-[13px] text-navy outline-none placeholder:text-slate-400",
    button: "h-10 shrink-0 rounded-full bg-brand-red px-4 text-[13px] font-semibold text-white hover:bg-red-700 disabled:opacity-60",
    placeholder: "Enter your email address",
    icon: true,
    success: "text-emerald-300",
    error: "text-red-300",
  },
  brief: {
    form: "mt-4 flex max-w-md gap-2",
    field: "flex min-w-0 flex-1",
    input: "h-10 min-w-0 flex-1 border border-slate-200 px-3 text-sm outline-none focus:border-navy",
    button: "h-10 bg-brand-red px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700 disabled:opacity-60",
    placeholder: "Enter your email address",
    success: "text-emerald-700",
    error: "text-red-600",
  },
  card: {
    form: "mt-4 flex gap-2",
    field: "flex min-w-0 flex-1",
    input: "h-10 min-w-0 flex-1 border border-slate-200 px-3 text-[12px] outline-none focus:border-navy",
    button: "h-10 shrink-0 bg-brand-red px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white hover:bg-red-700 disabled:opacity-60",
    placeholder: "Enter your email",
    success: "text-emerald-700",
    error: "text-red-600",
  },
  dialog: {
    form: "mt-5 flex flex-col gap-2 sm:flex-row",
    field: "flex min-w-0 flex-1",
    input: "h-11 min-w-0 flex-1 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-navy",
    button: "h-11 shrink-0 rounded-md bg-brand-red px-5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60",
    placeholder: "Enter your email address",
    success: "text-emerald-700",
    error: "text-red-600",
  },
};

export default function SubscribeForm({ variant = "brief", source = variant, autoFocus = false, onSubscribed }) {
  const styles = variants[variant] || variants.brief;
  const dispatch = useAppDispatch();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const problem = validateEmail(email);
    if (problem) {
      setStatus("error");
      setMessage(problem);
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const result = await dispatch(
        subscribeEmail({ email: email.trim().toLowerCase(), source, website })
      ).unwrap();
      setStatus("success");
      setMessage(result?.message || "Thanks for subscribing!");
      setEmail("");
      onSubscribed?.();
    } catch (error) {
      setStatus("error");
      setMessage(typeof error === "string" ? error : "Could not subscribe right now. Please try again.");
    }
  }

  const invalid = status === "error";

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.field}>
          <span className="sr-only">Email address</span>
          {styles.icon ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          ) : null}
          <input
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            autoFocus={autoFocus}
            maxLength={254}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "submitting") {
                setStatus("idle");
                setMessage("");
              }
            }}
            placeholder={styles.placeholder}
            aria-invalid={invalid || undefined}
            aria-describedby={message ? messageId : undefined}
            className={styles.input}
          />
        </label>
        <input
          type="text"
          name="website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button type="submit" disabled={status === "submitting"} className={styles.button}>
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {message ? (
        <p
          id={messageId}
          role={invalid ? "alert" : "status"}
          className={`mt-2 text-[12px] ${invalid ? styles.error : styles.success}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
