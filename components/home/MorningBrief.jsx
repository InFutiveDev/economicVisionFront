export default function MorningBrief() {
  return (
    <section className="grid grid-cols-1 items-center gap-4 border border-slate-200 bg-white p-5 sm:grid-cols-[1fr_auto]">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-navy">Morning Brief</p>
        <h2 className="mt-2 font-serif text-[18px] font-bold leading-snug text-navy">
          Get the 5 biggest economic stories every morning.
        </h2>
        <form className="mt-4 flex max-w-md gap-2">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="h-10 min-w-0 flex-1 border border-slate-200 px-3 text-sm outline-none focus:border-navy"
          />
          <button
            type="submit"
            className="h-10 bg-brand-red px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="hidden h-28 w-36 items-center justify-center bg-slate-100 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-navy sm:flex">
        Morning
        <br />
        Brief
      </div>
    </section>
  );
}
