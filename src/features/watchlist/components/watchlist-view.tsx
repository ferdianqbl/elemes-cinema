"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Film, Tv, ArrowRight, Bookmark } from "lucide-react";
import { useWatchlistStore } from "@/store/use-watchlist-store";
import { getPosterUrl } from "@/lib/tmdb";
import { RatingBadge } from "@/components/ui/rating-badge";
import { formatYear } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function WatchlistView() {
  const { items, removeItem, clearWatchlist } = useWatchlistStore();
  const [filter, setFilter] = useState<"all" | "movie" | "tv">("all");

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.media_type === filter;
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
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#07090E] border border-white/10">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === "movie"
                ? "bg-cyan-400 text-neutral-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Movies ({items.filter((i) => i.media_type === "movie").length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("tv")}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === "tv"
                ? "bg-cyan-400 text-neutral-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            TV Shows ({items.filter((i) => i.media_type === "tv").length})
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

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredItems.map((item) => {
          const detailHref =
            item.media_type === "movie"
              ? `/movies/${item.id}`
              : `/tv/${item.id}`;
          const posterUrl = getPosterUrl(item.poster_path, "w500");

          return (
            <div
              key={`${item.media_type}-${item.id}`}
              className="group relative flex flex-col rounded-lg overflow-hidden bg-[#07090E] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60"
            >
              <Link
                href={detailHref}
                className="relative aspect-[2/3] w-full overflow-hidden bg-black"
              >
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

              <div className="p-3">
                <Link
                  href={detailHref}
                  className="block text-sm font-semibold text-white hover:text-cyan-400 line-clamp-1"
                >
                  {item.title}
                </Link>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                  <span className="tabular-nums font-medium">{formatYear(item.release_date)}</span>
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-[#0E121B] border border-white/5 px-1.5 py-0.5 rounded-[4px]">
                    {item.media_type === "movie" ? (
                      <Film className="h-3 w-3" />
                    ) : (
                      <Tv className="h-3 w-3" />
                    )}
                    <span>{item.media_type}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
