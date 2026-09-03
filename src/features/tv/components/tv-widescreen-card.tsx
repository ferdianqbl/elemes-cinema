import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TTvShow } from "../types/tv.types";
import { getBackdropUrl } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import { RatingBadge } from "@/components/ui/rating-badge";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";

interface TvWidescreenCardProps {
  tv: TTvShow;
}

export function TvWidescreenCard({ tv }: TvWidescreenCardProps) {
  const backdropUrl = getBackdropUrl(tv.backdrop_path, "w780");

  return (
    <div className="group relative flex flex-col rounded-lg overflow-hidden border border-white/10 bg-[#07090E] transition-all duration-300 hover:border-cyan-400/60 hover:-translate-y-1">
      {/* 16:9 Widescreen Backdrop */}
      <Link href={`/tv/${tv.id}`} className="relative aspect-video w-full overflow-hidden bg-black block">
        <Image
          src={backdropUrl}
          alt={tv.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized={backdropUrl.startsWith("/placeholder")}
        />

        {/* Rating and TV Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
          <RatingBadge rating={tv.vote_average} showStar={false} />
          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-[4px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
            TV Series
          </span>
        </div>

        {/* Quick Watchlist Button */}
        <div
          className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <WatchlistButton
            variant="icon"
            item={{
              id: tv.id,
              title: tv.name,
              poster_path: tv.poster_path,
              backdrop_path: tv.backdrop_path,
              vote_average: tv.vote_average,
              release_date: tv.first_air_date,
              media_type: "tv",
              overview: tv.overview,
            }}
          />
        </div>

        {/* Bottom Ambient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent opacity-80" />
      </Link>

      {/* Info Body */}
      <div className="p-3.5 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <Link href={`/tv/${tv.id}`}>
            <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
              {tv.name}
            </h3>
          </Link>
          <span className="text-xs text-slate-400 tabular-nums shrink-0">
            {formatYear(tv.first_air_date)}
          </span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {tv.overview || "Stream this hit television series with complete broadcast season coverage."}
        </p>
      </div>
    </div>
  );
}
