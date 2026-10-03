import HowRetirementWorks from "@/components/tools/HowRetirementWorks";
import RetirementCalculator from "@/components/tools/RetirementCalculator";
import ToolsPageShell from "@/components/tools/ToolsPageShell";

export const metadata = {
  title: "Retirement Calculator | EconomicVision",
  description: "Estimate the corpus and monthly SIP needed to sustain today’s lifestyle through retirement.",
};

export default function RetirementCalculatorPage() {
  return (
    <ToolsPageShell
      title="Retirement Calculator"
      description="Work backwards from today’s expenses to the corpus and monthly SIP that can fund retirement."
      current="/tools/retirement-calculator"
      aside={<HowRetirementWorks />}
    >
      <RetirementCalculator />
    </ToolsPageShell>
  );
}
