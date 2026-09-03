import { MediaType } from "@/types/common.types";

export interface KnownForMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: "movie";
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface KnownForTv {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: "tv";
  overview: string;
  first_air_date: string;
  vote_average: number;
}

export type KnownForItem = KnownForMovie | KnownForTv;

export interface TPerson {
  id: number;
  name: string;
  original_name: string;
  media_type?: MediaType;
  adult: boolean;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string | null;
  known_for?: KnownForItem[];
}

export interface TPersonDetail extends TPerson {
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string | null;
  place_of_birth: string | null;
}

export interface PersonCastCredit {
  id: number;
  title?: string;
  name?: string;
  character: string;
  media_type: "movie" | "tv";
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count?: number;
  overview?: string;
  genre_ids?: number[];
  popularity?: number;
  original_language?: string;
  original_title?: string;
  release_date?: string;
  first_air_date?: string;
  episode_count?: number;
}

export interface PersonCombinedCredits {
  id: number;
  cast: PersonCastCredit[];
}
