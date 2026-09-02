import React from "react";
import { TMovie } from "../types/movie.types";
import { MovieCard } from "./movie-card";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieGridProps {
  movies?: TMovie[];
  isLoading?: boolean;
  count?: number;
}

export function MovieGrid({
  movies = [],
  isLoading = false,
  count = 10,
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Skeleton className="aspect-[2/3] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-neutral-400">No movies found in this list.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie, idx) => (
        <MovieCard key={movie.id} movie={movie} priority={idx < 4} />
      ))}
    </div>
  );
}
