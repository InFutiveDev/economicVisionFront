import Videos from "@/components/home/Videos";
import PodcastsStories from "@/components/home/PodcastsStories";
import MostReadOpinion from "@/components/home/MostReadOpinion";
import MorningBrief from "@/components/home/MorningBrief";
import { getHomeFeed, getMedia } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Media | The Economic Vision",
  description: "Videos, podcasts, stories and opinion from The Economic Vision.",
};

export default async function MediaPage() {
  const [videos, podcasts, stories, home] = await Promise.all([
    getMedia("video"),
    getMedia("podcast"),
    getMedia("story"),
    getHomeFeed(),
  ]);

  return (
    <main>
      <div className="mx-auto max-w-8xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">
        <div id="videos" className="scroll-mt-24">
          <Videos items={videos} />
        </div>
        <PodcastsStories podcasts={podcasts} stories={stories} limit={12} />
        <MostReadOpinion opinion={home?.opinion} showMostRead={false} />
        <MorningBrief />
      </div>
    </main>
  );
}
