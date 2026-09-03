"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Film,
  Tv,
  ArrowRight,
  Bookmark,
  Star,
  CheckCircle2,
  Circle,
  LayoutGrid,
  List,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useWatchlistStore } from "@/store/use-watchlist-store";
import { calculateWatchlistStats } from "@/lib/analytics";
import { getPosterUrl } from "@/lib/tmdb";
import { RatingBadge } from "@/components/ui/rating-badge";
import { formatYear } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function WatchlistView() {
  const { items, removeItem, clearWatchlist, toggleWatchedStatus } = useWatchlistStore();
  const [filter, setFilter] = useState<"all" | "movie" | "tv">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "want_to_watch" | "watched">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const stats = calculateWatchlistStats(items);

  const filteredItems = items.filter((item) => {
    const matchesMedia = filter === "all" || item.media_type === filter;
    const currentStatus = item.status || "want_to_watch";
    const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;
    return matchesMedia && matchesStatus;
  });

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-[#07090E]/50 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#0E121B] border border-white/10 text-slate-400 mb-4">
          <Bookmark className="h-7 w-7 text-cyan-400" />
        </div>
        <h3 className="text-xl font-light text-white">Your Watchlist is empty</h3>
        <p className="mt-1 max-w-sm text-xs text-slate-400 font-normal">
          Save movies and TV shows you want to watch later by clicking the bookmark icon on any media card.
        </p>
        <Link href="/movies" className="mt-6">
          <Button variant="default" size="sm">
            <span>Explore Movies</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cinephile Analytics Dashboard Bar (100% derived from TMDB item data & user status) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg bg-[#07090E] border border-white/10">
        {/* Total Items Saved */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[4px] bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">
              Total Saved
            </p>
            <p className="text-xs sm:text-base font-semibold text-white tabular-nums">
              {stats.totalCount} Titles
            </p>
          </div>
        </div>

        {/* Community Avg Rating */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[4px] bg-amber-950/70 border border-amber-500/30 text-amber-400 shrink-0">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">
              Average Score
            </p>
            <p className="text-xs sm:text-base font-semibold text-white tabular-nums">
              {stats.averageRating > 0 ? `${stats.averageRating} / 10` : "N/A"}
            </p>
          </div>
        </div>

        {/* Top Score Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[4px] bg-sky-950/70 border border-sky-500/30 text-sky-400 shrink-0">
            <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">
              Highest Rating
            </p>
            <p className="text-xs sm:text-base font-semibold text-white tabular-nums">
              {stats.highestRating > 0 ? `${stats.highestRating} / 10` : "N/A"}
            </p>
          </div>
        </div>

        {/* Watched Progress */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[4px] bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 shrink-0">
            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">
              Watch Progress
            </p>
            <p className="text-xs sm:text-base font-semibold text-white tabular-nums truncate">
              {stats.watchedCount}/{stats.totalCount} ({stats.completionRate}%)
            </p>
          </div>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        {/* Media Type Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg sm:rounded-full bg-[#07090E] border border-white/10">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md sm:rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-cyan-400 text-neutral-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("movie")}
              className={`px-3 py-1 rounded-md sm:rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === "movie"
                  ? "bg-cyan-400 text-neutral-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Movies ({stats.movieCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("tv")}
              className={`px-3 py-1 rounded-md sm:rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === "tv"
                  ? "bg-cyan-400 text-neutral-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              TV ({stats.tvCount})
            </button>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg sm:rounded-full bg-[#07090E] border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-2.5 py-1 rounded-md sm:rounded-full transition-colors cursor-pointer ${
                statusFilter === "all" ? "bg-white/10 text-white font-semibold" : "text-slate-400"
              }`}
            >
              Status: All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("want_to_watch")}
              className={`px-2.5 py-1 rounded-md sm:rounded-full transition-colors cursor-pointer ${
                statusFilter === "want_to_watch" ? "bg-white/10 text-cyan-400 font-semibold" : "text-slate-400"
              }`}
            >
              To Watch
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("watched")}
              className={`px-2.5 py-1 rounded-md sm:rounded-full transition-colors cursor-pointer ${
                statusFilter === "watched" ? "bg-white/10 text-emerald-400 font-semibold" : "text-slate-400"
              }`}
            >
              Watched
            </button>
          </div>
        </div>

        {/* Right Actions: View Switcher & Clear */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg border border-white/10 bg-[#07090E] p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex h-7 w-7 items-center justify-center rounded-[4px] transition-colors cursor-pointer ${
                viewMode === "grid" ? "bg-cyan-950 text-cyan-400 border border-cyan-500/30" : "text-slate-400"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex h-7 w-7 items-center justify-center rounded-[4px] transition-colors cursor-pointer ${
                viewMode === "list" ? "bg-cyan-950 text-cyan-400 border border-cyan-500/30" : "text-slate-400"
              }`}
              aria-label="List view"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={clearWatchlist}
            className="text-xs"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            <span>Clear All</span>
          </Button>
        </div>
      </div>

      {/* Grid or List Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => {
            const detailHref = item.media_type === "movie" ? `/movies/${item.id}` : `/tv/${item.id}`;
            const posterUrl = getPosterUrl(item.poster_path, "w500");
            const isWatched = item.status === "watched";

            return (
              <div
                key={`${item.media_type}-${item.id}`}
                className="group relative flex flex-col rounded-lg overflow-hidden bg-[#07090E] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <Link href={detailHref} className="relative aspect-[2/3] w-full overflow-hidden bg-black">
                  <Image
                    src={posterUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                    unoptimized={posterUrl.startsWith("/placeholder")}
                  />
                  <div className="absolute top-2 left-2 z-10">
                    <RatingBadge rating={item.vote_average} />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeItem(item.id, item.media_type);
                    }}
                    className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-rose-950/80 text-rose-400 border border-rose-500/30 hover:bg-rose-900/90 hover:text-white backdrop-blur-md transition-all cursor-pointer"
                    aria-label="Remove from watchlist"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </Link>

                <div className="p-3 space-y-2">
                  <div>
                    <Link
                      href={detailHref}
                      className="block text-sm font-semibold text-white hover:text-cyan-400 line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                      <span className="tabular-nums font-medium">{formatYear(item.release_date)}</span>
                      <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-[#0E121B] border border-white/5 px-1.5 py-0.5 rounded-[4px]">
                        {item.media_type === "movie" ? <Film className="h-3 w-3" /> : <Tv className="h-3 w-3" />}
                        <span>{item.media_type}</span>
                      </span>
                    </div>
                  </div>

                  {/* Toggle Watched Status */}
                  <button
                    type="button"
                    onClick={() => toggleWatchedStatus(item.id, item.media_type)}
                    className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-[4px] text-[11px] font-semibold border transition-colors cursor-pointer ${
                      isWatched
                        ? "bg-emerald-950/70 text-emerald-400 border-emerald-500/30 hover:bg-emerald-900/60"
                        : "bg-[#0E121B] text-slate-400 border-white/10 hover:text-cyan-400 hover:border-cyan-500/30"
                    }`}
                  >
                    {isWatched ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Watched</span>
                      </>
                    ) : (
                      <>
                        <Circle className="h-3.5 w-3.5" />
                        <span>Mark as Watched</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Filmstrip List View */
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const detailHref = item.media_type === "movie" ? `/movies/${item.id}` : `/tv/${item.id}`;
            const posterUrl = getPosterUrl(item.poster_path, "w185");
            const isWatched = item.status === "watched";

            return (
              <div
                key={`list-${item.media_type}-${item.id}`}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#07090E] border border-white/10 hover:border-cyan-400/40 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <Link href={detailHref} className="relative h-16 w-12 rounded-[4px] overflow-hidden bg-black shrink-0">
                    <Image
                      src={posterUrl}
                      alt={item.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                      unoptimized={posterUrl.startsWith("/placeholder")}
                    />
                  </Link>

                  <div className="min-w-0">
                    <Link
                      href={detailHref}
                      className="text-sm font-semibold text-white hover:text-cyan-400 truncate block"
                    >
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                      <span className="capitalize font-medium text-cyan-400">{item.media_type}</span>
                      <span>• {formatYear(item.release_date)}</span>
                      {item.overview && (
                        <span className="hidden sm:inline truncate max-w-md text-slate-500">
                          • {item.overview}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <RatingBadge rating={item.vote_average} showStar={false} />

                  <button
                    type="button"
                    onClick={() => toggleWatchedStatus(item.id, item.media_type)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-semibold border transition-colors cursor-pointer ${
                      isWatched
                        ? "bg-emerald-950/70 text-emerald-400 border-emerald-500/30"
                        : "bg-[#0E121B] text-slate-400 border-white/10 hover:text-cyan-400"
                    }`}
                  >
                    {isWatched ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                    <span className="hidden sm:inline">{isWatched ? "Watched" : "Mark Watched"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id, item.media_type)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
