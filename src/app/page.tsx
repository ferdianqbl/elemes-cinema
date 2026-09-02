"use client";

import React from "react";
import {
  usePopularMovies,
  useNowPlayingMovies,
} from "@/features/movies/hooks/use-movies";
import { useTopRatedTv } from "@/features/tv/hooks/use-tv";
import { usePopularPeople } from "@/features/people/hooks/use-people";
import { MovieHero } from "@/features/movies/components/movie-hero";
import { MovieGrid } from "@/features/movies/components/movie-grid";
import { TvGrid } from "@/features/tv/components/tv-grid";
import { PersonCard } from "@/features/people/components/person-card";
import { SectionHeader } from "@/components/layout/section-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { data: popularMoviesData, isLoading: isPopularMoviesLoading } =
    usePopularMovies({ page: 1 });
  const { data: nowPlayingData, isLoading: isNowPlayingLoading } =
    useNowPlayingMovies({ page: 1 });
  const { data: topRatedTvData, isLoading: isTopRatedTvLoading } =
    useTopRatedTv({ page: 1 });
  const { data: popularPeopleData, isLoading: isPopularPeopleLoading } =
    usePopularPeople({ page: 1 });

  const featuredMovie = nowPlayingData?.results?.[0] || popularMoviesData?.results?.[0];
  const popularMovies = popularMoviesData?.results?.slice(0, 10) || [];
  const topRatedTvShows = topRatedTvData?.results?.slice(0, 10) || [];
  const popularPeople = popularPeopleData?.results?.slice(0, 6) || [];

  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section aria-label="Featured Movie">
        <MovieHero
          movie={featuredMovie}
          isLoading={isNowPlayingLoading && isPopularMoviesLoading}
        />
      </section>

      {/* Popular Movies Section */}
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

      {/* Top Rated TV Shows Section */}
      <section aria-label="Top Rated TV Shows">
        <SectionHeader
          title="Top Rated TV Series"
          subtitle="Highest critically acclaimed television shows"
          actionHref="/tv"
          actionLabel="View all TV shows"
        />
        <TvGrid
          shows={topRatedTvShows}
          isLoading={isTopRatedTvLoading}
          count={10}
        />
      </section>

      {/* Popular Celebrities & People */}
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
