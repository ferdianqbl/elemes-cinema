# Product Requirements Document (PRD)

**Project:** Elemes Cinema — Movie & TV Show Catalog Web App  
**Client / Assessment:** Frontend Developer Technical Test (Middle Level) — Elemes  
**API Source:** [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs)  
**Submission Contact:** `alifa@elemes.id`  
**Status:** Complete / Shipped  
**Version:** 1.0.0  

---

## 1. Executive Summary & Objective

The **Elemes Cinema Catalog** is a modern, responsive, and performance-oriented entertainment web application built to showcase movies, TV series, trailers, and cast profiles sourced from the TMDB API. 

The application is inspired by modern streaming interfaces (Netflix / Coursera style) and provides users with a comprehensive catalog discovery engine, interactive trailer previews, live multi-search, and a persistent local watchlist.

### Key Objectives
- Exceed the minimum requirement of 4 TMDB API endpoints by integrating **10+ distinct endpoints**.
- Deliver a cinema-grade visual experience with dark mode, smooth transitions, and intuitive micro-interactions.
- Provide reliable client-side state persistence for user bookmarking and watchlists without requiring external authentication.
- Implement accessible, semantic, and responsive layouts across all device form factors (mobile, tablet, desktop).

---

## 2. Target Audience & User Personas

| Persona | Motivation | Primary Need |
|---|---|---|
| **Casual Moviegoer** | Quick discovery of what's currently trending in theaters or streaming. | Engaging visual hero banners, simple category tabs, clear ratings. |
| **TV Binge-Watcher** | Keeping track of ongoing series and upcoming season broadcast schedules. | Episode counts, season overviews, airing schedules. |
| **Film Enthusiast** | Deep-diving into directors, cast members, official trailers, and budgets. | High-res trailers, full cast filmography, production metadata. |
| **Planner / Curator** | Saving titles to watch over the weekend without losing data on page reload. | 1-click Watchlist with instant counter badge and browser persistence. |

---

## 3. Comprehensive Feature Scope & Requirements

### 3.1 Home & Discovery Engine (`/`)
- **Featured Hero Banner:** Displays high-resolution backdrop art, Rotten/TMDB star score, release year, overview synopsis, direct trailer link, and 1-click Watchlist toggle.
- **Popular Movies Shelf:** Curated 10-item grid showing current international box office hits.
- **Top Rated TV Shows Shelf:** Curated 10-item grid featuring critically acclaimed series.
- **Trending Cast & Celebrities:** Profile cards of trending actors, directors, and artists with department and known-for badges.
- **Direct Navigation Links:** Quick "View All" action buttons to deep catalog sections.

### 3.2 Movies Catalog & Category Switcher (`/movies`)
- **Category Filter Tabs:**
  - `Popular` (`/movie/popular`)
  - `Top Rated` (`/movie/top_rated`)
  - `Now Playing` (`/movie/now_playing`)
  - `Upcoming` (`/movie/upcoming`)
- **Dynamic Pagination:** Server-side page navigation (Previous / Next / Page Indicator) with scroll-to-top behavior.
- **Card Interactive Features:** Hover zoom, star ratings, release year, movie badges, and instant bookmarking.

### 3.3 Movie Detail View (`/movies/[id]`)
- **Ambient Blurred Backdrop Header:** Dynamic atmospheric gradient behind poster and metadata.
- **Comprehensive Metadata:** Runtime formatted as `Xh Ym`, Budget & Revenue formatted in USD, Original Language, Release Date, Status, Tagline.
- **Genre Badges:** Clickable or tag-style badges.
- **Official YouTube Video Trailer:** Embedded responsive 16:9 iframe player for trailers and teasers.
- **Top 10 Billed Cast:** Actor profile pictures, real names, and character roles.
- **Similar Recommendations Grid:** Up to 5 related movies based on TMDB recommendation algorithms.

### 3.4 TV Shows Catalog & Season Guide (`/tv` & `/tv/[id]`)
- **TV Category Switcher:**
  - `Popular` (`/tv/popular`)
  - `Top Rated` (`/tv/top_rated`)
  - `On The Air` (`/tv/on_the_air`)
  - `Airing Today` (`/tv/airing_today`)
- **TV Series Detail Page:**
  - Total seasons and total episode counts.
  - Creator and showrunner attribution.
  - Series broadcast status (e.g., Returning Series, Ended).
  - Seasons breakdown gallery showing individual season posters and episode counts.
  - Official trailers and recurring cast grid.
  - Similar TV show recommendations.

### 3.5 Global Multi-Search Engine (`/search`)
- **Universal Search Bar:** Accessible from the top navigation bar and the dedicated `/search` page.
- **Live Debounced Querying:** Instant fetching as the user types (minimum 2 characters).
- **Result Filter Tabs:**
  - `All Results`
  - `Movies`
  - `TV Series`
  - `People / Cast`
- **Zero-State Handling:** Contextual feedback when no matches are found with keyword suggestions.

### 3.6 Interactive Watchlist System (`/watchlist`)
- **Local Persistence:** Powered by Zustand with `persist` middleware (`localStorage`).
- **Reactive Navigation Counter:** Badge count in the global navbar updates immediately upon adding/removing items.
- **Filtering by Media Type:** View All, Movies Only, or TV Shows Only.
- **Management Controls:** Individual item delete buttons and a global "Clear All" action.
- **Empty State:** Illustrated empty state encouraging users to explore the catalog.

### 3.7 People & Cast Directory (`/people`)
- **Celebrity Gallery:** Grid of trending actors, directors, and writers.
- **Card Information:** Profile image, known-for department, and top 2 famous works.
- **Pagination Support:** Multi-page browsing of global talent.

---

## 4. TMDB API Endpoint Coverage Matrix

The specification required at least **4 endpoints**. This implementation integrates **12 endpoints**:

| # | Endpoint | Description | Page / Component |
|---|---|---|---|
| 1 | `GET /movie/popular` | Popular movies list | Home, Movies Page |
| 2 | `GET /movie/top_rated` | Top rated movies list | Movies Page |
| 3 | `GET /movie/now_playing` | In-theaters movies | Home (Hero), Movies Page |
| 4 | `GET /movie/upcoming` | Upcoming movie releases | Movies Page |
| 5 | `GET /movie/{id}` | Movie metadata, runtime, budget | Movie Detail (`/movies/[id]`) |
| 6 | `GET /movie/{id}/credits` | Cast & crew filmography | Movie Detail |
| 7 | `GET /movie/{id}/videos` | YouTube trailer teasers | Movie Detail |
| 8 | `GET /movie/{id}/similar` | Related movie suggestions | Movie Detail |
| 9 | `GET /tv/popular` | Popular TV series | TV Page |
| 10 | `GET /tv/top_rated` | Highest rated TV series | Home, TV Page |
| 11 | `GET /tv/on_the_air` | Current on-air TV shows | TV Page |
| 12 | `GET /tv/airing_today` | Shows broadcasting today | TV Page |
| 13 | `GET /tv/{id}` | TV seasons & creator details | TV Detail (`/tv/[id]`) |
| 14 | `GET /person/popular` | Trending actors & creators | Home, People Page |
| 15 | `GET /search/multi` | Unified multi-entity search | Global Search (`/search`) |

---

## 5. Non-Functional & Quality Requirements

- **Performance & Core Web Vitals:** First Contentful Paint (FCP) < 1.2s, Largest Contentful Paint (LCP) < 2.0s, Cumulative Layout Shift (CLS) = 0.
- **Accessibility (A11y):** Keyboard navigable (`Tab`, `Enter`, `Escape`), semantic landmark tags (`<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`), `aria-label` on icon-only buttons.
- **Graceful Loading & Fallbacks:** Custom skeleton shimmer components (`Skeleton`) during data retrieval; placeholder images when posters/avatars are missing from TMDB.
- **Error Handling:** Global `error.tsx` boundary with retry capabilities and network error logging.
- **Responsive Design:** Fluid breakpoints supporting Mobile ($375\text{px} - 640\text{px}$), Tablet ($768\text{px} - 1024\text{px}$), and Desktop ($1280\text{px} - 1920\text{px}$).

---

## 6. Verification & Acceptance Criteria

1. Web app launches cleanly on `npm run dev` with zero runtime console errors.
2. Build generates 100% static & server-rendered pages via `npm run build`.
3. Watchlist items remain saved after browser refreshes or new session tabs.
4. Search results filter seamlessly across Movie, TV, and People categories.
5. Movie & TV detail pages render trailer players, cast lists, and metadata without layout breaks.
