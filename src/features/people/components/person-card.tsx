import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TPerson } from "../types/people.types";
import { getProfileUrl } from "@/lib/tmdb";

interface PersonCardProps {
  person: TPerson;
}

export function PersonCard({ person }: PersonCardProps) {
  const profileUrl = getProfileUrl(person.profile_path, "h632");

  const knownForTitles = person.known_for
    ?.map((item) => ("title" in item ? item.title : item.name))
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");

  return (
    <Link
      href={`/people/${person.id}`}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
        <Image
          src={profileUrl}
          alt={person.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized={profileUrl.startsWith("/placeholder")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="text-sm font-semibold text-neutral-100 group-hover:text-emerald-400 line-clamp-1 transition-colors">
            {person.name}
          </h3>
          <p className="mt-0.5 text-xs text-emerald-400/90 font-medium">
            {person.known_for_department}
          </p>
          {knownForTitles && (
            <p className="mt-1 text-[11px] text-neutral-400 line-clamp-1">
              {knownForTitles}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
