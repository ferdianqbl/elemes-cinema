"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Loader2, ArrowRight } from "lucide-react";
import { useUiStore } from "@/store/use-ui-store";
import { useMultiSearch } from "@/features/search/hooks/use-search";
import { useDebounce } from "@/hooks/use-debounce";
import { getPosterUrl, getProfileUrl } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import { RatingBadge } from "@/components/ui/rating-badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SearchModal() {
  const router = useRouter();
  const { isSearchOpen, closeSearch, toggleSearch } = useUiStore();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  // Listen for Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearch]);

  const { data, isLoading } = useMultiSearch({ query: debouncedQuery });
  const results = (data?.results || []).slice(0, 6);
  const isSearching = isLoading || query !== debouncedQuery;

  const handleSelect = (href: string) => {
    closeSearch();
    router.push(href);
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      closeSearch();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={(open) => !open && closeSearch()}>
      <DialogContent className="sm:max-w-xl bg-[#07090E] border border-white/10 p-0 overflow-hidden shadow-none rounded-lg">
        <DialogHeader className="p-4 border-b border-white/10">
          <DialogTitle className="sr-only">Quick Search</DialogTitle>
          <form onSubmit={handleFullSearch} className="relative flex items-center">
            <Search className="h-5 w-5 text-slate-500 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search movies, TV shows, actors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none font-normal"
              autoFocus
            />
            {isSearching && <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />}
          </form>
        </DialogHeader>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-white/5">
          {query.trim().length < 2 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              Type at least 2 characters to search...
            </div>
          ) : results.length === 0 && !isSearching ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((item) => {
              const isMovie = item.media_type === "movie";
              const isTv = item.media_type === "tv";
              const isPerson = item.media_type === "person";

              const title =
                "title" in item
                  ? item.title
                  : "name" in item
                  ? item.name
                  : "Untitled";

              const imagePath =
                "poster_path" in item
                  ? item.poster_path
                  : "profile_path" in item
                  ? item.profile_path
                  : null;

              const imageUrl = isPerson
                ? getProfileUrl(imagePath, "w45")
                : getPosterUrl(imagePath, "w92");

              const releaseDate =
                "release_date" in item
                  ? item.release_date
                  : "first_air_date" in item
                  ? item.first_air_date
                  : null;

              const href = isMovie
                ? `/movies/${item.id}`
                : isTv
                ? `/tv/${item.id}`
                : `/people/${item.id}`;

              return (
                <button
                  key={`${item.media_type}-${item.id}`}
                  type="button"
                  onClick={() => handleSelect(href)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#0E121B] text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative h-12 w-9 rounded-[4px] overflow-hidden bg-black shrink-0">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        unoptimized={imageUrl.startsWith("/placeholder")}
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 truncate">
                        {title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                        <span className="capitalize font-semibold text-cyan-400">
                          {item.media_type}
                        </span>
                        {releaseDate && <span className="tabular-nums">• {formatYear(releaseDate)}</span>}
                        {"known_for_department" in item && (
                          <span>• {item.known_for_department}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {"vote_average" in item && item.vote_average > 0 && (
                      <RatingBadge rating={item.vote_average} showStar={false} />
                    )}
                    <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {query.trim().length >= 2 && results.length > 0 && (
          <div className="p-2.5 border-t border-white/10 bg-[#0E121B]/40 text-center">
            <button
              type="button"
              onClick={handleFullSearch}
              className="text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View all results for &ldquo;{query}&rdquo;</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
