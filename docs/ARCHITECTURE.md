# Architecture & Technical Blueprint

**Project:** Elemes Cinema — Movie & TV Show Catalog Web App  
**Architecture Pattern:** Feature-Driven Domain Modular Architecture  
**Target Platform:** Next.js 16 (App Router) + React 19 + TypeScript  
**Design System:** Tailwind CSS v4 + shadcn/ui + Motion  
**Version:** 1.2.0  

---

## 1. Architectural Philosophy

The application follows the **Feature-Driven Modular Architecture** (inspired by the **AruSaku** ecosystem standards). Rather than grouping files by type (e.g., all hooks in one folder, all services in another), code is primarily organized around business domains (`movies`, `tv`, `people`, `search`, `watchlist`).

### Core Principles
1. **Separation of Concerns:** Distinct separation between network communication (`services/`), server state caching (`hooks/`), domain contracts (`types/`), and presentation (`components/`).
2. **Server-Client Hybrid Pattern:** Next.js App Router layout and pages orchestrate client interactive hooks with SSR optimization.
3. **URL-Synchronized State:** Deeply linkable category states via query strings (`?category=...`), guarded by `<Suspense>` boundaries to preserve static optimization.
4. **Deterministic Query Keys:** Centralized query key factories ensuring zero cache collisions and predictable invalidations.
5. **Resilient HTTP Interceptors:** Axios client with token fallback and uniform error trapping.
6. **Zero-Friction Local State:** Zustand store with transparent `localStorage` serialization, hydration guards, and zero-flash skeleton loaders.
7. **Native-Grade Mobile Ergonomics:** Bottom dock navigation (`<MobileTabBar />`), safe-area insets, touch-scrollable shelves, and haptic tap micro-interactions.

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
                       │ (TMDB Auth)  │
                       └───────┬──────┘
                               │
                               ▼
                       ┌──────────────┐
                       │   TMDB API   │
                       │ (Remote REST)│
                       └──────────────┘
```

| Layer | Technology | Purpose & Rationale |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | High-performance routing, automatic code splitting, optimized static generation, and font/image optimization via Turbopack. |
| **UI Library** | React 19 | Modern React architecture with improved hydration, transitions, and concurrent rendering. |
| **Language** | TypeScript 5 (Strict) | Compile-time type safety, exhaustive interfaces for all TMDB entities, eliminating runtime `undefined` bugs. |
| **Styling** | Tailwind CSS v4 | Cutting-edge CSS engine (`@theme inline`), zero-runtime CSS footprint, and dark cinema theme variables. |
| **Component Kit** | shadcn/ui (Base UI) | Accessible, unstyled primitives customized for cinema UI (Dialog, NavigationMenu, Drawer, Button, Badge, Skeleton). |
| **Animations** | Motion (`motion/react`) | Fluid spring physics layout animations (`layoutId="activeMovieTabIndicator"`), cross-fades, and mobile indicators. |
| **Data Fetching** | TanStack React Query v5 | Automatic background refetching, 5-minute stale-time caching, window focus controls, and query devtools. |
| **HTTP Client** | Axios | Request/Response interceptors for Bearer Token (`v4`) / API Key (`v3`) injection and unified logging. |
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
│   ├── DESIGN_SYSTEM.md                   # Elemes Cinema Design System (Midnight Cyan)
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
│   │   ├── layout.tsx                     # Global Root Layout (QueryProvider, Nav, MobileTabBar, Footer)
│   │   ├── globals.css                    # Tailwind v4 theme variables, .no-scrollbar & base styles
│   │   ├── page.tsx                       # Home page (Hero, curated shelves)
│   │   ├── movies/
│   │   │   ├── page.tsx                   # Movies Catalog (URL query tabs, spring indicator & pagination)
│   │   │   └── [id]/page.tsx              # Movie Details (cinematic backdrop, floating poster, facts grid)
│   │   ├── tv/
│   │   │   ├── page.tsx                   # TV Shows Catalog (URL query tabs, spring indicator & pagination)
│   │   │   └── [id]/page.tsx              # TV Show Details (seasons, episodes, cast, studios)
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
│   │   ├── ui/                            # shadcn/ui primitives (button, badge, dialog, drawer, skeleton)
│   │   └── layout/                        # Layout chrome (navbar, mobile-tab-bar, footer, section-header)
│   │
│   ├── features/                          # Feature Domain Modules (aruSaku pattern)
│   │   ├── movies/
│   │   │   ├── components/                # movie-card.tsx, movie-grid.tsx, movie-hero.tsx
│   │   │   ├── hooks/use-movies.ts        # usePopularMovies, useMovieDetails, etc.
│   │   │   ├── services/movie.service.ts  # Axios API calls to TMDB movie routes
│   │   │   └── types/movie.types.ts       # TMovie, TMovieDetail, MovieCategory
│   │   │
│   │   ├── tv/
│   │   │   ├── components/                # tv-card.tsx, tv-grid.tsx, tv-widescreen-card.tsx
│   │   │   ├── hooks/use-tv.ts            # usePopularTv, useTvDetail, etc.
│   │   │   ├── services/tv.service.ts     # Axios API calls to TMDB TV routes
│   │   │   └── types/tv.types.ts          # TTvShow, TTvShowDetail, TvCategory
│   │   │
│   │   ├── people/
│   │   │   ├── components/                # person-card.tsx
│   │   │   ├── hooks/use-people.ts        # usePopularPeople, usePersonDetail, usePersonCombinedCredits
│   │   │   ├── services/people.service.ts # Axios API calls to TMDB people routes
│   │   │   └── types/people.types.ts      # TPerson, TPersonDetail, PersonCombinedCredits
│   │   │
│   │   ├── search/
│   │   │   ├── components/search-modal.tsx# Quick ⌘K command palette modal
│   │   │   ├── hooks/use-search.ts        # useMultiSearch
│   │   │   ├── services/search.service.ts # Axios calls for TMDB multi-search
│   │   │   └── types/search.types.ts      # SearchResultItem, SearchParams
│   │   │
│   │   └── watchlist/
│   │       ├── components/                # watchlist-button.tsx, watchlist-view.tsx (with WatchlistSkeleton)
│   │       └── store/                     # (points to use-watchlist-store.ts)
│   │
│   ├── lib/                               # Core Infrastructure Utilities
│   │   ├── analytics.ts                   # Cinephile analytics calculator (watch-time, ratings, counts)
│   │   ├── axios.ts                       # Configured Axios instance with interceptors
│   │   ├── tmdb.ts                        # TMDB image sizing & video URL builders
│   │   ├── constants.ts                   # Navigation links, genres dictionary, categories
│   │   └── utils.ts                       # cn() class merger, currency, date, runtime formatters
│   │
│   ├── providers/                         # Context Providers
│   │   └── query-provider.tsx             # TanStack Query Client with 5m stale-time
│   │
│   ├── store/                             # Global Zustand Stores
│   │   ├── use-watchlist-store.ts         # Persistent watchlist store with LocalStorage sync
│   │   └── use-ui-store.ts                # Search modal state
│   │
│   └── types/                             # Global Cross-Cutting Type Definitions
│       ├── api.types.ts                   # TMDBResponse<T>, PaginationParams, TMDBErrorResponse
│       └── common.types.ts                # MediaType, Genre, CreditsResponse, VideoResponse
│
├── .env.example                           # Environment variable schema
├── .env.local                             # Local secrets (gitignored)
├── components.json                        # shadcn/ui configuration file
├── next.config.ts                         # Next.js image domain configuration
├── package.json                           # Dependencies & scripts
├── postcss.config.mjs                     # Tailwind v4 PostCSS plugin
└── tsconfig.json                          # TypeScript configuration with @/* path aliases
```

---

## 4. Key Subsystem Architectures

### 4.1 URL Query Synchronization Pattern
To enable deep linking, browser bookmarking, and seamless navigation from both top dropdown menus and mobile drawer shortcuts, category states are bound directly to the URL:
- Route: `/movies?category=now_playing` or `/tv?category=top_rated`
- Next.js Suspense Guard: Reading `useSearchParams()` inside client pages is wrapped within `<Suspense fallback={<PageSkeleton />}>` to avoid de-optimizing the route.
- Active Indicator Spring Animation: When the query parameter updates, `motion.span` with `layoutId` calculates layout deltas and animates the active pill with spring physics.

### 4.2 Native Mobile App Architecture (`<MobileTabBar />`)
Mobile users receive a dedicated thumb-reachable dock:
- Dock Mounting: Rendered in root layout with `fixed bottom-0 z-50 md:hidden`.
- Safe Area Handling: `pb-[max(env(safe-area-inset-bottom),8px)]` ensures seamless presentation on modern iPhones and Android devices.
- Layout Spacing: `<main>` incorporates `pb-24 md:pb-8` to guarantee zero overlap with scrollable content, cards, and pagination buttons.
- Touch Shelves: Category filters on mobile use `.no-scrollbar` with momentum swipe scrolling (`overflow-x-auto`) rather than wrapping onto multiple vertical lines.

### 4.3 Watchlist Hydration & State Strategy
- Hydration Guard: Zustand's `persist` middleware deserializes asynchronous browser `localStorage`. To prevent premature flashes of "Your Watchlist is empty", a `WatchlistSkeleton` renders while `!hasHydrated`.
- Architectural Isolation: Client storage ensures 100% private data isolation per user without requiring TMDB's 3-legged OAuth authentication flow (which would introduce insurmountable friction for tech test evaluators).

---

## 5. Performance & Web Vitals Optimization

1. **Next.js Image Optimization (`next/image`):**
   - Explicit responsive `sizes` attribute applied across all `fill` images.
   - Hero and detail headers utilize `loading="eager"` and `priority` to eliminate LCP runtime warnings.
2. **TanStack Query Caching:**
   - `staleTime: 1000 * 60 * 5` (5 minutes) prevents redundant network roundtrips.
   - `gcTime: 1000 * 60 * 30` (30 minutes) retains unused query cache in memory.
   - `refetchOnWindowFocus: false` avoids disruptive background re-fetching.
3. **Debounced Multi-Search:**
   - 350ms debounce with 2-character threshold minimizes TMDB API quota consumption.
4. **Bundle Performance:**
   - Production build compiles under 2 seconds with Turbopack, isolating shared JS chunks for rapid First Contentful Paint.

---

## 6. Testing Strategy

- **Vitest Unit Suite:** **45 passing tests** verifying formatters, analytics math, TMDB URL builders, debounce hooks, rating badges, and Zustand state mutations.
- **Playwright E2E Suite:** **26 passing tests** across Chromium Desktop and Mobile Chrome simulating realistic user discovery, query navigation, and watchlist persistence.
