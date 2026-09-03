"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Globe, Play } from "lucide-react";
import {
  useTvDetail,
  useTvCredits,
  useTvVideos,
  useSimilarTv,
} from "@/features/tv/hooks/use-tv";
import { TvCard } from "@/features/tv/components/tv-card";
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
import { formatDate } from "@/lib/utils";

interface TvDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TvDetailPage({ params }: TvDetailPageProps) {
  const resolvedParams = use(params);
  const tvId = resolvedParams.id;

  const { data: tv, isLoading: isTvLoading } = useTvDetail(tvId);
  const { data: credits } = useTvCredits(tvId);
  const { data: videos } = useTvVideos(tvId);
  const { data: similar } = useSimilarTv(tvId);

  if (isTvLoading) {
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

  if (!tv) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-light text-white">TV Show not found</h2>
        <Link
          href="/tv"
          className="mt-4 inline-block text-cyan-400 text-sm hover:underline"
        >
          Return to TV Shows Catalog
        </Link>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(tv.backdrop_path, "original");
  const posterUrl = getPosterUrl(tv.poster_path, "w500");
  const trailer = videos?.results?.find(
    (v) =>
      v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
  );
  const topCast = credits?.cast?.slice(0, 10) || [];

  return (
    <div className="space-y-12">
      {/* Top Breadcrumb Navigation */}
      <Link
        href="/tv"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to TV Shows</span>
      </Link>

      {/* Cinematic Hero Container */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#07090E] shadow-2xl">
        {/* Backdrop Banner with Rich Gradients */}
        <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
          <Image
            src={backdropUrl}
            alt={tv.name}
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
            {/* Floating Series Poster */}
            <div className="relative w-40 sm:w-52 md:w-60 aspect-[2/3] shrink-0 rounded-xl overflow-hidden border-2 border-white/15 bg-neutral-900 shadow-2xl shadow-black">
              <Image
                src={posterUrl}
                alt={tv.name}
                fill
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 240px"
                className="object-cover"
                unoptimized={posterUrl.startsWith("/placeholder")}
              />
            </div>

            {/* Title & Core Metadata */}
            <div className="flex-1 space-y-3.5 text-center md:text-left">
              {/* Rating, Date, Seasons, Status */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <RatingBadge
                  rating={tv.vote_average}
                  count={tv.vote_count}
                />
                <span className="text-xs text-slate-300 font-medium tabular-nums">
                  {formatDate(tv.first_air_date)}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full tabular-nums">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span>{tv.number_of_seasons} Seasons ({tv.number_of_episodes} Episodes)</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  {tv.status}
                </span>
              </div>

              {/* Show Name */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {tv.name}
              </h1>

              {/* Tagline */}
              {tv.tagline && (
                <p className="text-sm italic text-slate-400 font-serif">
                  &ldquo;{tv.tagline}&rdquo;
                </p>
              )}

              {/* Genres */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-0.5">
                {tv.genres?.map((genre) => (
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

                {trailer && (
                  <a
                    href="#trailer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/15 transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 fill-current text-cyan-400" />
                    <span>Watch Trailer</span>
                  </a>
                )}

                {tv.homepage && (
                  <a
                    href={tv.homepage}
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

          {/* Overview & Series Facts */}
          <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Overview
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-200 max-w-4xl">
                {tv.overview || "No overview available for this series."}
              </p>
            </div>

            {/* Clean Series Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/5">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  First Aired
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 tabular-nums">
                  {formatDate(tv.first_air_date)}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Original Language
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  {tv.spoken_languages?.[0]?.english_name || tv.original_language?.toUpperCase() || "N/A"}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Total Seasons
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 tabular-nums">
                  {tv.number_of_seasons} ({tv.number_of_episodes} Episodes)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Production Studios
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 line-clamp-1">
                  {tv.production_companies?.map((n) => n.name).join(", ") || "—"}
                </span>
              </div>
            </div>

            {tv.created_by && tv.created_by.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">
                  Created By
                </span>
                <p className="text-xs text-slate-300">
                  {tv.created_by.map((c) => c.name).join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Seasons Breakdown */}
      {tv.seasons && tv.seasons.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title="Seasons & Episodes"
            subtitle={`Explore all ${tv.number_of_seasons} seasons of ${tv.name}`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tv.seasons.map((season) => {
              const seasonPoster = getPosterUrl(season.poster_path, "w342");
              return (
                <div
                  key={season.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-[#07090E] border border-white/10 hover:border-cyan-400/40 transition-colors"
                >
                  <div className="relative w-16 aspect-[2/3] shrink-0 rounded-lg overflow-hidden bg-neutral-900 border border-white/10">
                    <Image
                      src={seasonPoster}
                      alt={season.name}
                      fill
                      className="object-cover"
                      unoptimized={seasonPoster.startsWith("/placeholder")}
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 space-y-1">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {season.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 tabular-nums">
                      {season.episode_count} Episodes
                    </p>
                    {season.air_date && (
                      <p className="text-[10px] text-slate-500">
                        {formatDate(season.air_date)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Official Trailer Video Player */}
      {trailer && (
        <section id="trailer" className="space-y-4 pt-4">
          <SectionHeader
            title="Official Trailer"
            subtitle={`${tv.name} preview`}
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
            subtitle="Actors and characters in this series"
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

      {/* Similar TV Series */}
      {similar?.results && similar.results.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title="Similar Series"
            subtitle="More television shows you might enjoy"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {similar.results.slice(0, 5).map((simTv) => (
              <TvCard key={simTv.id} tv={simTv} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
