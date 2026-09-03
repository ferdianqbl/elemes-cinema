"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Globe, Play } from "lucide-react";
import {
  useMovieDetail,
  useMovieCredits,
  useMovieVideos,
  useSimilarMovies,
} from "@/features/movies/hooks/use-movies";
import { MovieCard } from "@/features/movies/components/movie-card";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";
import { SectionHeader } from "@/components/layout/section-header";
import { RatingBadge } from "@/components/ui/rating-badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getBackdropUrl,
  getPosterUrl,
  getProfileUrl,
  getYouTubeEmbedUrl,
} from "@/lib/tmdb";
import { formatCurrency, formatDate, formatRuntime } from "@/lib/utils";

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
        <Skeleton className="aspect-[21/9] w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Skeleton className="aspect-[2/3] w-full rounded-xl" />
          <div className="md:col-span-3 space-y-4">
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
        <Link
          href="/movies"
          className="mt-4 inline-block text-cyan-400 text-sm hover:underline"
        >
          Return to Movies Catalog
        </Link>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, "original");
  const posterUrl = getPosterUrl(movie.poster_path, "w500");
  const trailer = videos?.results?.find(
    (v) =>
      v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
  );
  const topCast = credits?.cast?.slice(0, 10) || [];

  return (
    <div className="space-y-12">
      {/* Top Breadcrumb Navigation */}
      <Link
        href="/movies"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Movies</span>
      </Link>

      {/* Cinematic Hero Container */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#07090E] shadow-2xl">
        {/* Backdrop Banner with Rich Gradients */}
        <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover object-top opacity-40"
            unoptimized={backdropUrl.startsWith("/placeholder")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090E] via-transparent to-[#07090E]/80" />
        </div>

        {/* Content Overlapping the Backdrop */}
        <div className="px-5 sm:px-8 md:px-10 pb-8 sm:pb-10 -mt-24 sm:-mt-32 md:-mt-40 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
            {/* Floating Movie Poster */}
            <div className="relative w-40 sm:w-52 md:w-60 aspect-[2/3] shrink-0 rounded-xl overflow-hidden border-2 border-white/15 bg-neutral-900 shadow-2xl shadow-black">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 240px"
                className="object-cover"
                unoptimized={posterUrl.startsWith("/placeholder")}
              />
            </div>

            {/* Title & Core Metadata */}
            <div className="flex-1 space-y-3.5 text-center md:text-left">
              {/* Rating, Date, Runtime, Status */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <RatingBadge
                  rating={movie.vote_average}
                  count={movie.vote_count}
                />
                <span className="text-xs text-slate-300 font-medium tabular-nums">
                  {formatDate(movie.release_date)}
                </span>
                {movie.runtime && (
                  <span className="flex items-center gap-1 text-xs text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full tabular-nums">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </span>
                )}
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  {movie.status}
                </span>
              </div>

              {/* Movie Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-sm italic text-slate-400 font-serif">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              {/* Genres */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-0.5">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-white/5 border border-white/10 px-3 py-0.5 text-xs font-medium text-slate-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-2">
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

                {trailer && (
                  <a
                    href="#trailer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/15 transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 fill-current text-cyan-400" />
                    <span>Watch Trailer</span>
                  </a>
                )}

                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-transparent px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                    <span>Official Site</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Overview & Movie Information Section */}
          <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
            {/* Overview */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Overview
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-200 max-w-4xl">
                {movie.overview || "No overview available for this movie."}
              </p>
            </div>

            {/* Clean Movie Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/5">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Release Date
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 tabular-nums">
                  {formatDate(movie.release_date)}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Original Language
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  {movie.spoken_languages?.[0]?.english_name || movie.original_language?.toUpperCase() || "N/A"}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Budget
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 tabular-nums">
                  {movie.budget > 0 ? formatCurrency(movie.budget) : "—"}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Revenue
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 tabular-nums">
                  {movie.revenue > 0 ? formatCurrency(movie.revenue) : "—"}
                </span>
              </div>
            </div>

            {/* Production Companies */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">
                  Production Studios
                </span>
                <p className="text-xs text-slate-300">
                  {movie.production_companies.map((c) => c.name).join(" • ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Official Trailer Video Player */}
      {trailer && (
        <section id="trailer" className="space-y-4 pt-4">
          <SectionHeader
            title="Official Trailer"
            subtitle={`${movie.title} trailer preview`}
          />
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black max-w-4xl mx-auto shadow-2xl">
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
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
