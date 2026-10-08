"use client";

import { useEffect } from "react";
import HeroSection from "./HeroSection";
import LatestNews from "./LatestNews";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchHome, selectHome } from "@/lib/redux/slices/homeSlice";

export default function HomeFeed() {
  const dispatch = useAppDispatch();
  const home = useAppSelector(selectHome);

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  return (
    <>
      <HeroSection
        slides={home.hero.length ? home.hero : undefined}
        topStories={home.topStories.length ? home.topStories : undefined}
      />
      <LatestNews
        featured={home.latest.featured || undefined}
        updates={home.latest.updates?.length ? home.latest.updates : undefined}
      />
    </>
  );
}
