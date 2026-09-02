"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Film, Tv, User, Loader2 } from "lucide-react";
import { useMultiSearch } from "@/features/search/hooks/use-search";
import { MovieCard } from "@/features/movies/components/movie-card";
import { TvCard } from "@/features/tv/components/tv-card";
import { PersonCard } from "@/features/people/components/person-card";
import { Input } from "@/components/ui/input";
import { TMovie } from "@/features/movies/types/movie.types";
import { TTvShow } from "@/features/tv/types/tv.types";
import { TPerson } from "@/features/people/types/people.types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | "movie" | "tv" | "person">("all");

  useEffect(() => {
    setSearchInput(initialQuery);
  }, [initialQuery]);

  const { data, isLoading } = useMultiSearch({
    query: searchInput,
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const results = data?.results || [];

  const movies = results.filter((item) => item.media_type === "movie") as (TMovie & {
    media_type: "movie";
  })[];
  const tvShows = results.filter((item) => item.media_type === "tv") as (TTvShow & {
    media_type: "tv";
  })[];
  const people = results.filter((item) => item.media_type === "person") as (TPerson & {
    media_type: "person";
  })[];

  const displayedResults =
    activeTab === "all"
      ? results
      : activeTab === "movie"
      ? movies
      : activeTab === "tv"
      ? tvShows
      : people;

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Search Catalog
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-neutral-400">
          Find movies, TV series, actors, and directors from TMDB database
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
        <Input
          type="text"
          placeholder="Type movie, TV series, or actor name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="h-12 rounded-2xl bg-neutral-900/90 pl-11 pr-4 text-base border-neutral-700/80 focus-visible:ring-emerald-500"
        />
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
      </form>

      {/* Filter Tabs */}
      {searchInput.trim().length >= 2 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "all"
                ? "bg-emerald-500 text-neutral-950 font-semibold"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            All Results ({results.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("movie")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "movie"
                ? "bg-emerald-500 text-neutral-950 font-semibold"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            Movies ({movies.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tv")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "tv"
                ? "bg-emerald-500 text-neutral-950 font-semibold"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            TV Series ({tvShows.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("person")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "person"
                ? "bg-emerald-500 text-neutral-950 font-semibold"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            People ({people.length})
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && searchInput.trim().length >= 2 && displayedResults.length === 0 && (
        <div className="py-20 text-center space-y-2">
          <p className="text-base font-semibold text-white">
            No results found for &ldquo;{searchInput}&rdquo;
          </p>
          <p className="text-xs text-neutral-400">
            Try checking for spelling errors or searching for a different keyword.
          </p>
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && displayedResults.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayedResults.map((item) => {
            if (item.media_type === "movie") {
              return <MovieCard key={`movie-${item.id}`} movie={item as TMovie} />;
            }
            if (item.media_type === "tv") {
              return <TvCard key={`tv-${item.id}`} tv={item as TTvShow} />;
            }
            if (item.media_type === "person") {
              return <PersonCard key={`person-${item.id}`} person={item as TPerson} />;
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
