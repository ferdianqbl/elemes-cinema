"use client";

import React from "react";
import { Bookmark, Check } from "lucide-react";
import { toast } from "sonner";
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

    const wasInWatchlist = isInWatchlist;
    toggleItem(item);

    const title = item.title || "Title";

    if (!wasInWatchlist) {
      toast.success(`Added "${title}" to Watchlist`, {
        description: "Saved to your persistent watchlist.",
        action: {
          label: "Undo",
          onClick: () => {
            toggleItem(item);
          },
        },
        duration: 4000,
      });
    } else {
      toast.info(`Removed "${title}" from Watchlist`, {
        action: {
          label: "Undo",
          onClick: () => {
            toggleItem(item);
          },
        },
        duration: 4000,
      });
    }
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer select-none active:scale-[0.98]",
          isInWatchlist
            ? "bg-cyan-400 text-neutral-950 font-bold hover:bg-cyan-300"
            : "bg-[#0E121B] text-slate-200 hover:bg-[#151B28] hover:text-white border border-white/10 hover:border-cyan-500/30",
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
          ? "bg-cyan-400 text-neutral-950 hover:bg-cyan-300"
          : "bg-black/70 text-white hover:bg-black/90 hover:text-cyan-400 border border-white/10",
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
