import PaperGrid from "@/components/epaper/PaperGrid";

export const metadata = {
  title: "E-Paper | EconomicVision",
  description: "Read EconomicVision digital newspaper editions.",
};

export default function EPaperPage() {
  return (
    <main className="bg-slate-100">
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-8">
        <PaperGrid />
      </div>
    </main>
  );
}
