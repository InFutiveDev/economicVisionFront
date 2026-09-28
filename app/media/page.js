import Videos from "@/components/home/Videos";
import PodcastsStories from "@/components/home/PodcastsStories";
import MostReadOpinion from "@/components/home/MostReadOpinion";
import MorningBrief from "@/components/home/MorningBrief";

export const metadata = {
  title: "Media | The Economic Vision",
  description: "Videos, podcasts, stories and opinion from The Economic Vision.",
};

export default function MediaPage() {
  return (
    <main>
      <div className="mx-auto max-w-8xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">
        <Videos />
        <PodcastsStories />
        <MostReadOpinion />
        <MorningBrief />
      </div>
    </main>
  );
}
