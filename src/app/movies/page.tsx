"use client";

import React, { useState } from "react";
import { useMoviesByCategory } from "@/features/movies/hooks/use-movies";
import { MovieCategory } from "@/features/movies/types/movie.types";
import { MovieGrid } from "@/features/movies/components/movie-grid";
import { SectionHeader } from "@/components/layout/section-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOVIE_CATEGORIES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MoviesPage() {
  const [activeCategory, setActiveCategory] = useState<MovieCategory>("popular");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isPlaceholderData } = useMoviesByCategory(activeCategory, {
    page,
  });

  const handleCategoryChange = (val: string) => {
    setActiveCategory(val as MovieCategory);
    setPage(1);
  };

  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <div className="space-y-8">
      {/* Category Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Movies Catalog
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-400">
            Explore curated movie collections across multiple categories
          </p>
        </div>

        {/* Tab Filters */}
        <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
          <TabsList className="flex-wrap bg-neutral-900 border border-neutral-800 p-1">
            {MOVIE_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-neutral-950 font-medium"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Movie Grid */}
      <MovieGrid
        movies={data?.results}
        isLoading={isLoading}
        count={20}
      />

      {/* Pagination Controls */}
      {data && data.total_pages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-neutral-800">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Previous</span>
          </Button>

          <span className="text-xs text-neutral-400 px-2 font-medium">
            Page <strong className="text-white">{page}</strong> of{" "}
            <strong className="text-neutral-300">{totalPages}</strong>
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
