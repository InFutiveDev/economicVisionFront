import ForexCalculator from "@/components/tools/ForexCalculator";
import HowForexWorks from "@/components/tools/HowForexWorks";
import ToolsPageShell from "@/components/tools/ToolsPageShell";

export const metadata = {
  title: "Forex Calculator | EconomicVision",
  description: "Convert between INR and major world currencies with live mid-market exchange rates.",
};

export default function ForexCalculatorPage() {
  return (
    <ToolsPageShell
      title="Forex Calculator"
      description="Convert rupees and foreign currencies using live mid-market rates. Useful for travel, remittances and import-export planning."
      current="/tools/forex-calculator"
      aside={<HowForexWorks />}
    >
      <ForexCalculator />
    </ToolsPageShell>
  );
}
