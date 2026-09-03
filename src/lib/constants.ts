export const SITE_NAME = "Elemes Cinema";
export const SITE_DESCRIPTION =
  "Movie & TV Show Catalog Web App powered by TMDB API. Discover top rated, popular, and trending entertainment.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv" },
  { label: "People", href: "/people" },
  { label: "Watchlist", href: "/watchlist" },
];

export const MOVIE_CATEGORIES = [
  { id: "popular", label: "Popular", endpoint: "/movie/popular" },
  { id: "top_rated", label: "Top Rated", endpoint: "/movie/top_rated" },
  { id: "now_playing", label: "Now Playing", endpoint: "/movie/now_playing" },
  { id: "upcoming", label: "Upcoming", endpoint: "/movie/upcoming" },
] as const;

export const TV_CATEGORIES = [
  { id: "popular", label: "Popular", endpoint: "/tv/popular" },
  { id: "top_rated", label: "Top Rated", endpoint: "/tv/top_rated" },
  { id: "on_the_air", label: "On The Air", endpoint: "/tv/on_the_air" },
  { id: "airing_today", label: "Airing Today", endpoint: "/tv/airing_today" },
] as const;

export const MOVIE_GENRES: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const TV_GENRES: Record<number, string> = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};
