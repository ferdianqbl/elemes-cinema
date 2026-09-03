"use client";

import React, { useState, useMemo } from "react";
import { useTvByCategory } from "@/features/tv/hooks/use-tv";
import { TvCategory, TTvShow } from "@/features/tv/types/tv.types";
import { TvGrid } from "@/features/tv/components/tv-grid";
import { TV_CATEGORIES } from "@/lib/constants";
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const TV_GENRE_FILTERS = [
  { id: "all", label: "All Genres" },
  { id: 10759, label: "Action & Adventure" },
  { id: 18, label: "Drama" },
  { id: 10765, label: "Sci-Fi & Fantasy" },
  { id: 35, label: "Comedy" },
  { id: 16, label: "Animation" },
  { id: 80, label: "Crime" },
];

type TvSortOption = "default" | "rating" | "newest" | "title";

export default function TvPage() {
  const [activeCategory, setActiveCategory] = useState<TvCategory>("popular");
  const [selectedGenre, setSelectedGenre] = useState<string | number>("all");
  const [sortBy, setSortBy] = useState<TvSortOption>("default");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isPlaceholderData } = useTvByCategory(activeCategory, {
    page,
  });

  const handleCategoryChange = (val: TvCategory) => {
    setActiveCategory(val);
    setPage(1);
    setSelectedGenre("all");
    setSortBy("default");
  };

  const rawShows = data?.results || [];

  // Filter & Sort client-side
  const processedShows = useMemo(() => {
    let result = [...rawShows];

    // Filter by Genre
    if (selectedGenre !== "all") {
      result = result.filter(
        (s) => Array.isArray(s.genre_ids) && s.genre_ids.includes(Number(selectedGenre))
      );
    }

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === "newest") {
      result.sort((a, b) => {
        const dateA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
        const dateB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "title") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [rawShows, selectedGenre, sortBy]);

  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <div className="space-y-6">
      {/* Category Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            TV Shows Catalog
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
            Browse trending television series, live broadcasts, and top rated seasons
          </p>
        </div>

        {/* Tab Filters (Pill Switcher) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-[#07090E] border border-white/10 w-fit">
          {TV_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id as TvCategory)}
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
          {TV_GENRE_FILTERS.map((genre) => {
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
            onChange={(e) => setSortBy(e.target.value as TvSortOption)}
            className="h-8 rounded-lg bg-[#0E121B] px-2.5 text-xs text-slate-200 border border-white/10 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="rating">Sort: Highest Rated</option>
            <option value="newest">Sort: Release Date</option>
            <option value="title">Sort: Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* TV Grid */}
      <TvGrid shows={processedShows as TTvShow[]} isLoading={isLoading} count={20} />

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
