"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Tv, Calendar, Globe } from "lucide-react";
import {
  useTvDetail,
  useTvCredits,
  useTvVideos,
  useSimilarTv,
} from "@/features/tv/hooks/use-tv";
import { getBackdropUrl, getPosterUrl, getProfileUrl, getYouTubeEmbedUrl } from "@/lib/tmdb";
import { formatDate, formatRating } from "@/lib/utils";
import { RatingBadge } from "@/components/ui/rating-badge";
import { WatchlistButton } from "@/features/watchlist/components/watchlist-button";
import { TvCard } from "@/features/tv/components/tv-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/components/layout/section-header";

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
        <Skeleton className="h-8 w-32" />
        <Skeleton className="aspect-[21/9] w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="aspect-[2/3] w-full rounded-xl" />
          <div className="md:col-span-2 space-y-4">
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
        <h2 className="text-xl font-bold text-white">TV Show not found</h2>
        <Link href="/tv" className="mt-4 inline-block text-emerald-400 text-sm hover:underline">
          Return to TV Shows Catalog
        </Link>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(tv.backdrop_path, "original");
  const posterUrl = getPosterUrl(tv.poster_path, "w500");
  const trailer = videos?.results?.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );
  const topCast = credits?.cast?.slice(0, 10) || [];

  return (
    <div className="space-y-10">
      {/* Back Link */}
      <Link
        href="/tv"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to TV Shows</span>
      </Link>

      {/* Main Details Section */}
      <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/40 p-6 md:p-10">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <Image
            src={backdropUrl}
            alt={tv.name}
            fill
            className="object-cover blur-2xl"
            unoptimized={backdropUrl.startsWith("/placeholder")}
          />
          <div className="absolute inset-0 bg-neutral-950/80" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Poster */}
          <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/80 bg-neutral-950 mx-auto max-w-sm">
            <Image
              src={posterUrl}
              alt={tv.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              unoptimized={posterUrl.startsWith("/placeholder")}
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <RatingBadge rating={tv.vote_average} count={tv.vote_count} />
                <span className="text-xs text-neutral-400">
                  {formatDate(tv.first_air_date)}
                </span>
                <span className="text-xs text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded">
                  {tv.number_of_seasons} Seasons ({tv.number_of_episodes} Episodes)
                </span>
                <span className="text-xs uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  {tv.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {tv.name}
              </h1>

              {tv.tagline && (
                <p className="text-sm italic text-neutral-400 font-serif">
                  &ldquo;{tv.tagline}&rdquo;
                </p>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-2 pt-1">
                {tv.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-neutral-800/80 border border-neutral-700/60 px-3 py-1 text-xs font-medium text-neutral-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="space-y-1.5 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
                  Overview
                </h3>
                <p className="text-sm leading-relaxed text-neutral-300">
                  {tv.overview || "No overview available for this series."}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80 text-xs">
                {tv.created_by?.length > 0 && (
                  <div>
                    <span className="text-neutral-500 block">Created By</span>
                    <span className="font-semibold text-neutral-200">
                      {tv.created_by.map((c) => c.name).join(", ")}
                    </span>
                  </div>
                )}
                {tv.type && (
                  <div>
                    <span className="text-neutral-500 block">Series Type</span>
                    <span className="font-semibold text-neutral-200">
                      {tv.type}
                    </span>
                  </div>
                )}
                {tv.spoken_languages?.length > 0 && (
                  <div>
                    <span className="text-neutral-500 block">Language</span>
                    <span className="font-semibold text-neutral-200">
                      {tv.spoken_languages[0].english_name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-800">
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

              {tv.homepage && (
                <a
                  href={tv.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>Official Site</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Seasons Overview */}
      {tv.seasons && tv.seasons.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title="Seasons & Episodes"
            subtitle={`All ${tv.number_of_seasons} broadcast seasons`}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {tv.seasons.map((season) => {
              const seasonPoster = getPosterUrl(season.poster_path, "w342");
              return (
                <div
                  key={season.id}
                  className="rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800/80 p-2.5 space-y-2"
                >
                  <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-neutral-950">
                    <Image
                      src={seasonPoster}
                      alt={season.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover"
                      unoptimized={seasonPoster.startsWith("/placeholder")}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white line-clamp-1">
                      {season.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      {season.episode_count} Episodes
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Trailer */}
      {trailer && (
        <section className="space-y-4">
          <SectionHeader
            title="Official Trailer"
            subtitle={`${tv.name} preview`}
          />
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-xl max-w-4xl mx-auto">
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

      {/* Cast */}
      {topCast.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title="Top Series Cast"
            subtitle="Starring cast and recurring characters"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {topCast.map((actor) => {
              const profileUrl = getProfileUrl(actor.profile_path, "h632");
              return (
                <div
                  key={actor.id}
                  className="flex flex-col rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800/80 p-2.5 space-y-2"
                >
                  <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-950">
                    <Image
                      src={profileUrl}
                      alt={actor.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover"
                      unoptimized={profileUrl.startsWith("/placeholder")}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-100 line-clamp-1">
                      {actor.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">
                      {actor.character}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Similar Shows */}
      {similar?.results && similar.results.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title="Recommended TV Shows"
            subtitle="Similar shows you might like"
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
