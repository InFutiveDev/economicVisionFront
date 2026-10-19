import { fetchForexRates } from "@/lib/forex";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchForexRates();
    return Response.json(data);
  } catch {
    return Response.json({ rates: null, live: 0, updatedAt: null }, { status: 502 });
  }
}
