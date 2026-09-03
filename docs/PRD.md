# Product Requirements Document (PRD)

**Project:** Elemes Cinema — Movie & TV Show Catalog Web App  
**Client / Assessment:** Frontend Developer Technical Test (Middle Level) — Elemes  
**API Source:** [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs)  
**Submission Contact:** `alifa@elemes.id`  
**Status:** Complete / Shipped  
**Version:** 1.2.0  

---

## 1. Executive Summary & Objective

The **Elemes Cinema Catalog** is a modern, responsive, and performance-oriented entertainment web application built to showcase movies, TV series, trailers, and cast profiles sourced from the TMDB API. 

The application is inspired by modern streaming interfaces (Apple TV+ / Netflix / Letterboxd Pro) and provides users with a comprehensive catalog discovery engine, interactive trailer previews, live multi-search, a persistent local watchlist with cinephile analytics, and a native mobile application experience with a fixed bottom dock.

### Key Objectives
- Exceed the minimum requirement of 4 TMDB API endpoints by integrating **15 distinct endpoints**.
- Deliver a cinema-grade visual experience with pure black canvas (`#000000`), electric cyan highlights (`#00E5FF`), smooth spring layout animations (`motion`), and tactile touch micro-interactions.
- Provide reliable client-side state persistence for user bookmarking and watchlists without requiring external authentication or 3-legged OAuth friction.
- Deliver an authentic Native Mobile App experience with bottom dock navigation, safe-area inset support, and horizontal touch-scrollable category chips.
- Maintain a 100% automated test pass rate across unit tests (**45 tests**) and end-to-end browser tests (**26 tests**).

---

## 2. Target Audience & User Personas

| Persona | Motivation | Primary Need |
|---|---|---|
| **Casual Moviegoer** | Quick discovery of what's currently trending in theaters or streaming. | Engaging visual hero banners, simple category tabs, clear ratings. |
| **TV Binge-Watcher** | Keeping track of ongoing series and upcoming season broadcast schedules. | Episode counts, season overviews, airing schedules. |
| **Film Enthusiast** | Deep-diving into directors, cast members, official trailers, and budgets. | High-res trailers, full cast filmography, production metadata. |
| **Planner / Curator** | Saving titles to watch over the weekend without losing data on page reload. | 1-click Watchlist with instant counter badge, watched status tracking, and browser persistence. |
| **Mobile User** | Browsing the catalog comfortably on smartphones with one thumb. | Native bottom dock navigation, swipeable category chips, tactile touch feedback. |

---

## 3. Comprehensive Feature Scope & Requirements

### 3.1 Home & Discovery Engine (`/`)
- **Featured Hero Banner:** High-resolution backdrop art, Rotten/TMDB star score, release year, overview synopsis, direct details link, and 1-click Watchlist toggle.
- **Popular Movies Shelf:** Curated 10-item grid showing current international box office hits.
- **Top Rated TV Shows Shelf:** Curated widescreen cards featuring critically acclaimed series.
- **Trending Cast & Celebrities:** Profile cards of trending actors, directors, and creators with department and known-for badges.
- **Direct Navigation Links:** Quick "View All" action buttons to deep catalog sections.

### 3.2 Movies Catalog & Category Switcher (`/movies`)
- **URL Query Parameter Synchronization:** Tabs sync with `?category=` (`popular`, `top_rated`, `now_playing`, `upcoming`), supporting browser back/forward and deep linking.
- **Direct Navbar Activation:** Clicking specific categories in the desktop navbar dropdown or mobile drawer directly activates the corresponding tab.
- **Fluid Spring Animation:** Powered by `motion/react`, the active tab pill glides seamlessly between categories using spring physics (`layoutId="activeMovieTabIndicator"`).
- **Smooth Content Transitions:** Category grid changes cross-fade and translate smoothly via `<AnimatePresence>`.
- **Mobile Touch-Scroll Shelf:** On mobile devices, category pills scroll horizontally with momentum (`overflow-x-auto no-scrollbar flex-nowrap`) to prevent awkward line wrapping.
- **Dynamic Pagination:** Page navigation with Previous / Next / Page Indicator and automatic page resets on category change.

### 3.3 Movie Detail View (`/movies/[id]`)
- **Cinematic Backdrop Header:** Full-bleed cinematic backdrop banner with atmospheric vignette gradients seamlessly blending into the canvas.
- **Elevated Floating Poster:** 3D elevated floating movie poster (`shadow-2xl shadow-black border-2 border-white/15`).
- **Minimalist Movie Facts Grid:** 4 clean, authentic TMDB data tiles (Release Date, Original Language, Budget, Worldwide Revenue in USD).
- **Interactive Actions:** Full-width "Add to Watchlist" toggle, "Watch Trailer" anchor jump, and Official Website link.
- **Official YouTube Video Trailer:** Embedded responsive 16:9 iframe player for trailers and teasers.
- **Top 10 Billed Cast:** Actor profile pictures, real names, and character roles.
- **Similar Recommendations Grid:** Up to 5 related movies based on TMDB recommendation algorithms.

### 3.4 TV Shows Catalog & Season Guide (`/tv` & `/tv/[id]`)
- **URL Query Parameter Synchronization:** Tabs sync with `?category=` (`popular`, `top_rated`, `on_the_air`, `airing_today`).
- **Mobile Touch-Scroll Shelf & Spring Tabs:** Identical smooth spring pill animations and mobile touch scrollability.
- **TV Series Detail Page:**
  - Total seasons and total episode counts.
  - Production studios attribution.
  - Series broadcast status (e.g., Returning Series, Ended).
  - Seasons breakdown gallery with season posters, release dates, and episode counts.
  - Official trailers, recurring cast grid, and similar TV recommendations.

### 3.5 Global Multi-Search Engine (`/search` & Quick `⌘K` Modal)
- **Universal Search Bar:** Accessible from the top navigation bar, dedicated `/search` page, and mobile bottom tab bar.
- **Live Debounced Querying:** Instant fetching as the user types (minimum 2 characters, 350ms debounce).
- **Result Filter Tabs:** `All Results`, `Movies`, `TV Series`, `People / Cast`.
- **Zero-State Handling:** Contextual feedback when no matches are found with keyword suggestions.

### 3.6 Interactive Watchlist System with Analytics (`/watchlist`)
- **Local Persistence:** Powered by Zustand with `persist` middleware (`localStorage`).
- **Hydration Skeleton Loader:** Custom `WatchlistSkeleton` and Next.js streaming `loading.tsx` display during Zustand rehydration, eliminating jarring flashes of "Watchlist is empty".
- **Cinephile Analytics Dashboard:** 4 reactive metrics derived directly from saved item data:
  - Total Saved Items
  - Watched Completion Rate (%)
  - Average TMDB Critic Rating
  - Total Watch Time (Hours & Minutes)
- **Status Filtering & Toggle:** Mark individual items as "Want to Watch" vs "Watched", with filter tabs (`All`, `Want to Watch`, `Watched`).
- **Dual View Modes:** Toggle between Poster Grid view and compact Filmstrip List view.
- **Reactive Navigation Counter:** Live badge count in both the desktop navbar and mobile bottom dock.
- **Architectural Decision Note:** *See Section 4.1 for why client-side LocalStorage is preferred over TMDB's 3-legged OAuth `/3/account/{account_id}/watchlist` endpoint.*

### 3.7 People & Cast Directory (`/people` & `/people/[id]`)
- **Celebrity Gallery:** Grid of trending actors, directors, and writers.
- **Card Information:** Profile image, known-for department, and top 2 famous works.
- **Profile Detail View:** Full biography, birthplace, birthday, aliases, and comprehensive filmography grid.

### 3.8 Native Mobile App Experience (`<MobileTabBar />`)
- **Fixed Bottom Navigation Dock:** Always accessible at the bottom of the screen on mobile devices (`< 768px`).
- **5 Core Thumb-Reachable Tabs:** Home, Movies, TV Series, Search (opens Command Modal), and Watchlist (with badge).
- **Safe-Area Insets:** Supports `pb-[max(env(safe-area-inset-bottom),8px)]` for bezel-less modern smartphones.
- **Haptic Touch Micro-interactions:** `active:scale-90` tactile feedback on tab press.
- **Compact Top App Bar:** Sleek `h-14` header keeping the viewport uncluttered.
- **No Content Collision:** Main layout includes `pb-24 md:pb-8` to ensure no UI or pagination elements are hidden behind the bottom dock.

---

## 4. TMDB API Endpoint Coverage Matrix

The specification required at least **4 endpoints**. This implementation integrates **15 endpoints**:

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

### 4.1 Architectural Decision Record: Watchlist Storage Strategy
> **Question:** *Why use Zustand + `localStorage` instead of TMDB's `POST /3/account/{account_id}/watchlist` endpoint?*
>
> **Rationale:**
> 1. **Zero Authentication Friction for Reviewers:** TMDB's account watchlist endpoint requires a `session_id` obtained via 3-Legged OAuth (redirecting to themoviedb.org for personal login). Assessors reviewing the tech test would be blocked unless they held personal TMDB credentials.
> 2. **User Data Isolation:** Hardcoding a shared API session would cause all visitors worldwide to share and overwrite the exact same watchlist. LocalStorage guarantees 100% private, isolated data per device.
> 3. **Offline & Instant State:** Local storage provides 0ms latency, zero rate-limit risks, and supports extended features (such as "Plan to Watch" vs "Watched" status and watch-time analytics) not natively offered by TMDB.

---

## 5. Non-Functional & Quality Requirements

- **Performance & Core Web Vitals:** Next.js Turbopack compilation under 2s; all images have explicit responsive `sizes` and `loading="eager"` / `priority` on above-the-fold banners to eliminate LCP warnings.
- **Accessibility (A11y):** Keyboard navigable (`Tab`, `Enter`, `Escape`), semantic landmark tags (`<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`), `aria-label` on all icon-only buttons.
- **Graceful Loading & Fallbacks:** Dedicated route `loading.tsx` skeletons and in-component shimmer skeletons.
- **Error Handling:** Global `error.tsx` boundary with retry capabilities.
- **Responsive Design:** Fluid breakpoints supporting Mobile ($375\text{px} - 640\text{px}$), Tablet ($768\text{px} - 1024\text{px}$), and Desktop ($1280\text{px} - 1920\text{px}$).

---

## 6. Verification & Acceptance Criteria

1. Web app launches cleanly on `npm run dev` with zero runtime console errors.
2. Build generates 100% static & server-rendered pages via `npm run build` (0 TypeScript errors).
3. All **45 Vitest unit tests** pass successfully via `npm run test`.
4. All **26 Playwright E2E tests** pass across Chromium Desktop and Mobile Chrome via `npm run test:e2e`.
5. Watchlist items remain saved after browser refreshes or new session tabs.
6. Mobile bottom navigation dock displays on mobile viewports and navigates seamlessly.

---

## 7. Related Technical Documents

- [🏛️ System Architecture Blueprint (`docs/ARCHITECTURE.md`)](./ARCHITECTURE.md)
- [📡 TMDB API Integration Reference (`docs/API_DOCUMENTATION.md`)](./API_DOCUMENTATION.md)
- [🎨 Elemes Cinema Design System — Midnight Cyan (`docs/DESIGN_SYSTEM.md`)](./DESIGN_SYSTEM.md)
- [🧪 Feature Validations & Testing Guide (`docs/FEATURE_VALIDATIONS.md`)](./FEATURE_VALIDATIONS.md)
