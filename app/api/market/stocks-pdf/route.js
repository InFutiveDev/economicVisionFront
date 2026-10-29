import { getMarketData } from "@/lib/liveMarket";
import { buildStockTapePdf } from "@/lib/stockTapePdf";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { stockTape, marketMeta } = await getMarketData();
    const stamp = new Date();
    const ist = stamp.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const fileDate = stamp
      .toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric" })
      .replace(/ /g, "");
    const pdf = buildStockTapePdf(stockTape || [], {
      generatedAt: marketMeta?.updated ? `${marketMeta.updated.replace(/ IST$/i, "")}` : ist,
    });

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Nifty50-LiveStocks-${fileDate}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Unable to generate stock PDF", { status: 502 });
  }
}
