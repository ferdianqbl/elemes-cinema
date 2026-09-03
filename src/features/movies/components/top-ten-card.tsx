import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TMovie } from "../types/movie.types";
import { getPosterUrl } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import { RatingBadge } from "@/components/ui/rating-badge";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";

interface TopTenCardProps {
  movie: TMovie;
  rank: number;
}

export function TopTenCard({ movie, rank }: TopTenCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path, "w500");
  const formattedRank = rank < 10 ? `0${rank}` : `${rank}`;

  return (
    <div className="group relative flex items-end shrink-0 select-none">
      {/* Giant Stylized Rank Number */}
      <div className="font-marquee-number text-7xl sm:text-8xl lg:text-9xl font-black -mr-4 sm:-mr-6 z-10 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105 group-hover:-translate-x-1">
        {formattedRank}
      </div>

      {/* Poster Card */}
      <Link
        href={`/movies/${movie.id}`}
        className="relative block w-36 sm:w-44 lg:w-48 aspect-[2/3] rounded-lg overflow-hidden border border-white/10 bg-[#07090E] transition-all duration-300 group-hover:border-cyan-400/60 group-hover:-translate-y-1 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]"
      >
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 144px, 192px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized={posterUrl.startsWith("/placeholder")}
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 z-20">
          <RatingBadge rating={movie.vote_average} showStar={false} />
        </div>

        {/* Quick Watchlist Button on Hover */}
        <div
          className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <WatchlistButton
            variant="icon"
            item={{
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              backdrop_path: movie.backdrop_path,
              vote_average: movie.vote_average,
              release_date: movie.release_date,
              media_type: "movie",
              overview: movie.overview,
            }}
          />
        </div>

        {/* Bottom Ambient Info Gradient */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-2.5 pt-8 opacity-90 group-hover:opacity-100 transition-opacity">
          <p className="text-xs font-semibold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {movie.title}
          </p>
          <p className="text-[10px] text-slate-400 tabular-nums">
            {formatYear(movie.release_date)}
          </p>
        </div>
      </Link>
    </div>
  );
}
