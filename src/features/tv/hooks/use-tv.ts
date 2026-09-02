import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/types/api.types";
import { TvService } from "../services/tv.service";
import { TvCategory } from "../types/tv.types";

export const tvKeys = {
  all: ["tv"] as const,
  popular: (params?: PaginationParams) => [...tvKeys.all, "popular", params] as const,
  topRated: (params?: PaginationParams) => [...tvKeys.all, "topRated", params] as const,
  onTheAir: (params?: PaginationParams) => [...tvKeys.all, "onTheAir", params] as const,
  airingToday: (params?: PaginationParams) => [...tvKeys.all, "airingToday", params] as const,
  byCategory: (category: TvCategory, params?: PaginationParams) =>
    [...tvKeys.all, "category", category, params] as const,
  detail: (id: number | string) => [...tvKeys.all, "detail", id] as const,
  credits: (id: number | string) => [...tvKeys.all, "credits", id] as const,
  videos: (id: number | string) => [...tvKeys.all, "videos", id] as const,
  similar: (id: number | string, params?: PaginationParams) =>
    [...tvKeys.all, "similar", id, params] as const,
};

export function usePopularTv(params?: PaginationParams) {
  return useQuery({
    queryKey: tvKeys.popular(params),
    queryFn: () => TvService.getPopular(params),
  });
}

export function useTopRatedTv(params?: PaginationParams) {
  return useQuery({
    queryKey: tvKeys.topRated(params),
    queryFn: () => TvService.getTopRated(params),
  });
}

export function useOnTheAirTv(params?: PaginationParams) {
  return useQuery({
    queryKey: tvKeys.onTheAir(params),
    queryFn: () => TvService.getOnTheAir(params),
  });
}

export function useAiringTodayTv(params?: PaginationParams) {
  return useQuery({
    queryKey: tvKeys.airingToday(params),
    queryFn: () => TvService.getAiringToday(params),
  });
}

export function useTvByCategory(category: TvCategory, params?: PaginationParams) {
  return useQuery({
    queryKey: tvKeys.byCategory(category, params),
    queryFn: () => TvService.getByCategory(category, params),
  });
}

export function useTvDetail(tvId: number | string) {
  return useQuery({
    queryKey: tvKeys.detail(tvId),
    queryFn: () => TvService.getDetails(tvId),
    enabled: Boolean(tvId),
  });
}

export function useTvCredits(tvId: number | string) {
  return useQuery({
    queryKey: tvKeys.credits(tvId),
    queryFn: () => TvService.getCredits(tvId),
    enabled: Boolean(tvId),
  });
}

export function useTvVideos(tvId: number | string) {
  return useQuery({
    queryKey: tvKeys.videos(tvId),
    queryFn: () => TvService.getVideos(tvId),
    enabled: Boolean(tvId),
  });
}

export function useSimilarTv(tvId: number | string, params?: PaginationParams) {
  return useQuery({
    queryKey: tvKeys.similar(tvId, params),
    queryFn: () => TvService.getSimilar(tvId, params),
    enabled: Boolean(tvId),
  });
}
