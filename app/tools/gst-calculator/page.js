import GstCalculator from "@/components/tools/GstCalculator";
import HowGstWorks from "@/components/tools/HowGstWorks";
import ToolsPageShell from "@/components/tools/ToolsPageShell";

export const metadata = {
  title: "GST Calculator | EconomicVision",
  description: "Add or remove GST at 5%, 12%, 18% or 28%, and split the tax into CGST, SGST or IGST.",
};

export default function GstCalculatorPage() {
  return (
    <ToolsPageShell
      title="GST Calculator"
      description="Work out GST on a price, whether the tax is extra or already included, for intra-state or inter-state supply."
      current="/tools/gst-calculator"
      aside={<HowGstWorks />}
    >
      <GstCalculator />
    </ToolsPageShell>
  );
}
