import ArticleScreen from "@/components/article/ArticleScreen";
import { getArticle } from "@/lib/articles";
import { getPublishedArticle } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const payload = await getPublishedArticle(slug);
  const article = payload?.article || getArticle(slug);
  if (!article) return { title: "Article | EconomicVision" };
  return {
    title: `${article.title} | EconomicVision`,
    description: article.dek || article.excerpt || "",
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <ArticleScreen slug={slug} />
      </div>
    </main>
  );
}
