import React from "react";
import { TTvShow } from "../types/tv.types";
import { TvCard } from "./tv-card";
import { Skeleton } from "@/components/ui/skeleton";

interface TvGridProps {
  shows?: TTvShow[];
  isLoading?: boolean;
  count?: number;
}

export function TvGrid({
  shows = [],
  isLoading = false,
  count = 10,
}: TvGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (shows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-slate-400">No TV shows found in this list.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {shows.map((tv, idx) => (
        <TvCard key={tv.id} tv={tv} priority={idx < 4} />
      ))}
    </div>
  );
}
