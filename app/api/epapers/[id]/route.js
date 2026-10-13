import { getEpaper } from "@/lib/epaper";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
      return Response.json(
        { message: "E-paper ID or slug is required" },
        { status: 400 }
      );
    }

    const epaper = await getEpaper(id);

    if (!epaper) {
      return Response.json(
        { message: "E-Paper edition not found." },
        { status: 404 }
      );
    }

    return Response.json(
      { epaper },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error(`API error in /api/epapers/${params?.id}:`, error);
    return Response.json(
      { message: "Failed to fetch e-paper", error: error.message },
      { status: 500 }
    );
  }
}
