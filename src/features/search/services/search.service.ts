import { apiClient } from "@/lib/axios";
import { TMDBResponse } from "@/types/api.types";
import { TMovie } from "@/features/movies/types/movie.types";
import { TTvShow } from "@/features/tv/types/tv.types";
import { SearchParams, SearchResultItem } from "../types/search.types";

export const SearchService = {
  multiSearch: async (params: SearchParams): Promise<TMDBResponse<SearchResultItem>> => {
    const response = await apiClient.get<TMDBResponse<SearchResultItem>>(
      "/search/multi",
      {
        params,
      }
    );
    return response.data;
  },

  searchMovies: async (params: SearchParams): Promise<TMDBResponse<TMovie>> => {
    const response = await apiClient.get<TMDBResponse<TMovie>>("/search/movie", {
      params,
    });
    return response.data;
  },

  searchTv: async (params: SearchParams): Promise<TMDBResponse<TTvShow>> => {
    const response = await apiClient.get<TMDBResponse<TTvShow>>("/search/tv", {
      params,
    });
    return response.data;
  },
};
