"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Globe } from "lucide-react";
import {
  usePersonDetail,
  usePersonCombinedCredits,
} from "@/features/people/hooks/use-people";
import { MovieCard } from "@/features/movies/components/movie-card";
import { SectionHeader } from "@/components/layout/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfileUrl } from "@/lib/tmdb";
import { formatDate } from "@/lib/utils";

interface PersonDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PersonDetailPage({ params }: PersonDetailPageProps) {
  const resolvedParams = use(params);
  const personId = resolvedParams.id;

  const { data: person, isLoading: isPersonLoading } =
    usePersonDetail(personId);
  const { data: creditsData } = usePersonCombinedCredits(personId);

  if (isPersonLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Skeleton className="aspect-[3/4] w-full rounded-xl" />
          <div className="md:col-span-3 space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-28 w-full" />
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
    <div className="space-y-12">
      {/* Top Breadcrumb Navigation */}
      <Link
        href="/people"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to People</span>
      </Link>

      {/* Main Profile Container */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#07090E] p-6 sm:p-8 md:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 lg:gap-10">
          {/* Portrait Image */}
          <div className="relative w-44 sm:w-56 md:w-64 aspect-[3/4] shrink-0 rounded-xl overflow-hidden border-2 border-white/15 bg-neutral-900 shadow-2xl shadow-black mx-auto md:mx-0">
            <Image
              src={profileUrl}
              alt={person.name}
              fill
              priority
              sizes="(max-width: 768px) 176px, 256px"
              className="object-cover"
              unoptimized={profileUrl.startsWith("/placeholder")}
            />
          </div>

          {/* Details Column */}
          <div className="flex-1 space-y-4 text-center md:text-left min-w-0">
            {/* Department, Birthday, Birthplace */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                {person.known_for_department}
              </span>
              {person.birthday && (
                <span className="flex items-center gap-1 text-xs text-slate-300 tabular-nums bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                  <Calendar className="h-3 w-3 text-slate-400" />
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

            {/* Name */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {person.name}
            </h1>

            {/* Biography */}
            <div className="space-y-2 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Biography
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-200 whitespace-pre-line max-h-80 overflow-y-auto pr-2 text-left">
                {person.biography || "No biography available for this person."}
              </p>
            </div>

            {/* Also Known As */}
            {person.also_known_as && person.also_known_as.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">
                  Also Known As
                </span>
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                  {person.also_known_as.slice(0, 5).map((alias, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-slate-300 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10"
                    >
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Official Website */}
            {person.homepage && (
              <div className="pt-4 border-t border-white/10">
                <a
                  href={person.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-transparent px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5 text-slate-400" />
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {knownCredits.map((item) => (
              <MovieCard
                key={`${item.media_type}-${item.id}`}
                movie={{
                  id: item.id,
                  title: item.title || item.name || "Untitled",
                  poster_path: item.poster_path,
                  backdrop_path: item.backdrop_path,
                  vote_average: item.vote_average,
                  vote_count: item.vote_count || 0,
                  release_date: item.release_date || item.first_air_date || "",
                  overview: item.overview || "",
                  genre_ids: item.genre_ids || [],
                  popularity: item.popularity || 0,
                  adult: false,
                  original_language: item.original_language || "en",
                  original_title: item.title || item.name || "",
                  video: false,
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
