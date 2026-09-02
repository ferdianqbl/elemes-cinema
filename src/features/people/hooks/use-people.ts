import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/types/api.types";
import { PeopleService } from "../services/people.service";

export const peopleKeys = {
  all: ["people"] as const,
  popular: (params?: PaginationParams) => [...peopleKeys.all, "popular", params] as const,
  detail: (id: number | string) => [...peopleKeys.all, "detail", id] as const,
  credits: (id: number | string) => [...peopleKeys.all, "credits", id] as const,
};

export function usePopularPeople(params?: PaginationParams) {
  return useQuery({
    queryKey: peopleKeys.popular(params),
    queryFn: () => PeopleService.getPopular(params),
  });
}

export function usePersonDetail(personId: number | string) {
  return useQuery({
    queryKey: peopleKeys.detail(personId),
    queryFn: () => PeopleService.getDetails(personId),
    enabled: Boolean(personId),
  });
}

export function usePersonCombinedCredits(personId: number | string) {
  return useQuery({
    queryKey: peopleKeys.credits(personId),
    queryFn: () => PeopleService.getCombinedCredits(personId),
    enabled: Boolean(personId),
  });
}
