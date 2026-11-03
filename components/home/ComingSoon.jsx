import Image from "next/image";

export default function ComingSoon({ label = "Coming Soon", className = "" }) {
  return (
    <div
      className={`flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-md bg-[#f7f9fc] px-4 py-8 text-center ${className}`}
    >
      <Image
        src="/image/logo.svg"
        alt="The Economic Vision"
        width={280}
        height={100}
        className="h-24 w-auto object-contain opacity-90 sm:h-28"
      />
      <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-navy sm:text-[14px]">{label}</p>
    </div>
  );
}
