# TMDB API Integration Documentation

**Project:** Elemes Cinema — Movie & TV Show Catalog Web App  
**API Provider:** [The Movie Database (TMDB) REST API v3 / v4](https://developer.themoviedb.org/docs)  
**Status:** 12+ Active Integrated Endpoints  
**Document Path:** `workspace/docs/API_DOCUMENTATION.md`  

---

## 1. Authentication & Base Configuration

The application implements a resilient authentication layer supporting both **TMDB v4 Bearer Token** (recommended) and **TMDB v3 API Key** (query parameter fallback).

### Environment Variables Schema
```env
# Base API URL
NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3

# TMDB Image CDN Base
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# TMDB Read Access Token (v4 Bearer Token - High Priority)
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_v4_bearer_token

# TMDB API Key (v3 Query Parameter - Fallback)
NEXT_PUBLIC_TMDB_API_KEY=your_v3_api_key
```

### Axios Client Interceptor (`src/lib/axios.ts`)
```typescript
apiClient.interceptors.request.use((config) => {
  if (ACCESS_TOKEN) {
    config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
  } else if (API_KEY) {
    config.params = { ...config.params, api_key: API_KEY };
  }
  return config;
});
```

---

## 2. Image CDN & URL Resolution

Image assets are delivered via TMDB's high-speed CDN and configured with responsive dimensions in `src/lib/tmdb.ts`:

| Media Type | Available Sizes | Default Utility | Fallback Asset |
|---|---|---|---|
| **Poster Art** | `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original` | `getPosterUrl(path, 'w500')` | `/placeholder-poster.png` |
| **Backdrop Hero** | `w300`, `w780`, `w1280`, `original` | `getBackdropUrl(path, 'original')` | `/placeholder-backdrop.png` |
| **Person Profile**| `w45`, `w185`, `h632`, `original` | `getProfileUrl(path, 'h632')` | `/placeholder-avatar.png` |
| **YouTube Video** | Embed iframe (`youtube-nocookie.com`) | `getYouTubeEmbedUrl(key)` | `null` |

---

## 3. Detailed Endpoint Reference Matrix

### 3.1 Movies Domain (`MovieService`)

#### 1. Get Popular Movies
* **HTTP Method:** `GET /movie/popular`
* **Service Method:** `MovieService.getPopular(params?: PaginationParams)`
* **Query Params:** `page` (default: 1), `language` (default: `en-US`)
* **Response Type:** `TMDBResponse<TMovie>`
* **Used In:** Home Page Popular Shelf, Movies Catalog `/movies` (Popular Tab)

#### 2. Get Top Rated Movies
* **HTTP Method:** `GET /movie/top_rated`
* **Service Method:** `MovieService.getTopRated(params?: PaginationParams)`
* **Query Params:** `page` (default: 1)
* **Response Type:** `TMDBResponse<TMovie>`
* **Used In:** Movies Catalog `/movies` (Top Rated Tab)

#### 3. Get Now Playing Movies
* **HTTP Method:** `GET /movie/now_playing`
* **Service Method:** `MovieService.getNowPlaying(params?: PaginationParams)`
* **Query Params:** `page` (default: 1)
* **Response Type:** `TMDBResponse<TMovie>`
* **Used In:** Home Featured Hero Banner, Movies Catalog `/movies` (Now Playing Tab)

#### 4. Get Upcoming Movies
* **HTTP Method:** `GET /movie/upcoming`
* **Service Method:** `MovieService.getUpcoming(params?: PaginationParams)`
* **Query Params:** `page` (default: 1)
* **Response Type:** `TMDBResponse<TMovie>`
* **Used In:** Movies Catalog `/movies` (Upcoming Tab)

#### 5. Get Movie Details
* **HTTP Method:** `GET /movie/{movie_id}`
* **Service Method:** `MovieService.getDetails(movieId: number | string)`
* **Path Params:** `movie_id` (TMDB numeric ID)
* **Response Type:** `TMovieDetail`
* **Key Fields Returned:** `title`, `overview`, `genres`, `budget`, `revenue`, `runtime`, `status`, `tagline`, `homepage`, `spoken_languages`
* **Used In:** Movie Detail Page `/movies/[id]`

#### 6. Get Movie Credits (Cast & Crew)
* **HTTP Method:** `GET /movie/{movie_id}/credits`
* **Service Method:** `MovieService.getCredits(movieId: number | string)`
* **Response Type:** `CreditsResponse` (`cast: CastMember[]`, `crew: CrewMember[]`)
* **Used In:** Movie Detail Page `/movies/[id]` Top Cast Gallery

#### 7. Get Movie Videos (Trailers & Teasers)
* **HTTP Method:** `GET /movie/{movie_id}/videos`
* **Service Method:** `MovieService.getVideos(movieId: number | string)`
* **Response Type:** `VideoResponse` (`results: VideoItem[]`)
* **Filters:** Extracts items where `site === "YouTube"` and `type === "Trailer" | "Teaser"`
* **Used In:** Movie Detail Page `/movies/[id]` Embedded Trailer Player

#### 8. Get Similar Movies
* **HTTP Method:** `GET /movie/{movie_id}/similar`
* **Service Method:** `MovieService.getSimilar(movieId, params)`
* **Response Type:** `TMDBResponse<TMovie>`
* **Used In:** Movie Detail Page `/movies/[id]` Recommendations Shelf

---

### 3.2 TV Series Domain (`TvService`)

#### 9. Get Popular TV Shows
* **HTTP Method:** `GET /tv/popular`
* **Service Method:** `TvService.getPopular(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TTvShow>`
* **Used In:** TV Catalog `/tv` (Popular Tab)

#### 10. Get Top Rated TV Shows
* **HTTP Method:** `GET /tv/top_rated`
* **Service Method:** `TvService.getTopRated(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TTvShow>`
* **Used In:** Home Page Top Rated TV Shelf, TV Catalog `/tv` (Top Rated Tab)

#### 11. Get On The Air TV Shows
* **HTTP Method:** `GET /tv/on_the_air`
* **Service Method:** `TvService.getOnTheAir(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TTvShow>`
* **Used In:** TV Catalog `/tv` (On The Air Tab)

#### 12. Get Airing Today TV Shows
* **HTTP Method:** `GET /tv/airing_today`
* **Service Method:** `TvService.getAiringToday(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TTvShow>`
* **Used In:** TV Catalog `/tv` (Airing Today Tab)

#### 13. Get TV Show Details
* **HTTP Method:** `GET /tv/{tv_id}`
* **Service Method:** `TvService.getDetails(tvId: number | string)`
* **Response Type:** `TTvShowDetail`
* **Key Fields Returned:** `name`, `overview`, `seasons: Season[]`, `number_of_seasons`, `number_of_episodes`, `created_by`, `status`, `type`
* **Used In:** TV Detail Page `/tv/[id]` Seasons & Episode Breakdown

#### 14. Get TV Show Credits & Videos
* **HTTP Methods:** `GET /tv/{tv_id}/credits` and `GET /tv/{tv_id}/videos`
* **Service Methods:** `TvService.getCredits(tvId)`, `TvService.getVideos(tvId)`
* **Used In:** TV Detail Page `/tv/[id]` Cast Gallery & Video Trailer

---

### 3.3 People Domain (`PeopleService`)

#### 15. Get Popular People
* **HTTP Method:** `GET /person/popular`
* **Service Method:** `PeopleService.getPopular(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TPerson>`
* **Used In:** Home Page Trending Stars, People Directory `/people`

#### 16. Get Person Details & Combined Credits
* **HTTP Methods:** `GET /person/{person_id}` and `GET /person/{person_id}/combined_credits`
* **Service Methods:** `PeopleService.getDetails(personId)`, `PeopleService.getCombinedCredits(personId)`
* **Key Fields Returned:** `name`, `biography`, `birthday`, `place_of_birth`, `known_for_department`, `cast: (MovieCredit | TvCredit)[]`
* **Used In:** Person Profile Page `/people/[id]`

---

### 3.4 Multi-Search Engine (`SearchService`)

#### 17. Search Multi (Movies, TV, Cast)
* **HTTP Method:** `GET /search/multi`
* **Service Method:** `SearchService.multiSearch({ query, page })`
* **Query Params:** `query` (URL encoded string), `page` (default: 1)
* **Response Type:** `TMDBResponse<SearchResultItem>` (`media_type: "movie" | "tv" | "person"`)
* **Used In:** Quick Search Dialog `⌘K`, Dedicated Search Engine `/search`

---

## 4. TypeScript Interface Contracts

```typescript
// Generic TMDB Paginated Response
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Core Movie Model
export interface TMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

// Core TV Show Model
export interface TTvShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}
```

---

## 5. Error Handling & HTTP Status Matrix

| Status Code | Reason | Handled Behavior |
|---|---|---|
| `200 OK` | Successful query | TanStack Query caches data with 5-minute `staleTime`. |
| `401 Unauthorized` | Invalid TMDB API key or Bearer token | Logged to console with auth configuration hint; triggers global error boundary. |
| `404 Not Found` | Non-existent Movie, TV, or Person ID | Rendered via custom friendly fallback views with a "Return to Catalog" button. |
| `429 Rate Limit` | Exceeded TMDB request quota | Axios interceptor logs rate-limit event; React Query exponential backoff retries. |
| `500 Server Error` | TMDB upstream downtime | Error boundary caught with `<GlobalError />` retry button. |
