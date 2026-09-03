"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useMoviesByCategory, useMoviesByGenre } from "@/features/movies/hooks/use-movies";
import { MovieCategory } from "@/features/movies/types/movie.types";
import { MovieGrid } from "@/features/movies/components/movie-grid";
import { MOVIE_CATEGORIES } from "@/lib/constants";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const POPULAR_GENRES = [
  { id: 0, label: "All Genres" },
  { id: 28, label: "Action" },
  { id: 12, label: "Adventure" },
  { id: 16, label: "Animation" },
  { id: 35, label: "Comedy" },
  { id: 80, label: "Crime" },
  { id: 18, label: "Drama" },
  { id: 27, label: "Horror" },
  { id: 878, label: "Sci-Fi" },
  { id: 53, label: "Thriller" },
];

function MoviesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");

  const activeCategory: MovieCategory =
    categoryQuery && MOVIE_CATEGORIES.some((c) => c.id === categoryQuery)
      ? (categoryQuery as MovieCategory)
      : "popular";

  const [page, setPage] = useState<number>(1);
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);

  // When query param changes externally, reset page to 1 and genre to 0
  useEffect(() => {
    setPage(1);
    setSelectedGenreId(0);
  }, [categoryQuery]);

  const categoryQueryRes = useMoviesByCategory(activeCategory, { page });
  const genreQueryRes = useMoviesByGenre(selectedGenreId > 0 ? selectedGenreId : undefined, page);

  const isGenreActive = selectedGenreId > 0;
  const currentData = isGenreActive ? genreQueryRes.data : categoryQueryRes.data;
  const isLoading = isGenreActive ? genreQueryRes.isLoading : categoryQueryRes.isLoading;
  const isPlaceholderData = isGenreActive ? genreQueryRes.isPlaceholderData : categoryQueryRes.isPlaceholderData;

  const handleCategoryChange = (val: MovieCategory) => {
    setSelectedGenreId(0);
    setPage(1);
    router.push(`/movies?category=${val}`, { scroll: false });
  };

  const handleGenreChange = (genreId: number) => {
    setSelectedGenreId(genreId);
    setPage(1);
  };

  const totalPages = Math.min(currentData?.total_pages || 1, 500);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Category Header with Animated Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            Movies Catalog
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
            Explore curated movie collections across official TMDB categories
          </p>
        </div>

        {/* Tab Filters (Animated Pill Switcher - Horizontal Scroll on Mobile) */}
        <div className="relative flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-[#07090E] border border-white/10 w-full sm:w-fit overflow-x-auto no-scrollbar scroll-smooth flex-nowrap shrink-0">
          {MOVIE_CATEGORIES.map((cat) => {
            const isActive = !isGenreActive && activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id as MovieCategory)}
                className={cn(
                  "relative px-3 sm:px-3.5 py-1.5 sm:py-1 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer select-none shrink-0 whitespace-nowrap active:scale-95",
                  isActive
                    ? "text-neutral-950 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeMovieTabIndicator"
                    className="absolute inset-0 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/30"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Genre Filter Chips (Horizontal Touch Shelf) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 -mt-2">
        <div className="flex items-center gap-1 text-slate-500 text-xs shrink-0 mr-1">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-semibold">Genre:</span>
        </div>
        {POPULAR_GENRES.map((genre) => {
          const isSelected = selectedGenreId === genre.id;
          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => handleGenreChange(genre.id)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer active:scale-95",
                isSelected
                  ? "bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 font-semibold shadow-sm shadow-cyan-500/10"
                  : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
              )}
            >
              {genre.label}
            </button>
          );
        })}
      </div>

      {/* Smooth Animated Movie Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${selectedGenreId}-${page}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <MovieGrid
            movies={currentData?.results}
            isLoading={isLoading}
            count={20}
          />
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      {currentData && currentData.total_pages > 1 && (
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

function MoviesPageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-64 rounded-full" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<MoviesPageSkeleton />}>
      <MoviesContent />
    </Suspense>
  );
}
