import LiveNews from "./LiveNews";
import TrendingTopics from "./TrendingTopics";
import AdBanner from "./AdBanner";
import EditorsPick from "./EditorsPick";
import MarketCalendar from "./MarketCalendar";

export default function HomeSidebar() {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-16 lg:self-start">
      <LiveNews />
      <TrendingTopics />
      <EditorsPick />
      <MarketCalendar />
      <AdBanner />
    </aside>
  );
}
