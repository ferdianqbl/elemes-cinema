"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  usePopularMovies,
  useNowPlayingMovies,
  useTopRatedMovies,
} from "@/features/movies/hooks/use-movies";
import { usePopularTv, useTopRatedTv } from "@/features/tv/hooks/use-tv";
import { usePopularPeople } from "@/features/people/hooks/use-people";
import { MovieHero } from "@/features/movies/components/movie-hero";
import { MovieGrid } from "@/features/movies/components/movie-grid";
import { TopTenCard } from "@/features/movies/components/top-ten-card";
import { TvWidescreenCard } from "@/features/tv/components/tv-widescreen-card";
import { PersonCard } from "@/features/people/components/person-card";
import { SectionHeader } from "@/components/layout/section-header";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const topTenScrollRef = useRef<HTMLDivElement>(null);

  const { data: popularMoviesData, isLoading: isPopularMoviesLoading } =
    usePopularMovies({ page: 1 });
  const { data: nowPlayingData, isLoading: isNowPlayingLoading } =
    useNowPlayingMovies({ page: 1 });
  const { data: topRatedMoviesData, isLoading: isTopRatedMoviesLoading } =
    useTopRatedMovies({ page: 1 });
  const { data: popularTvData, isLoading: isPopularTvLoading } =
    usePopularTv({ page: 1 });
  const { data: topRatedTvData } = useTopRatedTv({ page: 1 });
  const { data: popularPeopleData, isLoading: isPopularPeopleLoading } =
    usePopularPeople({ page: 1 });

  const featuredMovie = nowPlayingData?.results?.[0] || popularMoviesData?.results?.[0];
  const topTenMovies = (popularMoviesData?.results || []).slice(0, 10);
  const widescreenTvShows = (popularTvData?.results || []).slice(0, 6);
  const topRatedMovies = (topRatedMoviesData?.results || []).slice(0, 10);
  const popularPeople = popularPeopleData?.results?.slice(0, 6) || [];

  const scrollTopTen = (direction: "left" | "right") => {
    if (topTenScrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      topTenScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-16">
      {/* 1. Hero Banner Section with Ambient Glow */}
      <section aria-label="Featured Movie" className="relative">
        <AmbientGlow intensity="medium" color="cyan" className="-top-20 -bottom-20" />
        <MovieHero
          movie={featuredMovie}
          isLoading={isNowPlayingLoading && isPopularMoviesLoading}
        />
      </section>

      {/* 2. Top 10 Ranked Cinema (Editorial Big Numbers) */}
      <section aria-label="Top 10 Ranked Cinema" className="relative">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader
            title="Top 10 in Cinema Today"
            subtitle="The highest-trending films watched across the globe"
            actionHref="/movies"
            actionLabel="View All"
          />
          {/* Slider Chevrons */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => scrollTopTen("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#07090E] text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTopTen("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#07090E] text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isPopularMoviesLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="shrink-0 w-44 space-y-2">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={topTenScrollRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth pl-2"
          >
            {topTenMovies.map((movie, index) => (
              <TopTenCard key={movie.id} movie={movie} rank={index + 1} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Prime Time Television (16:9 Widescreen Landscape Cards) */}
      <section aria-label="Prime Time Television">
        <SectionHeader
          title="Prime Time TV Series"
          subtitle="Top streamed episodic drama, sci-fi, and animation"
          actionHref="/tv"
          actionLabel="Explore TV"
        />
        {isPopularTvLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {widescreenTvShows.map((tv) => (
              <TvWidescreenCard key={tv.id} tv={tv} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Critically Acclaimed Movies (Standard 2:3 Posters) */}
      <section aria-label="Critically Acclaimed Movies">
        <SectionHeader
          title="Critically Acclaimed Cinema"
          subtitle="Highest rated feature films rated by international audiences"
          actionHref="/movies"
          actionLabel="View All"
        />
        <MovieGrid
          movies={topRatedMovies}
          isLoading={isTopRatedMoviesLoading}
          count={10}
        />
      </section>

      {/* 5. Trending Stars & Creators */}
      <section aria-label="Trending Celebrities">
        <SectionHeader
          title="Trending Stars & Creators"
          subtitle="Most popular actors, directors, and artists"
          actionHref="/people"
          actionLabel="View all people"
        />
        {isPopularPeopleLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {popularPeople.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
