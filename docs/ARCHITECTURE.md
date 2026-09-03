# Architecture & Technical Blueprint

**Project:** Elemes — Movie & TV Show Catalog Web App  
**Architecture Pattern:** Feature-Driven Domain Modular Architecture  
**Target Platform:** Next.js 16 (App Router) + React 19 + TypeScript  
**Design System:** Tailwind CSS v4 + shadcn/ui + Motion  
**Version:** 1.3.0  

---

## 1. Architectural Philosophy

The application follows the **Feature-Driven Modular Architecture** (inspired by the **AruSaku** ecosystem standards). Rather than grouping files by type (e.g., all hooks in one folder, all services in another), code is primarily organized around business domains (`movies`, `tv`, `people`, `search`, `watchlist`).

### Core Principles
1. **Separation of Concerns:** Distinct separation between network communication (`services/`), server state caching (`hooks/`), domain contracts (`types/`), and presentation (`components/`).
2. **Server-Client Hybrid Pattern:** Next.js App Router layout and pages orchestrate client interactive hooks with SSR optimization.
3. **URL-Synchronized State:** Deeply linkable category states via query strings (`?category=...`), guarded by `<Suspense>` boundaries to preserve static optimization.
4. **Deterministic Query Keys:** Centralized query key factories ensuring zero cache collisions and predictable invalidations.
5. **Resilient HTTP Interceptors:** Axios client with token fallback and automatic **Exponential Backoff & Jitter** retry for 429 rate limits and 5xx server errors.
6. **Zero-Friction Local State:** Zustand store with transparent `localStorage` serialization, hydration guards, and zero-flash skeleton loaders.
7. **Reversible User Interactions:** Sonner toast notification stack with an "Undo" action on watchlist state modifications.
8. **Native-Grade Mobile Ergonomics:** Bottom dock navigation (`<MobileTabBar />`), safe-area insets, touch-scrollable shelves, and haptic tap micro-interactions.

---

## 2. Technology Stack Breakdown

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 16 + React 19                    │
│                      (App Router & RSC)                     │
└──────────────────────────────┬──────────────────────────────┘
                               │
        ┌──────────────────────┼───────────────────────┐
        ▼                      ▼                       ▼
 ┌──────────────┐      ┌──────────────┐        ┌──────────────┐
 │  Tailwind v4 │      │  TanStack Q5 │        │  Zustand v5  │
 │  + shadcn/ui │      │ (Async SWR & │        │ (Watchlist & │
 │  + Motion    │      │  5m Cache)   │        │   UI State)  │
 └──────────────┘      └───────┬──────┘        └──────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │ Axios Client │
                        │(Auth & Retry)│
                        └───────┬──────┘
                               │
                               ▼
                        ┌──────────────┐
                        │   TMDB API   │
                        │(17 Endpoints)│
                        └──────────────┘
```

| Layer | Technology | Purpose & Rationale |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | High-performance routing, automatic code splitting, optimized static generation, and font/image optimization via Turbopack. |
| **UI Library** | React 19 | Modern React architecture with improved hydration, transitions, and concurrent rendering. |
| **Language** | TypeScript 5 (Strict) | Compile-time type safety, exhaustive interfaces for all TMDB entities, eliminating runtime `undefined` bugs. |
| **Styling** | Tailwind CSS v4 | Cutting-edge CSS engine (`@theme inline`), zero-runtime CSS footprint, and dark cinema theme variables. |
| **Component Kit** | shadcn/ui (Base UI) | Accessible, unstyled primitives customized for cinema UI (Dialog, NavigationMenu, Drawer, Button, Badge, Skeleton, Tooltip). |
| **Animations** | Motion (`motion/react`) | Fluid spring physics layout animations (`layoutId="activeMovieTabIndicator"`), cross-fades, and carousel transitions. |
| **Toasts** | Sonner | Performant dark-themed toast notifications with integrated action buttons. |
| **Data Fetching** | TanStack React Query v5 | Automatic background refetching, 5-minute stale-time caching, window focus controls, and query devtools. |
| **HTTP Client** | Axios | Request interceptor for Bearer Token / API Key injection and response interceptor for exponential backoff retries. |
| **Client State** | Zustand v5 + `persist` | Lightweight global state for watchlists (stored in `localStorage`) and UI modal toggles without context re-render overhead. |
| **Iconography** | Lucide React | Clean, ultra-light line icons matching modern streaming aesthetic. |

---

## 3. Directory Structure & Module Responsibilities

```
workspace/
├── docs/                                  # Project documentation & test matrices
│   ├── PRD.md                             # Product Requirements Document
│   ├── ARCHITECTURE.md                    # This architecture document
│   ├── API_DOCUMENTATION.md               # TMDB API Integration & Endpoints Reference
│   ├── DESIGN_SYSTEM.md                   # Elemes Design System (Midnight Cyan)
│   └── FEATURE_VALIDATIONS.md             # Quality assurance and validation guide
├── e2e/                                   # Playwright End-to-End Test Suite (26 tests)
│   ├── home.spec.ts                       # Home, discovery shelves, & mobile bottom nav tests
│   ├── movies.spec.ts                     # Movies catalog, URL query tabs, & detail tests
│   ├── tv.spec.ts                         # TV catalog, URL query tabs, & seasons guide tests
│   ├── search.spec.ts                     # Multi-search & ⌘K modal tests
│   └── watchlist.spec.ts                  # LocalStorage watchlist persistence tests
├── public/                                # Public static assets & default placeholders
├── src/
│   ├── app/                               # Next.js App Router Route Tree
│   │   ├── layout.tsx                     # Global Root Layout (QueryProvider, Nav, MobileTabBar, Toaster, Footer)
│   │   ├── globals.css                    # Tailwind v4 theme variables, .no-scrollbar & base styles
│   │   ├── page.tsx                       # Home page (Premiere Carousel, curated shelves)
│   │   ├── movies/
│   │   │   ├── page.tsx                   # Movies Catalog (URL query tabs, genre chips, spring indicator & pagination)
│   │   │   └── [id]/page.tsx              # Movie Details (cinematic backdrop, floating poster, facts grid, watch providers)
│   │   ├── tv/
│   │   │   ├── page.tsx                   # TV Shows Catalog (URL query tabs, genre chips, spring indicator & pagination)
│   │   │   └── [id]/page.tsx              # TV Show Details (seasons, episodes, cast, watch providers)
│   │   ├── people/
│   │   │   ├── page.tsx                   # Trending celebrities gallery
│   │   │   └── [id]/page.tsx              # Actor profile, biography, & filmography
│   │   ├── search/
│   │   │   └── page.tsx                   # Live multi-search engine
│   │   ├── watchlist/
│   │   │   ├── page.tsx                   # User's saved watchlist view with Cinephile Analytics
│   │   │   └── loading.tsx                # Streaming route skeleton loader
│   │   ├── loading.tsx                    # Global route loading skeleton
│   │   ├── error.tsx                      # Route error boundary
│   │   └── not-found.tsx                  # 404 page
│   │
│   ├── components/                        # Shared UI Components
│   │   ├── ui/                            # shadcn/ui primitives + watch-providers.tsx, rating-badge.tsx
│   │   └── layout/                        # Layout chrome (navbar, mobile-tab-bar, footer, section-header)
│   │
│   ├── features/                          # Feature Domain Modules (aruSaku pattern)
│   │   ├── movies/
│   │   │   ├── components/                # movie-card.tsx, movie-grid.tsx, movie-hero.tsx
│   │   │   ├── hooks/use-movies.ts        # usePopularMovies, useMovieDetails, useMovieWatchProviders, useMoviesByGenre
│   │   │   ├── services/movie.service.ts  # Axios API calls to TMDB movie routes (including providers & discover)
│   │   │   └── types/movie.types.ts       # TMovie, TMovieDetail, MovieCategory
│   │   ├── tv/
│   │   │   ├── components/                # tv-card.tsx, tv-grid.tsx, tv-widescreen-card.tsx
│   │   │   ├── hooks/use-tv.ts            # usePopularTv, useTvDetail, useTvWatchProviders, useTvByGenre
│   │   │   ├── services/tv.service.ts     # Axios API calls to TMDB TV routes (including providers & discover)
│   │   │   └── types/tv.types.ts          # TTvShow, TTvShowDetail, TvCategory
│   │   ├── people/                        # Popular stars and filmography
│   │   ├── search/                        # Multi-search service and dialog
│   │   └── watchlist/                     # Watchlist button with toast & undo, metrics analytics view
│   │
│   ├── lib/                               # Global Utilities & Clients
│   │   ├── axios.ts                       # Axios client with auth interceptor and exponential backoff retry
│   │   ├── constants.ts                   # Navigation routes, categories, and site constants
│   │   ├── tmdb.ts                        # TMDB image URL resolution and YouTube embed helpers
│   │   └── utils.ts                       # Currency, date, runtime formatters and cn helper
│   ├── store/                             # Global Client Stores (Zustand)
│   │   ├── use-watchlist-store.ts         # Persistent watchlist store with LocalStorage sync
│   │   └── use-ui-store.ts                # Search modal and mobile drawer toggles
│   └── types/                             # TypeScript Type Definitions
```

---

## 4. Key Architectural Patterns & Decisions

### 4.1 Resilient Network Layer (Exponential Backoff & Jitter)
Idempotent GET requests in `src/lib/axios.ts` catch HTTP 429 (Rate Limit) and 5xx (Server Error) responses:
```typescript
const baseDelay = 1000 * Math.pow(2, config._retryCount - 1);
const jitter = Math.random() * 250;
await new Promise((resolve) => setTimeout(resolve, baseDelay + jitter));
return apiClient(config);
```
This protects user experiences against temporary TMDB service hiccups or rate limiting spikes.

### 4.2 Multi-Slide Premiere Hero Carousel (`<MovieHero />`)
- **Stateful Slides:** Accepts an array of top premiere titles (`TMovie[]`).
- **Smooth Auto-Rotation:** 7-second timer with automatic pause on mouse hover.
- **Hardware-Accelerated Transitions:** Powered by `<AnimatePresence>` and `motion.div` for buttery cross-fade transitions.
- **Micro-Pagination:** Bottom-right interactive dot indicators and hover side chevrons for desktop discovery.

### 4.3 Where to Watch Streaming Providers (`<WatchProviders />`)
- Queries TMDB's official `/watch/providers` API.
- Prioritizes Indonesian region (`ID`), falling back to `US` or first available country code.
- Displays subscription platforms (Netflix, Disney+, Prime Video, Apple TV) with crisp rounded badges and accessible tooltips.
- Provides an external deep link to JustWatch.

### 4.4 Quick Genre Discovery Shelf
- Sits seamlessly below the category tabs on `/movies` and `/tv`.
- Allows instant genre filtering (`/discover/movie?with_genres=...`) without losing navigation context.
- Styled as a smooth, horizontal swipeable shelf (`no-scrollbar`).

### 4.5 Native Mobile App Architecture (`<MobileTabBar />`)
- Rendered in root layout with `fixed bottom-0 z-50 md:hidden`.
- Safe Area Handling: `pb-[max(env(safe-area-inset-bottom),8px)]` ensures seamless presentation on modern iPhones and Android devices.
- Layout Spacing: `<main>` incorporates `pb-24 md:pb-8` to guarantee zero overlap with scrollable content, cards, and pagination buttons.
- Touch Shelves: Category and genre filters on mobile use `.no-scrollbar` with momentum swipe scrolling (`overflow-x-auto`).

---

## 5. Testing & Code Quality Blueprint

### Code Coverage Metrics (Vitest v8)
```
% Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Status
-------------------|---------|----------|---------|---------|-------------------
All files          |   92.21 |    83.33 |   90.32 |   92.21 | PASSED (>90%)
 components/layout |     100 |      100 |     100 |     100 | PASSED
 components/ui     |   78.33 |    59.09 |     100 |   78.33 | PASSED
 movies/services   |     100 |      100 |     100 |     100 | PASSED
 people/services   |     100 |      100 |     100 |     100 | PASSED
 tv/services       |   94.04 |      100 |    90.9 |   94.04 | PASSED
 hooks             |     100 |      100 |     100 |     100 | PASSED
 lib               |   98.28 |       90 |    92.3 |   98.28 | PASSED
 store             |   95.83 |       90 |     100 |   95.83 | PASSED
-------------------|---------|----------|---------|---------|-------------------
```

- **Vitest Unit Suite:** **64 passing tests** across 14 test suites verifying formatters, analytics, TMDB URL builders, debounce hooks, rating badges, watch providers, footer, and Zustand state mutations.
- **Playwright E2E Suite:** **26 passing tests** across Chromium Desktop and Mobile Chrome simulating realistic user discovery, query navigation, and watchlist persistence.
