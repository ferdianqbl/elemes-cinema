# TMDB API Integration Documentation

**Project:** Elemes Cinema — Movie & TV Show Catalog Web App  
**API Provider:** [The Movie Database (TMDB) REST API v3 / v4](https://developer.themoviedb.org/docs)  
**Status:** 15 Active Integrated Endpoints  
**Document Path:** `workspace/docs/API_DOCUMENTATION.md`  
**Version:** 1.2.0  

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
* **Used In:** Home Page Popular Shelf, Movies Catalog `/movies` (`?category=popular`)

#### 2. Get Top Rated Movies
* **HTTP Method:** `GET /movie/top_rated`
* **Service Method:** `MovieService.getTopRated(params?: PaginationParams)`
* **Query Params:** `page` (default: 1)
* **Response Type:** `TMDBResponse<TMovie>`
* **Used In:** Movies Catalog `/movies` (`?category=top_rated`)

#### 3. Get Now Playing Movies
* **HTTP Method:** `GET /movie/now_playing`
* **Service Method:** `MovieService.getNowPlaying(params?: PaginationParams)`
* **Query Params:** `page` (default: 1)
* **Response Type:** `TMDBResponse<TMovie>`
* **Used In:** Home Featured Hero Banner, Movies Catalog `/movies` (`?category=now_playing`)

#### 4. Get Upcoming Movies
* **HTTP Method:** `GET /movie/upcoming`
* **Service Method:** `MovieService.getUpcoming(params?: PaginationParams)`
* **Query Params:** `page` (default: 1)
* **Response Type:** `TMDBResponse<TMovie>`
* **Used In:** Movies Catalog `/movies` (`?category=upcoming`)

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
* **Response Type:** `VideoResponse`
* **Used In:** Movie Detail Page `/movies/[id]` Interactive YouTube Player

#### 8. Get Similar Movies
* **HTTP Method:** `GET /movie/{movie_id}/similar`
* **Service Method:** `MovieService.getSimilar(movieId: number | string)`
* **Response Type:** `TMDBResponse<TMovie>`
* **Used In:** Movie Detail Page `/movies/[id]` Recommendations Shelf

---

### 3.2 TV Shows Domain (`TvService`)

#### 9. Get Popular TV Shows
* **HTTP Method:** `GET /tv/popular`
* **Service Method:** `TvService.getPopular(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TTvShow>`
* **Used In:** TV Catalog `/tv` (`?category=popular`)

#### 10. Get Top Rated TV Shows
* **HTTP Method:** `GET /tv/top_rated`
* **Service Method:** `TvService.getTopRated(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TTvShow>`
* **Used In:** Home Page Top Rated Shelf, TV Catalog `/tv` (`?category=top_rated`)

#### 11. Get TV Shows On The Air
* **HTTP Method:** `GET /tv/on_the_air`
* **Service Method:** `TvService.getOnTheAir(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TTvShow>`
* **Used In:** TV Catalog `/tv` (`?category=on_the_air`)

#### 12. Get TV Shows Airing Today
* **HTTP Method:** `GET /tv/airing_today`
* **Service Method:** `TvService.getAiringToday(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TTvShow>`
* **Used In:** TV Catalog `/tv` (`?category=airing_today`)

#### 13. Get TV Show Details
* **HTTP Method:** `GET /tv/{series_id}`
* **Service Method:** `TvService.getDetails(tvId: number | string)`
* **Response Type:** `TTvShowDetail`
* **Used In:** TV Detail Page `/tv/[id]` (Seasons Breakdown, Production Studios)

---

### 3.3 People & Celebrities Domain (`PeopleService`)

#### 14. Get Popular People
* **HTTP Method:** `GET /person/popular`
* **Service Method:** `PeopleService.getPopular(params?: PaginationParams)`
* **Response Type:** `TMDBResponse<TPerson>`
* **Used In:** Home Trending Stars Shelf, People Directory `/people`

#### 15. Get Person Details & Filmography
* **HTTP Method:** `GET /person/{person_id}` & `GET /person/{person_id}/combined_credits`
* **Service Methods:** `PeopleService.getDetails`, `PeopleService.getCombinedCredits`
* **Used In:** Person Profile Page `/people/[id]`

---

### 3.4 Multi-Search Domain (`SearchService`)

#### 16. Multi-Search Catalog
* **HTTP Method:** `GET /search/multi`
* **Service Method:** `SearchService.multiSearch(query: string, page?: number)`
* **Query Params:** `query` (URL encoded string), `page`
* **Response Type:** `TMDBResponse<SearchResultItem>`
* **Used In:** Quick Search Dialog `⌘K`, Dedicated Search Engine `/search`

---

## 4. Architectural Evaluation: TMDB Account Watchlist vs. LocalStorage

The TMDB API specification provides an account watchlist endpoint:
`POST https://api.themoviedb.org/3/account/{account_id}/watchlist`

### Endpoint Specification & Prerequisites
- **Path Parameter:** `{account_id}`
- **Query Parameter:** `session_id` (or v4 User Access Token)
- **Request Body:**
  ```json
  {
    "media_type": "movie",
    "media_id": 550,
    "watchlist": true
  }
  ```

### Why Elemes Cinema Uses Zustand + LocalStorage
1. **Elimination of Evaluator Friction:**
   - The TMDB endpoint mandates a 3-Legged OAuth redirection flow (`/authentication/token/new` ➔ redirect to `themoviedb.org/authenticate` ➔ `/authentication/session/new`).
   - Technical test reviewers assessing this project would be blocked from testing bookmarking without personal TMDB accounts.
2. **User Data Isolation:**
   - Providing a shared server session ID would force all global visitors to share the same watchlist, overwriting each other's selections. LocalStorage guarantees 100% data isolation.
3. **Extended Offline-First Feature Capabilities:**
   - Client storage allows instant 0ms optimistic updates, zero rate-limit hazards, and custom fields not supported by TMDB (such as "Want to Watch" vs "Watched" status toggles, and reactive cinephile watch-time analytics).

---

## 5. TypeScript Interface Contracts

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

## 6. Error Handling & HTTP Status Matrix

| Status Code | Reason | Handled Behavior |
|---|---|---|
| `200 OK` | Successful query | TanStack Query caches data with 5-minute `staleTime`. |
| `401 Unauthorized` | Invalid TMDB API key or Bearer token | Logged to console with auth configuration hint; triggers global error boundary. |
| `404 Not Found` | Non-existent Movie, TV, or Person ID | Rendered via custom friendly fallback views with a "Return to Catalog" button. |
| `429 Rate Limit` | Exceeded TMDB request quota | Axios interceptor logs rate-limit event; React Query exponential backoff retries. |
| `500 Server Error` | TMDB upstream downtime | Error boundary caught with `<GlobalError />` retry button. |
