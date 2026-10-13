import PaperGrid from "@/components/epaper/PaperGrid";
import { getEpapers } from "@/lib/epaper";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "E-Paper | EconomicVision",
  description: "Read EconomicVision digital newspaper editions.",
};

export default async function EPaperPage() {
  const editions = await getEpapers();

  return (
    <main className="bg-slate-100">
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-8">
        <PaperGrid editions={editions} />
      </div>
    </main>
  );
}
