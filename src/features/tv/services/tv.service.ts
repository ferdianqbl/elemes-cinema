import { apiClient } from "@/lib/axios";
import { PaginationParams, TMDBResponse } from "@/types/api.types";
import { CreditsResponse, VideoResponse, WatchProvidersResponse } from "@/types/common.types";
import { TTvShow, TTvShowDetail, TvCategory } from "../types/tv.types";

export const TvService = {
  getPopular: async (params?: PaginationParams): Promise<TMDBResponse<TTvShow>> => {
    const response = await apiClient.get<TMDBResponse<TTvShow>>("/tv/popular", {
      params,
    });
    return response.data;
  },

  getTopRated: async (params?: PaginationParams): Promise<TMDBResponse<TTvShow>> => {
    const response = await apiClient.get<TMDBResponse<TTvShow>>("/tv/top_rated", {
      params,
    });
    return response.data;
  },

  getOnTheAir: async (params?: PaginationParams): Promise<TMDBResponse<TTvShow>> => {
    const response = await apiClient.get<TMDBResponse<TTvShow>>("/tv/on_the_air", {
      params,
    });
    return response.data;
  },

  getAiringToday: async (params?: PaginationParams): Promise<TMDBResponse<TTvShow>> => {
    const response = await apiClient.get<TMDBResponse<TTvShow>>("/tv/airing_today", {
      params,
    });
    return response.data;
  },

  getByCategory: async (
    category: TvCategory,
    params?: PaginationParams
  ): Promise<TMDBResponse<TTvShow>> => {
    const endpointMap: Record<TvCategory, string> = {
      popular: "/tv/popular",
      top_rated: "/tv/top_rated",
      on_the_air: "/tv/on_the_air",
      airing_today: "/tv/airing_today",
    };
    const response = await apiClient.get<TMDBResponse<TTvShow>>(endpointMap[category], {
      params,
    });
    return response.data;
  },

  getDetails: async (tvId: number | string): Promise<TTvShowDetail> => {
    const response = await apiClient.get<TTvShowDetail>(`/tv/${tvId}`);
    return response.data;
  },

  getCredits: async (tvId: number | string): Promise<CreditsResponse> => {
    const response = await apiClient.get<CreditsResponse>(`/tv/${tvId}/credits`);
    return response.data;
  },

  getVideos: async (tvId: number | string): Promise<VideoResponse> => {
    const response = await apiClient.get<VideoResponse>(`/tv/${tvId}/videos`);
    return response.data;
  },

  getSimilar: async (
    tvId: number | string,
    params?: PaginationParams
  ): Promise<TMDBResponse<TTvShow>> => {
    const response = await apiClient.get<TMDBResponse<TTvShow>>(`/tv/${tvId}/similar`, {
      params,
    });
    return response.data;
  },

  getWatchProviders: async (
    tvId: number | string
  ): Promise<WatchProvidersResponse> => {
    const response = await apiClient.get<WatchProvidersResponse>(
      `/tv/${tvId}/watch/providers`
    );
    return response.data;
  },

  discoverByGenre: async (
    genreId: number,
    page: number = 1
  ): Promise<TMDBResponse<TTvShow>> => {
    const response = await apiClient.get<TMDBResponse<TTvShow>>("/discover/tv", {
      params: {
        with_genres: genreId,
        page,
        sort_by: "popularity.desc",
      },
    });
    return response.data;
  },
};
