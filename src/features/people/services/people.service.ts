import { apiClient } from "@/lib/axios";
import { PaginationParams, TMDBResponse } from "@/types/api.types";
import {
  TPerson,
  TPersonDetail,
  PersonCombinedCredits,
} from "../types/people.types";

export const PeopleService = {
  getPopular: async (params?: PaginationParams): Promise<TMDBResponse<TPerson>> => {
    const response = await apiClient.get<TMDBResponse<TPerson>>("/person/popular", {
      params,
    });
    return response.data;
  },

  getDetails: async (personId: number | string): Promise<TPersonDetail> => {
    const response = await apiClient.get<TPersonDetail>(`/person/${personId}`);
    return response.data;
  },

  getCombinedCredits: async (
    personId: number | string
  ): Promise<PersonCombinedCredits> => {
    const response = await apiClient.get<PersonCombinedCredits>(
      `/person/${personId}/combined_credits`
    );
    return response.data;
  },
};
