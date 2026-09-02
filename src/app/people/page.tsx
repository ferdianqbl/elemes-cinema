"use client";

import React, { useState } from "react";
import { usePopularPeople } from "@/features/people/hooks/use-people";
import { PersonCard } from "@/features/people/components/person-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PeoplePage() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isPlaceholderData } = usePopularPeople({ page });

  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
          Popular People & Cast
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
          Discover trending actors, directors, and filmmakers across global cinema
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data?.results?.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.total_pages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Previous</span>
          </Button>

          <span className="text-xs text-slate-400 px-2 font-medium tabular-nums">
            Page <strong className="text-white">{page}</strong> of{" "}
            <strong className="text-slate-300">{totalPages}</strong>
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (!isPlaceholderData && page < totalPages) {
                setPage((old) => old + 1);
              }
            }}
            disabled={page >= totalPages || isPlaceholderData || isLoading}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
