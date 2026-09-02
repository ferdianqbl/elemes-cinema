"use client";

import React from "react";
import { Bookmark, Check } from "lucide-react";
import { useWatchlistStore, WatchlistItem } from "@/store/use-watchlist-store";
import { cn } from "@/lib/utils";

interface WatchlistButtonProps {
  item: Omit<WatchlistItem, "addedAt">;
  variant?: "icon" | "full";
  className?: string;
}

export function WatchlistButton({
  item,
  variant = "icon",
  className,
}: WatchlistButtonProps) {
  const isInWatchlist = useWatchlistStore((state) =>
    state.isInWatchlist(item.id, item.media_type)
  );
  const toggleItem = useWatchlistStore((state) => state.toggleItem);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(item);
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer select-none",
          isInWatchlist
            ? "bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400"
            : "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 border border-neutral-700/60",
          className
        )}
      >
        {isInWatchlist ? (
          <>
            <Check className="h-4 w-4 stroke-[2.5]" />
            <span>In Watchlist</span>
          </>
        ) : (
          <>
            <Bookmark className="h-4 w-4" />
            <span>Add to Watchlist</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md",
        isInWatchlist
          ? "bg-emerald-500 text-neutral-950 hover:bg-emerald-400"
          : "bg-black/60 text-white hover:bg-black/80 hover:text-emerald-400 border border-white/10",
        className
      )}
    >
      {isInWatchlist ? (
        <Check className="h-4 w-4 stroke-[3]" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </button>
  );
}
