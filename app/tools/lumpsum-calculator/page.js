import HowLumpsumWorks from "@/components/tools/HowLumpsumWorks";
import LumpsumCalculator from "@/components/tools/LumpsumCalculator";
import ToolsPageShell from "@/components/tools/ToolsPageShell";

export const metadata = {
  title: "Lumpsum Calculator | EconomicVision",
  description: "Estimate the future value of a one-time mutual fund or other lumpsum investment.",
};

export default function LumpsumCalculatorPage() {
  return (
    <ToolsPageShell
      title="Lumpsum Calculator"
      description="See how a one-time investment can grow at an expected annual return, year by year."
      current="/tools/lumpsum-calculator"
      aside={<HowLumpsumWorks />}
    >
      <LumpsumCalculator />
    </ToolsPageShell>
  );
}
