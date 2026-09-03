import { apiClient } from "@/lib/axios";
import { PaginationParams, TMDBResponse } from "@/types/api.types";
import { CreditsResponse, VideoResponse, WatchProvidersResponse } from "@/types/common.types";
import { TMovie, TMovieDetail, MovieCategory } from "../types/movie.types";

export const MovieService = {
  getPopular: async (params?: PaginationParams): Promise<TMDBResponse<TMovie>> => {
    const response = await apiClient.get<TMDBResponse<TMovie>>("/movie/popular", {
      params,
    });
    return response.data;
  },

  getTopRated: async (params?: PaginationParams): Promise<TMDBResponse<TMovie>> => {
    const response = await apiClient.get<TMDBResponse<TMovie>>("/movie/top_rated", {
      params,
    });
    return response.data;
  },

  getNowPlaying: async (params?: PaginationParams): Promise<TMDBResponse<TMovie>> => {
    const response = await apiClient.get<TMDBResponse<TMovie>>("/movie/now_playing", {
      params,
    });
    return response.data;
  },

  getUpcoming: async (params?: PaginationParams): Promise<TMDBResponse<TMovie>> => {
    const response = await apiClient.get<TMDBResponse<TMovie>>("/movie/upcoming", {
      params,
    });
    return response.data;
  },

  getByCategory: async (
    category: MovieCategory,
    params?: PaginationParams
  ): Promise<TMDBResponse<TMovie>> => {
    const endpointMap: Record<MovieCategory, string> = {
      popular: "/movie/popular",
      top_rated: "/movie/top_rated",
      now_playing: "/movie/now_playing",
      upcoming: "/movie/upcoming",
    };
    const response = await apiClient.get<TMDBResponse<TMovie>>(endpointMap[category], {
      params,
    });
    return response.data;
  },

  getDetails: async (movieId: number | string): Promise<TMovieDetail> => {
    const response = await apiClient.get<TMovieDetail>(`/movie/${movieId}`);
    return response.data;
  },

  getCredits: async (movieId: number | string): Promise<CreditsResponse> => {
    const response = await apiClient.get<CreditsResponse>(`/movie/${movieId}/credits`);
    return response.data;
  },

  getVideos: async (movieId: number | string): Promise<VideoResponse> => {
    const response = await apiClient.get<VideoResponse>(`/movie/${movieId}/videos`);
    return response.data;
  },

  getSimilar: async (
    movieId: number | string,
    params?: PaginationParams
  ): Promise<TMDBResponse<TMovie>> => {
    const response = await apiClient.get<TMDBResponse<TMovie>>(
      `/movie/${movieId}/similar`,
      { params }
    );
    return response.data;
  },

  getWatchProviders: async (
    movieId: number | string
  ): Promise<WatchProvidersResponse> => {
    const response = await apiClient.get<WatchProvidersResponse>(
      `/movie/${movieId}/watch/providers`
    );
    return response.data;
  },

  discoverByGenre: async (
    genreId: number,
    page: number = 1
  ): Promise<TMDBResponse<TMovie>> => {
    const response = await apiClient.get<TMDBResponse<TMovie>>("/discover/movie", {
      params: {
        with_genres: genreId,
        page,
        sort_by: "popularity.desc",
      },
    });
    return response.data;
  },
};
