import MarketTicker from "@/components/home/MarketTicker";
import BreakingNewsStrip from "@/components/home/BreakingNewsStrip";
import HeroSection from "@/components/home/HeroSection";
import LatestNews from "@/components/home/LatestNews";
import MarketsInFocus from "@/components/home/MarketsInFocus";
import ExclusiveSection from "@/components/home/ExclusiveSection";
import WhyItMatters from "@/components/home/WhyItMatters";
import EconomyBusiness from "@/components/home/EconomyBusiness";
import Videos from "@/components/home/Videos";
import MostReadOpinion from "@/components/home/MostReadOpinion";
import PodcastsStories from "@/components/home/PodcastsStories";
import HomeSidebar from "@/components/home/HomeSidebar";
import { getBreakingNews } from "@/lib/breakingNews";

export default async function HomePage() {
  const breakingNews = await getBreakingNews();

  return (
    <main>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-3">
        <BreakingNewsStrip initialData={breakingNews} />
        <div className="mt-2">
          <MarketTicker />
        </div>

        <div className="mt-4 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0 space-y-8">
            <HeroSection />
            <LatestNews />
            <MarketsInFocus />
            <ExclusiveSection />
          </div>
          <HomeSidebar />
        </div>

        <div className="mt-8">
          <WhyItMatters />
        </div>

        <div className="mt-8">
          <EconomyBusiness />
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
          <Videos compact />
         
          <PodcastsStories showPodcasts={false} compact />
        </div>
         
        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
          <PodcastsStories showStories={false} compact />
          <MostReadOpinion showMostRead={false} />
        </div>

        
      </div>
    </main>
  );
}
