import { TMovie } from "@/features/movies/types/movie.types";
import { TTvShow } from "@/features/tv/types/tv.types";
import { TPerson } from "@/features/people/types/people.types";

export type SearchResultItem =
  | (TMovie & { media_type: "movie" })
  | (TTvShow & { media_type: "tv" })
  | (TPerson & { media_type: "person" });

export interface SearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
  year?: string;
  primary_release_year?: string;
}
