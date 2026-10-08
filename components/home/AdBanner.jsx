import Image from "next/image";
import SubscribeButton from "@/components/subscribe/SubscribeButton";

export default function AdBanner() {
  return (
    <aside className="relative overflow-hidden bg-navy text-white rounded-lg">
      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
        alt=""
        fill
        className="object-cover opacity-40"
        sizes="280px"
      />
      <div className="relative px-4 py-8">
        <p className="text-[12px] leading-relaxed text-white/90">Insights today, a stronger tomorrow.</p>
        <p className="mt-2 text-[15px] font-bold">The Economic Vision</p>
        <SubscribeButton className="mt-4 inline-block bg-brand-red px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">
          Subscribe Now
        </SubscribeButton>
      </div>
    </aside>
  );
}
