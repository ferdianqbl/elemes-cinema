"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useTvByCategory } from "@/features/tv/hooks/use-tv";
import { TvCategory } from "@/features/tv/types/tv.types";
import { TvGrid } from "@/features/tv/components/tv-grid";
import { TV_CATEGORIES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function TvContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");

  const activeCategory: TvCategory =
    categoryQuery && TV_CATEGORIES.some((c) => c.id === categoryQuery)
      ? (categoryQuery as TvCategory)
      : "popular";

  const [page, setPage] = useState<number>(1);

  // When query param changes externally, reset page to 1
  useEffect(() => {
    setPage(1);
  }, [categoryQuery]);

  const { data, isLoading, isPlaceholderData } = useTvByCategory(activeCategory, {
    page,
  });

  const handleCategoryChange = (val: TvCategory) => {
    setPage(1);
    router.push(`/tv?category=${val}`, { scroll: false });
  };

  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <div className="space-y-8">
      {/* Category Header with Animated Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            TV Shows Catalog
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
            Browse official TMDB television series, live broadcasts, and top rated seasons
          </p>
        </div>

        {/* Tab Filters (Animated Pill Switcher - Horizontal Scroll on Mobile) */}
        <div className="relative flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-[#07090E] border border-white/10 w-full sm:w-fit overflow-x-auto no-scrollbar scroll-smooth flex-nowrap shrink-0">
          {TV_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id as TvCategory)}
                className={cn(
                  "relative px-3 sm:px-3.5 py-1.5 sm:py-1 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer select-none shrink-0 whitespace-nowrap active:scale-95",
                  isActive
                    ? "text-neutral-950 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTvTabIndicator"
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

      {/* Smooth Animated TV Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${page}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <TvGrid shows={data?.results} isLoading={isLoading} count={20} />
        </motion.div>
      </AnimatePresence>

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

function TvPageSkeleton() {
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

export default function TvPage() {
  return (
    <Suspense fallback={<TvPageSkeleton />}>
      <TvContent />
    </Suspense>
  );
}
