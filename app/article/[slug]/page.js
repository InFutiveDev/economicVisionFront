import { notFound } from "next/navigation";
import ArticleView from "@/components/article/ArticleView";
import { getArticle, getArticleSlugs } from "@/lib/articles";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article | EconomicVision" };
  return {
    title: `${article.title} | EconomicVision`,
    description: article.dek,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <ArticleView article={article} />
      </div>
    </main>
  );
}
