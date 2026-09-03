"use client";

import React, { useState, useMemo } from "react";
import { useMoviesByCategory } from "@/features/movies/hooks/use-movies";
import { MovieCategory, TMovie } from "@/features/movies/types/movie.types";
import { MovieGrid } from "@/features/movies/components/movie-grid";
import { MOVIE_CATEGORIES } from "@/lib/constants";
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const GENRE_FILTERS = [
  { id: "all", label: "All Genres" },
  { id: 28, label: "Action" },
  { id: 878, label: "Sci-Fi" },
  { id: 18, label: "Drama" },
  { id: 53, label: "Thriller" },
  { id: 35, label: "Comedy" },
  { id: 16, label: "Animation" },
];

type SortOption = "default" | "rating" | "newest" | "title";

export default function MoviesPage() {
  const [activeCategory, setActiveCategory] = useState<MovieCategory>("popular");
  const [selectedGenre, setSelectedGenre] = useState<string | number>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isPlaceholderData } = useMoviesByCategory(activeCategory, {
    page,
  });

  const handleCategoryChange = (val: MovieCategory) => {
    setActiveCategory(val);
    setPage(1);
    setSelectedGenre("all");
    setSortBy("default");
  };

  const rawMovies = data?.results || [];

  // Filter & Sort client-side for ultra-responsive feedback
  const processedMovies = useMemo(() => {
    let result = [...rawMovies];

    // Filter by Genre
    if (selectedGenre !== "all") {
      result = result.filter(
        (m) => Array.isArray(m.genre_ids) && m.genre_ids.includes(Number(selectedGenre))
      );
    }

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === "newest") {
      result.sort((a, b) => {
        const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
        const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [rawMovies, selectedGenre, sortBy]);

  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <div className="space-y-6">
      {/* Category Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            Movies Catalog
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
            Explore curated movie collections across multiple categories
          </p>
        </div>

        {/* Tab Filters (Pill Switcher) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-[#07090E] border border-white/10 w-fit">
          {MOVIE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id as MovieCategory)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-400 text-neutral-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Sorting & Genre Filter Secondary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 rounded-lg bg-[#07090E] border border-white/10">
        {/* Genre Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500 shrink-0 ml-1 mr-0.5" />
          {GENRE_FILTERS.map((genre) => {
            const isSelected = selectedGenre === genre.id;
            return (
              <button
                key={genre.id}
                type="button"
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-cyan-950/80 text-cyan-400 border border-cyan-500/40"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {genre.label}
              </button>
            );
          })}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-8 rounded-lg bg-[#0E121B] px-2.5 text-xs text-slate-200 border border-white/10 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="rating">Sort: Highest Rated</option>
            <option value="newest">Sort: Release Date</option>
            <option value="title">Sort: Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Movie Grid */}
      <MovieGrid
        movies={processedMovies as TMovie[]}
        isLoading={isLoading}
        count={20}
      />

      {/* Pagination Controls */}
      {data && data.total_pages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Previous</span>
          </Button>

          <span className="text-xs text-slate-400 px-2 font-medium tabular-nums">
            Page <strong className="text-white">{page}</strong> of{" "}
            <strong className="text-slate-300">{totalPages}</strong>
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (!isPlaceholderData && page < totalPages) {
                setPage((old) => old + 1);
              }
            }}
            disabled={page >= totalPages || isPlaceholderData || isLoading}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
