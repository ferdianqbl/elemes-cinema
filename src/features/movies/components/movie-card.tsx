import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TMovie } from "../types/movie.types";
import { getPosterUrl } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import { RatingBadge } from "@/components/ui/rating-badge";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";

interface MovieCardProps {
  movie: TMovie;
  priority?: boolean;
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path, "w500");

  return (
    <div className="group relative flex flex-col rounded-lg overflow-hidden bg-[#07090E] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60">
      {/* Poster Image Container */}
      <Link
        href={`/movies/${movie.id}`}
        className="relative aspect-[2/3] w-full overflow-hidden bg-black"
      >
        <Image
          src={posterUrl}
          alt={movie.title || "Movie poster"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-103"
          priority={priority}
          unoptimized={posterUrl.startsWith("/placeholder")}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          <RatingBadge rating={movie.vote_average} />
          <WatchlistButton
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
      </Link>

      {/* Info Container */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <Link
            href={`/movies/${movie.id}`}
            className="block text-sm font-semibold text-white hover:text-cyan-400 line-clamp-1 transition-colors"
            title={movie.title}
          >
            {movie.title}
          </Link>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span className="tabular-nums font-medium">{formatYear(movie.release_date)}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-[#0E121B] border border-white/5 px-1.5 py-0.5 rounded-[4px]">
              Movie
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
