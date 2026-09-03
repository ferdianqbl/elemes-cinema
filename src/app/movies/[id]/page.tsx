"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Globe } from "lucide-react";
import {
  useMovieDetail,
  useMovieCredits,
  useMovieVideos,
  useSimilarMovies,
} from "@/features/movies/hooks/use-movies";
import { getBackdropUrl, getPosterUrl, getProfileUrl, getYouTubeEmbedUrl } from "@/lib/tmdb";
import { formatDate, formatRuntime, formatCurrency, cn } from "@/lib/utils";
import { calculateBoxOfficeRoi } from "@/lib/analytics";
import { RatingBadge } from "@/components/ui/rating-badge";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";
import { MovieCard } from "@/features/movies/components/movie-card";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/components/layout/section-header";

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const resolvedParams = use(params);
  const movieId = resolvedParams.id;

  const { data: movie, isLoading: isMovieLoading } = useMovieDetail(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);
  const { data: similar } = useSimilarMovies(movieId);

  if (isMovieLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="aspect-[21/9] w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-8 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-light text-white">Movie not found</h2>
        <Link href="/movies" className="mt-4 inline-block text-cyan-400 text-sm hover:underline">
          Return to Movies Catalog
        </Link>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, "original");
  const posterUrl = getPosterUrl(movie.poster_path, "w500");
  const roi = calculateBoxOfficeRoi(movie.budget, movie.revenue);
  const trailer = videos?.results?.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );
  const topCast = credits?.cast?.slice(0, 10) || [];

  return (
    <div className="space-y-10">
      {/* Back Link */}
      <Link
        href="/movies"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Movies</span>
      </Link>

      {/* Main Details Section */}
      <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#07090E] p-4 sm:p-6 md:p-10">
        <AmbientGlow intensity="medium" color="cyan" className="-top-12 -bottom-12" />

        {/* Ambient Backdrop Blurred */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover blur-2xl"
            unoptimized={backdropUrl.startsWith("/placeholder")}
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Poster Column */}
          <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden border border-white/10 bg-black mx-auto max-w-[240px] sm:max-w-sm">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              unoptimized={posterUrl.startsWith("/placeholder")}
            />
          </div>

          {/* Details Column */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <RatingBadge rating={movie.vote_average} count={movie.vote_count} />
                <span className="text-xs text-slate-400 tabular-nums">
                  {formatDate(movie.release_date)}
                </span>
                {movie.runtime && (
                  <span className="flex items-center gap-1 text-xs text-slate-300 bg-[#0E121B] border border-white/10 px-2 py-0.5 rounded-[4px] tabular-nums">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </span>
                )}
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-[4px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  {movie.status}
                </span>
                {roi.status !== "unavailable" && (
                  <span
                    className={cn(
                      "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[4px] border",
                      roi.badgeColor
                    )}
                  >
                    {roi.label}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-sm italic text-slate-400 font-serif">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-[4px] bg-[#0E121B] border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="space-y-1.5 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Overview
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {movie.overview || "No overview available for this movie."}
                </p>
              </div>

              {/* Commercial Box Office Performance Bar */}
              {movie.budget > 0 && movie.revenue > 0 && (
                <div className="p-3.5 rounded-lg bg-[#0E121B] border border-white/10 space-y-2.5">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-xs">
                    <span className="font-semibold text-slate-300">
                      Box Office Commercial Performance
                    </span>
                    <span
                      className={cn(
                        "text-xs font-bold tabular-nums",
                        roi.status === "deficit" ? "text-rose-400" : "text-emerald-400"
                      )}
                    >
                      {roi.profit >= 0
                        ? `+${formatCurrency(roi.profit)} Net Profit`
                        : `-${formatCurrency(Math.abs(roi.profit))} Deficit`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-[4px] bg-black/60 border border-white/5">
                      <span className="text-[10px] text-slate-500 uppercase block">Budget</span>
                      <span className="font-semibold text-slate-200 tabular-nums">
                        {formatCurrency(movie.budget)}
                      </span>
                    </div>
                    <div className="p-2 rounded-[4px] bg-black/60 border border-white/5">
                      <span className="text-[10px] text-slate-500 uppercase block">Worldwide Gross</span>
                      <span className="font-semibold text-slate-200 tabular-nums">
                        {formatCurrency(movie.revenue)}
                      </span>
                    </div>
                    <div className="p-2 rounded-[4px] bg-black/60 border border-white/5">
                      <span className="text-[10px] text-slate-500 uppercase block">Return Multiple</span>
                      <span className="font-semibold text-cyan-400 tabular-nums">
                        {roi.multiplier}x ROI
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Metadata Table */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                {movie.spoken_languages?.length > 0 && (
                  <div>
                    <span className="text-slate-500 block">Original Language</span>
                    <span className="font-semibold text-slate-200">
                      {movie.spoken_languages[0].english_name}
                    </span>
                  </div>
                )}
                {movie.production_companies?.length > 0 && (
                  <div>
                    <span className="text-slate-500 block">Production Studio</span>
                    <span className="font-semibold text-slate-200 line-clamp-1">
                      {movie.production_companies[0].name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
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

              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-transparent px-4 py-2.5 text-xs font-semibold text-white hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>Official Site</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Video Player */}
      {trailer && (
        <section className="space-y-4">
          <SectionHeader
            title="Official Trailer"
            subtitle={`${movie.title} trailer preview`}
          />
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black max-w-4xl mx-auto">
            <iframe
              src={getYouTubeEmbedUrl(trailer.key)}
              title={trailer.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </section>
      )}

      {/* Top Billed Cast */}
      {topCast.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title="Top Cast"
            subtitle="Actors and characters in this movie"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {topCast.map((actor) => {
              const profileUrl = getProfileUrl(actor.profile_path, "h632");
              return (
                <Link
                  key={actor.id}
                  href={`/people/${actor.id}`}
                  className="flex flex-col rounded-lg overflow-hidden bg-[#07090E] border border-white/10 p-2.5 space-y-2 hover:border-cyan-400/60 transition-all duration-300 group"
                >
                  <div className="relative aspect-[3/4] w-full rounded-[4px] overflow-hidden bg-black">
                    <Image
                      src={profileUrl}
                      alt={actor.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      unoptimized={profileUrl.startsWith("/placeholder")}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-cyan-400 line-clamp-1 transition-colors">
                      {actor.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {actor.character}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Similar Movies */}
      {similar?.results && similar.results.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title="Similar Movies"
            subtitle="More titles you might also enjoy"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {similar.results.slice(0, 5).map((simMovie) => (
              <MovieCard key={simMovie.id} movie={simMovie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
