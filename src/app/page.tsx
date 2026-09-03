"use client";

import { SectionHeader } from "@/components/layout/section-header";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieGrid } from "@/features/movies/components/movie-grid";
import { MovieHero } from "@/features/movies/components/movie-hero";
import {
  useNowPlayingMovies,
  usePopularMovies,
} from "@/features/movies/hooks/use-movies";
import { PersonCard } from "@/features/people/components/person-card";
import { usePopularPeople } from "@/features/people/hooks/use-people";
import { TvWidescreenCard } from "@/features/tv/components/tv-widescreen-card";
import { usePopularTv } from "@/features/tv/hooks/use-tv";

export default function HomePage() {
  const { data: popularMoviesData, isLoading: isPopularMoviesLoading } =
    usePopularMovies({ page: 1 });
  const { data: nowPlayingData, isLoading: isNowPlayingLoading } =
    useNowPlayingMovies({ page: 1 });
  const { data: popularTvData, isLoading: isPopularTvLoading } = usePopularTv({
    page: 1,
  });
  const { data: popularPeopleData, isLoading: isPopularPeopleLoading } =
    usePopularPeople({ page: 1 });

  const featuredMovie =
    nowPlayingData?.results?.[0] || popularMoviesData?.results?.[0];
  const popularMovies = (popularMoviesData?.results || []).slice(0, 10);
  const widescreenTvShows = (popularTvData?.results || []).slice(0, 6);
  const popularPeople = (popularPeopleData?.results || []).slice(0, 6);

  return (
    <div className="space-y-16 overflow-x-hidden">
      {/* 1. Hero Banner Section with Ambient Glow */}
      <section aria-label="Featured Movie" className="relative">
        <AmbientGlow
          intensity="medium"
          color="cyan"
          className="-top-20 -bottom-20"
        />
        <MovieHero
          movie={featuredMovie}
          isLoading={isNowPlayingLoading && isPopularMoviesLoading}
        />
      </section>

      {/* 2. Popular Movies Catalog Shelf */}
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

      {/* 3. Top Rated TV Shows Section */}
      <section aria-label="Top Rated TV Shows">
        <SectionHeader
          title="Top Rated TV Series"
          subtitle="Highest critically acclaimed television shows"
          actionHref="/tv"
          actionLabel="View all TV shows"
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

      {/* 4. Trending Stars & Creators */}
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
