import HowInflationWorks from "@/components/tools/HowInflationWorks";
import InflationCalculator from "@/components/tools/InflationCalculator";
import ToolsPageShell from "@/components/tools/ToolsPageShell";

export const metadata = {
  title: "Inflation Calculator | EconomicVision",
  description: "See how inflation raises the future cost of today’s expenses and erodes purchasing power.",
};

export default function InflationCalculatorPage() {
  return (
    <ToolsPageShell
      title="Inflation Calculator"
      description="Estimate what a product or monthly expense will cost after years of inflation, and what today’s rupee will buy."
      current="/tools/inflation-calculator"
      aside={<HowInflationWorks />}
    >
      <InflationCalculator />
    </ToolsPageShell>
  );
}
