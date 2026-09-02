"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Info } from "lucide-react";
import { TMovie } from "../types/movie.types";
import { getBackdropUrl } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import { RatingBadge } from "@/components/ui/rating-badge";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";
import { Button } from "@/components/ui/button";

interface MovieHeroProps {
  movie?: TMovie;
  isLoading?: boolean;
}

export function MovieHero({ movie, isLoading }: MovieHeroProps) {
  if (isLoading || !movie) {
    return (
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full animate-pulse rounded-2xl bg-neutral-900 overflow-hidden" />
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, "original");

  return (
    <div className="relative aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
      {/* Backdrop Image */}
      <Image
        src={backdropUrl}
        alt={movie.title}
        fill
        sizes="100vw"
        priority
        className="object-cover object-top opacity-60"
        unoptimized={backdropUrl.startsWith("/placeholder")}
      />

      {/* Deep Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/40 to-transparent" />

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end max-w-3xl space-y-3">
        <div className="flex items-center gap-2.5">
          <RatingBadge rating={movie.vote_average} count={movie.vote_count} />
          <span className="text-xs text-neutral-300 font-medium">
            {formatYear(movie.release_date)}
          </span>
          <span className="text-xs uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
            Featured
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          {movie.title}
        </h1>

        <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 md:line-clamp-3 max-w-2xl leading-relaxed">
          {movie.overview}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href={`/movies/${movie.id}`}>
            <Button variant="default" size="default" className="gap-2 font-semibold">
              <Play className="h-4 w-4 fill-current" />
              <span>Watch Details</span>
            </Button>
          </Link>

          <WatchlistButton
            variant="full"
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

          <Link href={`/movies/${movie.id}`}>
            <Button variant="glass" size="default" className="gap-2">
              <Info className="h-4 w-4" />
              <span>More Info</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
