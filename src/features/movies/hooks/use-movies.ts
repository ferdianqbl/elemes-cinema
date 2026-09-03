import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/types/api.types";
import { MovieService } from "../services/movie.service";
import { MovieCategory } from "../types/movie.types";

export const movieKeys = {
  all: ["movies"] as const,
  popular: (params?: PaginationParams) => [...movieKeys.all, "popular", params] as const,
  topRated: (params?: PaginationParams) => [...movieKeys.all, "topRated", params] as const,
  nowPlaying: (params?: PaginationParams) => [...movieKeys.all, "nowPlaying", params] as const,
  upcoming: (params?: PaginationParams) => [...movieKeys.all, "upcoming", params] as const,
  byCategory: (category: MovieCategory, params?: PaginationParams) =>
    [...movieKeys.all, "category", category, params] as const,
  detail: (id: number | string) => [...movieKeys.all, "detail", id] as const,
  credits: (id: number | string) => [...movieKeys.all, "credits", id] as const,
  videos: (id: number | string) => [...movieKeys.all, "videos", id] as const,
  similar: (id: number | string, params?: PaginationParams) =>
    [...movieKeys.all, "similar", id, params] as const,
  watchProviders: (id: number | string) =>
    [...movieKeys.all, "watchProviders", id] as const,
  byGenre: (genreId: number, page?: number) =>
    [...movieKeys.all, "genre", genreId, page] as const,
};

export function usePopularMovies(params?: PaginationParams) {
  return useQuery({
    queryKey: movieKeys.popular(params),
    queryFn: () => MovieService.getPopular(params),
  });
}

export function useTopRatedMovies(params?: PaginationParams) {
  return useQuery({
    queryKey: movieKeys.topRated(params),
    queryFn: () => MovieService.getTopRated(params),
  });
}

export function useNowPlayingMovies(params?: PaginationParams) {
  return useQuery({
    queryKey: movieKeys.nowPlaying(params),
    queryFn: () => MovieService.getNowPlaying(params),
  });
}

export function useUpcomingMovies(params?: PaginationParams) {
  return useQuery({
    queryKey: movieKeys.upcoming(params),
    queryFn: () => MovieService.getUpcoming(params),
  });
}

export function useMoviesByCategory(category: MovieCategory, params?: PaginationParams) {
  return useQuery({
    queryKey: movieKeys.byCategory(category, params),
    queryFn: () => MovieService.getByCategory(category, params),
  });
}

export function useMovieDetail(movieId: number | string) {
  return useQuery({
    queryKey: movieKeys.detail(movieId),
    queryFn: () => MovieService.getDetails(movieId),
    enabled: Boolean(movieId),
  });
}

export function useMovieCredits(movieId: number | string) {
  return useQuery({
    queryKey: movieKeys.credits(movieId),
    queryFn: () => MovieService.getCredits(movieId),
    enabled: Boolean(movieId),
  });
}

export function useMovieVideos(movieId: number | string) {
  return useQuery({
    queryKey: movieKeys.videos(movieId),
    queryFn: () => MovieService.getVideos(movieId),
    enabled: Boolean(movieId),
  });
}

export function useSimilarMovies(movieId: number | string, params?: PaginationParams) {
  return useQuery({
    queryKey: movieKeys.similar(movieId, params),
    queryFn: () => MovieService.getSimilar(movieId, params),
    enabled: Boolean(movieId),
  });
}

export function useMovieWatchProviders(movieId: number | string) {
  return useQuery({
    queryKey: movieKeys.watchProviders(movieId),
    queryFn: () => MovieService.getWatchProviders(movieId),
    enabled: Boolean(movieId),
  });
}

export function useMoviesByGenre(genreId?: number, page: number = 1) {
  return useQuery({
    queryKey: movieKeys.byGenre(genreId || 0, page),
    queryFn: () => MovieService.discoverByGenre(genreId!, page),
    enabled: Boolean(genreId),
  });
}
