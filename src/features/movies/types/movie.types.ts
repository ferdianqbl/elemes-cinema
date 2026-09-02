import {
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "@/types/common.types";

export interface TMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface TMovieDetail extends Omit<TMovie, "genre_ids"> {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
}

export type MovieCategory = "popular" | "top_rated" | "now_playing" | "upcoming";
