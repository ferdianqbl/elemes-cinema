"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TMovie } from "../types/movie.types";
import { getBackdropUrl } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import { RatingBadge } from "@/components/ui/rating-badge";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieHeroProps {
  movie?: TMovie;
  movies?: TMovie[];
  isLoading?: boolean;
}

export function MovieHero({ movie, movies, isLoading }: MovieHeroProps) {
  const items = movies && movies.length > 0 ? movies : movie ? [movie] : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = items.length;

  const nextSlide = useCallback(() => {
    if (total > 1) {
      setCurrentIndex((prev) => (prev + 1) % total);
    }
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total > 1) {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    }
  }, [total]);

  // Auto-advance every 7 seconds when not hovered
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [total, isPaused, nextSlide]);

  if (isLoading || items.length === 0) {
    return (
      <div className="relative aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/8] md:aspect-[21/9] min-h-[380px] sm:min-h-0 w-full animate-pulse rounded-lg bg-[#07090E] overflow-hidden border border-white/10" />
    );
  }

  const activeMovie = items[currentIndex];
  const backdropUrl = getBackdropUrl(activeMovie.backdrop_path, "original");

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="group relative aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/8] md:aspect-[21/9] min-h-[380px] sm:min-h-0 w-full rounded-lg overflow-hidden border border-white/10 bg-black select-none"
    >
      {/* Backdrop Image with AnimatePresence cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMovie.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={backdropUrl}
            alt={activeMovie.title}
            fill
            sizes="100vw"
            priority={currentIndex === 0}
            loading={currentIndex === 0 ? "eager" : "lazy"}
            className="object-cover object-top opacity-55"
            unoptimized={backdropUrl.startsWith("/placeholder")}
          />
        </motion.div>
      </AnimatePresence>

      {/* Deep Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none" />

      {/* Navigation Chevrons (Desktop Hover) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous featured movie"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-cyan-400 hover:bg-black/90 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer hidden sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next featured movie"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-cyan-400 hover:bg-black/90 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer hidden sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-6 sm:p-8 md:p-10 flex flex-col justify-end max-w-3xl space-y-2.5 sm:space-y-3 z-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <RatingBadge rating={activeMovie.vote_average} count={activeMovie.vote_count} />
          <span className="text-xs text-slate-300 font-medium tabular-nums">
            {formatYear(activeMovie.release_date)}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-[4px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
            Featured Premiere {total > 1 ? `${currentIndex + 1}/${total}` : ""}
          </span>
        </div>

        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
          {activeMovie.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 md:line-clamp-3 max-w-2xl leading-relaxed">
          {activeMovie.overview}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <Link href={`/movies/${activeMovie.id}`}>
            <Button variant="default" size="default" className="gap-2 text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4">
              <Play className="h-4 w-4 fill-current" />
              <span>Watch Details</span>
            </Button>
          </Link>

          <WatchlistButton
            variant="full"
            item={{
              id: activeMovie.id,
              title: activeMovie.title,
              poster_path: activeMovie.poster_path,
              backdrop_path: activeMovie.backdrop_path,
              vote_average: activeMovie.vote_average,
              release_date: activeMovie.release_date,
              media_type: "movie",
              overview: activeMovie.overview,
            }}
          />

          <Link href={`/movies/${activeMovie.id}`}>
            <Button variant="outline" size="default" className="gap-2 text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4">
              <Info className="h-4 w-4" />
              <span>More Info</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Pagination Dot Indicators (Bottom Right) */}
      {total > 1 && (
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          {items.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                idx === currentIndex
                  ? "w-6 bg-cyan-400 shadow-sm shadow-cyan-400/50"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
