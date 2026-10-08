import MarketTicker from "@/components/home/MarketTicker";
import BreakingNewsStrip from "@/components/home/BreakingNewsStrip";
import MarketsInFocus from "@/components/home/MarketsInFocus";
import ExclusiveSection from "@/components/home/ExclusiveSection";
import WhyItMatters from "@/components/home/WhyItMatters";
import EconomyBusiness from "@/components/home/EconomyBusiness";
import Videos from "@/components/home/Videos";
import MostReadOpinion from "@/components/home/MostReadOpinion";
import PodcastsStories from "@/components/home/PodcastsStories";
import HomeSidebar from "@/components/home/HomeSidebar";
import HomeFeed from "@/components/home/HomeFeed";
import { getBreakingNews } from "@/lib/breakingNews";
import { getHomeFeed } from "@/lib/cms";
import { getMarketData } from "@/lib/liveMarket";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [breakingNews, home, market] = await Promise.all([
    getBreakingNews(),
    getHomeFeed(),
    getMarketData(),
  ]);

  return (
    <main>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-3">
        <BreakingNewsStrip initialData={breakingNews} />
        <div className="mt-2">
          <MarketTicker data={market} />
        </div>

        <div className="mt-4 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0 space-y-8">
            <HomeFeed />
            <MarketsInFocus data={market} />
            <ExclusiveSection items={home?.exclusive} />
          </div>
          <HomeSidebar />
        </div>

        <div className="mt-8">
          <WhyItMatters items={home?.whyItMatters} />
        </div>

        <div className="mt-8">
          <EconomyBusiness />
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
          <Videos items={home?.videos} compact />
          <PodcastsStories stories={home?.stories} showPodcasts={false} compact />
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
          <PodcastsStories podcasts={home?.podcasts} showStories={false} compact />
          <MostReadOpinion opinion={home?.opinion} showMostRead={false} />
        </div>

        
      </div>
    </main>
  );
}
