import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TTvShow } from "../types/tv.types";
import { getPosterUrl } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import { RatingBadge } from "@/components/ui/rating-badge";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";

interface TvCardProps {
  tv: TTvShow;
  priority?: boolean;
}

export function TvCard({ tv, priority = false }: TvCardProps) {
  const posterUrl = getPosterUrl(tv.poster_path, "w500");

  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5">
      {/* Poster Image Container */}
      <Link
        href={`/tv/${tv.id}`}
        className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-950"
      >
        <Image
          src={posterUrl}
          alt={tv.name || "TV Show poster"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          unoptimized={posterUrl.startsWith("/placeholder")}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          <RatingBadge rating={tv.vote_average} />
          <WatchlistButton
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
      </Link>

      {/* Info Container */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <Link
            href={`/tv/${tv.id}`}
            className="block text-sm font-semibold text-neutral-100 hover:text-emerald-400 line-clamp-1 transition-colors"
            title={tv.name}
          >
            {tv.name}
          </Link>
          <div className="mt-1 flex items-center justify-between text-xs text-neutral-400">
            <span>{formatYear(tv.first_air_date)}</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 bg-neutral-800/80 px-1.5 py-0.5 rounded">
              TV Show
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
