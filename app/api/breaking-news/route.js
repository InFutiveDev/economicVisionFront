import { getBreakingNews } from "@/lib/breakingNews";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getBreakingNews();
    return Response.json(data);
  } catch {
    return Response.json({ enabled: false, items: [] }, { status: 500 });
  }
}
