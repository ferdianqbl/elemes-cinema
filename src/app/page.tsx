"use client";

import React from "react";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function HomePage() {
  const { data: popularMoviesData, isLoading: isPopularMoviesLoading } =
    usePopularMovies({ page: 1 });
  const { data: nowPlayingData, isLoading: isNowPlayingLoading } =
    useNowPlayingMovies({ page: 1 });
  const { data: topRatedMoviesData, isLoading: isTopRatedMoviesLoading } =
    useTopRatedMovies({ page: 1 });
  const { data: popularTvData, isLoading: isPopularTvLoading } =
    usePopularTv({ page: 1 });
  const { data: topRatedTvData, isLoading: isTopRatedTvLoading } =
    useTopRatedTv({ page: 1 });
  const { data: popularPeopleData, isLoading: isPopularPeopleLoading } =
    usePopularPeople({ page: 1 });

  const featuredMovie = nowPlayingData?.results?.[0] || popularMoviesData?.results?.[0];
  const topTenMovies = (popularMoviesData?.results || []).slice(0, 10);
  const widescreenTvShows = (popularTvData?.results || []).slice(0, 6);
  const topRatedTvShows = (topRatedTvData?.results || []).slice(0, 10);
  const popularMovies = (popularMoviesData?.results || []).slice(0, 10);
  const popularPeople = (popularPeopleData?.results || []).slice(0, 6);

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

      {/* 2. Top 10 Ranked Cinema using Responsive Shadcn Carousel */}
      <section aria-label="Top 10 Popular Movies" className="relative w-full min-w-0">
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
            containScroll: "trimSnaps",
          }}
          className="w-full min-w-0"
        >
          <div className="flex items-center justify-between mb-4">
            <SectionHeader
              title="Top 10 in Cinema Today"
              subtitle="The highest-trending films watched across the globe"
              actionHref="/movies"
              actionLabel="Explore all"
            />
            {/* Carousel Previous & Next Controls (Responsive for mobile & desktop) */}
            <div className="flex items-center gap-1.5 shrink-0">
              <CarouselPrevious className="static translate-y-0 h-8 w-8" />
              <CarouselNext className="static translate-y-0 h-8 w-8" />
            </div>
          </div>

          {isPopularMoviesLoading ? (
            <div className="flex gap-3 sm:gap-4 overflow-hidden">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="shrink-0 w-36 sm:w-44 space-y-2">
                  <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <CarouselContent className="-ml-3 sm:-ml-4 pb-4 pt-2">
              {topTenMovies.map((movie, index) => (
                <CarouselItem
                  key={movie.id}
                  className="pl-3 sm:pl-4 basis-[64%] xs:basis-[50%] sm:basis-[36%] md:basis-[28%] lg:basis-[22%] xl:basis-[18.5%] min-w-0"
                >
                  <TopTenCard movie={movie} rank={index + 1} />
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
        </Carousel>
      </section>

      {/* 3. Popular Movies Catalog Shelf */}
      <section aria-label="Popular Movies">
        <SectionHeader
          title="Popular Movies"
          subtitle="The most watched movies in cinema right now"
          actionHref="/movies"
          actionLabel="View all movies"
        />
        <MovieGrid
          movies={popularMovies}
          isLoading={isPopularMoviesLoading}
          count={10}
        />
      </section>

      {/* 4. Top Rated TV Shows Section */}
      <section aria-label="Top Rated TV Shows">
        <SectionHeader
          title="Top Rated TV Series"
          subtitle="Highest critically acclaimed television shows"
          actionHref="/tv"
          actionLabel="View all TV shows"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {widescreenTvShows.map((tv) => (
            <TvWidescreenCard key={tv.id} tv={tv} />
          ))}
        </div>
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
