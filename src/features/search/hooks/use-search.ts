import { useQuery } from "@tanstack/react-query";
import { SearchParams } from "../types/search.types";
import { SearchService } from "../services/search.service";

export const searchKeys = {
  all: ["search"] as const,
  multi: (params: SearchParams) => [...searchKeys.all, "multi", params] as const,
  movies: (params: SearchParams) => [...searchKeys.all, "movies", params] as const,
  tv: (params: SearchParams) => [...searchKeys.all, "tv", params] as const,
};

export function useMultiSearch(params: SearchParams) {
  return useQuery({
    queryKey: searchKeys.multi(params),
    queryFn: () => SearchService.multiSearch(params),
    enabled: Boolean(params.query.trim().length >= 2),
  });
}

export function useMovieSearch(params: SearchParams) {
  return useQuery({
    queryKey: searchKeys.movies(params),
    queryFn: () => SearchService.searchMovies(params),
    enabled: Boolean(params.query.trim().length >= 2),
  });
}

export function useTvSearch(params: SearchParams) {
  return useQuery({
    queryKey: searchKeys.tv(params),
    queryFn: () => SearchService.searchTv(params),
    enabled: Boolean(params.query.trim().length >= 2),
  });
}
