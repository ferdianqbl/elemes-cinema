"use client";

import React, { useState } from "react";
import { useTvByCategory } from "@/features/tv/hooks/use-tv";
import { TvCategory } from "@/features/tv/types/tv.types";
import { TvGrid } from "@/features/tv/components/tv-grid";
import { TV_CATEGORIES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TvPage() {
  const [activeCategory, setActiveCategory] = useState<TvCategory>("popular");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isPlaceholderData } = useTvByCategory(activeCategory, {
    page,
  });

  const handleCategoryChange = (val: TvCategory) => {
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
            TV Shows Catalog
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
            Browse official TMDB television series, live broadcasts, and top rated seasons
          </p>
        </div>

        {/* Tab Filters (Pill Switcher) */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 p-1 rounded-lg sm:rounded-full bg-[#07090E] border border-white/10 w-fit">
          {TV_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id as TvCategory)}
                className={`px-3 sm:px-3.5 py-1 rounded-md sm:rounded-full text-xs font-semibold transition-all cursor-pointer ${
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

      {/* TV Grid */}
      <TvGrid shows={data?.results} isLoading={isLoading} count={20} />

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
