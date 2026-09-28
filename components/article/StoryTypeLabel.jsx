const styles = {
  News: "border-navy text-navy",
  Opinion: "border-brand-red bg-[#fdecee] text-brand-red",
  Analysis: "border-slate-400 text-slate-600",
};

export default function StoryTypeLabel({ type = "News", className = "" }) {
  const label = type || "News";
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${styles[label] ?? styles.News} ${className}`}
    >
      {label}
    </span>
  );
}
