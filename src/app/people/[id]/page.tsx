"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Film, Tv, Globe } from "lucide-react";
import {
  usePersonDetail,
  usePersonCombinedCredits,
} from "@/features/people/hooks/use-people";
import { getProfileUrl, getPosterUrl } from "@/lib/tmdb";
import { formatDate, formatYear } from "@/lib/utils";
import { RatingBadge } from "@/components/ui/rating-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/components/layout/section-header";

interface PersonDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PersonDetailPage({ params }: PersonDetailPageProps) {
  const resolvedParams = use(params);
  const personId = resolvedParams.id;

  const { data: person, isLoading: isPersonLoading } = usePersonDetail(personId);
  const { data: creditsData } = usePersonCombinedCredits(personId);

  if (isPersonLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-light text-white">Person not found</h2>
        <Link
          href="/people"
          className="mt-4 inline-block text-cyan-400 text-sm hover:underline"
        >
          Return to People Directory
        </Link>
      </div>
    );
  }

  const profileUrl = getProfileUrl(person.profile_path, "h632");
  const knownCredits = (creditsData?.cast || [])
    .filter((c) => c.poster_path)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 15);

  return (
    <div className="space-y-10">
      {/* Back Link */}
      <Link
        href="/people"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to People</span>
      </Link>

      {/* Main Profile Info */}
      <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#07090E] p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Portrait */}
          <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border border-white/10 bg-black mx-auto max-w-sm">
            <Image
              src={profileUrl}
              alt={person.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              unoptimized={profileUrl.startsWith("/placeholder")}
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-[4px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  {person.known_for_department}
                </span>
                {person.birthday && (
                  <span className="flex items-center gap-1 text-xs text-slate-400 tabular-nums">
                    <Calendar className="h-3 w-3 text-slate-500" />
                    <span>Born: {formatDate(person.birthday)}</span>
                  </span>
                )}
                {person.place_of_birth && (
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="h-3 w-3 text-slate-500" />
                    <span>{person.place_of_birth}</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
                {person.name}
              </h1>

              {/* Biography */}
              <div className="space-y-1.5 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Biography
                </h3>
                <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line max-h-80 overflow-y-auto pr-2">
                  {person.biography || "No biography available for this person."}
                </p>
              </div>

              {/* Also Known As */}
              {person.also_known_as?.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] text-slate-500 block mb-1">
                    Also Known As
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {person.also_known_as.slice(0, 5).map((alias, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-slate-300 bg-[#0E121B] px-2 py-0.5 rounded-[4px] border border-white/10"
                      >
                        {alias}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Official Link */}
            {person.homepage && (
              <div className="pt-4 border-t border-white/10">
                <a
                  href={person.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-transparent px-4 py-2 text-xs font-semibold text-white hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>Official Website</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Known For / Filmography */}
      {knownCredits.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title="Known For & Filmography"
            subtitle={`Popular titles featuring ${person.name}`}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {knownCredits.map((credit) => {
              const posterUrl = getPosterUrl(credit.poster_path, "w500");
              const isMovie = credit.media_type === "movie";
              const title = credit.title || credit.name || "Untitled";
              const date = credit.release_date || credit.first_air_date;
              const linkHref = isMovie
                ? `/movies/${credit.id}`
                : `/tv/${credit.id}`;

              return (
                <Link
                  key={`${credit.media_type}-${credit.id}`}
                  href={linkHref}
                  className="group relative flex flex-col rounded-lg overflow-hidden bg-[#07090E] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
                    <Image
                      src={posterUrl}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      unoptimized={posterUrl.startsWith("/placeholder")}
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <RatingBadge rating={credit.vote_average} />
                    </div>
                  </div>

                  <div className="p-3">
                    <h4 className="text-xs font-semibold text-white group-hover:text-cyan-400 line-clamp-1">
                      {title}
                    </h4>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="tabular-nums">{formatYear(date)}</span>
                      <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-[#0E121B] px-1.5 py-0.5 rounded-[4px]">
                        {isMovie ? (
                          <Film className="h-3 w-3" />
                        ) : (
                          <Tv className="h-3 w-3" />
                        )}
                        <span>{credit.media_type}</span>
                      </span>
                    </div>
                    {credit.character && (
                      <p className="mt-1 text-[10px] text-slate-500 line-clamp-1">
                        as {credit.character}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
