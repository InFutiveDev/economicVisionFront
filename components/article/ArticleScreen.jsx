"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";
import ArticleView from "./ArticleView";
import { getArticle } from "@/lib/articles";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchArticle, selectArticle } from "@/lib/redux/slices/articleSlice";

export default function ArticleScreen({ slug }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectArticle);
  const matches = state.slug === slug;

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch, slug]);

  if (matches && state.status === "failed") notFound();

  const article = matches && state.article ? state.article : getArticle(slug);
  if (!article) {
    return <p className="py-16 text-center text-[14px] text-slate-500">Loading story…</p>;
  }

  return (
    <ArticleView
      article={article}
      relatedStories={matches && state.related.length ? state.related : undefined}
      moreStories={matches && state.more.length ? state.more : undefined}
    />
  );
}
