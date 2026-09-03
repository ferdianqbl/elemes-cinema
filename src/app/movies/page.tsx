"use client";

import React, { useState } from "react";
import { useMoviesByCategory } from "@/features/movies/hooks/use-movies";
import { MovieCategory } from "@/features/movies/types/movie.types";
import { MovieGrid } from "@/features/movies/components/movie-grid";
import { MOVIE_CATEGORIES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MoviesPage() {
  const [activeCategory, setActiveCategory] = useState<MovieCategory>("popular");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isPlaceholderData } = useMoviesByCategory(activeCategory, {
    page,
  });

  const handleCategoryChange = (val: MovieCategory) => {
    setActiveCategory(val);
    setPage(1);
  };

  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <div className="space-y-8">
      {/* Category Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            Movies Catalog
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
            Explore curated movie collections across official TMDB categories
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

      {/* Movie Grid */}
      <MovieGrid
        movies={data?.results}
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
