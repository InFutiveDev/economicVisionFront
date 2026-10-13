import { getEpapers } from "@/lib/epaper";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") || undefined;
    const todayParam = searchParams.get("today");
    const today = todayParam !== null ? todayParam === "true" : undefined;
    const q = searchParams.get("q") || undefined;
    const status = searchParams.get("status") || undefined;

    const epapers = await getEpapers({ city, today, q, status });

    return Response.json(
      { epapers },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("API error in /api/epapers:", error);
    return Response.json(
      { message: "Failed to fetch e-papers", error: error.message },
      { status: 500 }
    );
  }
}
