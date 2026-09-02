# Architecture & Technical Blueprint

**Project:** Elemes Cinema — Movie & TV Show Catalog Web App  
**Architecture Pattern:** Feature-Driven Domain Modular Architecture  
**Target Platform:** Next.js 16 (App Router) + React 19 + TypeScript  
**Design System:** Tailwind CSS v4 + shadcn/ui  

---

## 1. Architectural Philosophy

The application follows the **Feature-Driven Modular Architecture** (inspired by the **AruSaku** ecosystem standards). Rather than grouping files by type (e.g., all hooks in one folder, all services in another), code is primarily organized around business domains (`movies`, `tv`, `people`, `search`, `watchlist`).

### Core Principles
1. **Separation of Concerns:** Distinct separation between network communication (`services/`), server state caching (`hooks/`), domain contracts (`types/`), and presentation (`components/`).
2. **Server-Client Hybrid Pattern:** Next.js App Router layout and pages orchestrate client interactive hooks with SSR optimization.
3. **Deterministic Query Keys:** Centralized query key factories ensuring zero cache collisions and predictable invalidations.
4. **Resilient HTTP Interceptors:** Axios client with token fallback and uniform error trapping.
5. **Zero-Friction Local State:** Zustand store with transparent `localStorage` serialization.

---

## 2. Technology Stack Breakdown

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 16 + React 19                    │
│                      (App Router & RSC)                     │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
┌──────────────┐       ┌──────────────┐        ┌──────────────┐
│  Tailwind v4 │       │  TanStack Q5 │        │  Zustand v5  │
│  + shadcn/ui │       │  (Async SWR) │        │ (Watchlist & │
│ (Design Sys) │       │              │        │   UI State)  │
└──────────────┘       └───────┬──────┘        └──────────────┘
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
| **Framework** | Next.js 16 (App Router) | High-performance routing, automatic code splitting, optimized static generation, and font/image optimization. |
| **UI Library** | React 19 | Modern React architecture with improved hydration, transitions, and concurrent rendering. |
| **Language** | TypeScript 5 (Strict) | Compile-time type safety, exhaustive interfaces for all TMDB entities, eliminating runtime `undefined` bugs. |
| **Styling** | Tailwind CSS v4 | Cutting-edge CSS engine (`@theme inline`), zero-runtime CSS footprint, and dark cinema theme variables. |
| **Component Kit** | shadcn/ui (Base UI) | Accessible, unstyled primitives customizable for cinema UI (Dialog, Tabs, Button, Badge, Skeleton, Card). |
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
├── e2e/                                   # Playwright End-to-End Test Suite
│   ├── home.spec.ts                       # Home & discovery navigation tests
│   ├── movies.spec.ts                     # Movies catalog & detail tests
│   ├── tv.spec.ts                         # TV catalog & seasons guide tests
│   ├── search.spec.ts                     # Multi-search & ⌘K modal tests
│   └── watchlist.spec.ts                  # LocalStorage watchlist persistence tests
├── public/                                # Public static assets & default placeholders
├── src/
│   ├── app/                               # Next.js App Router Route Tree
│   │   ├── layout.tsx                     # Global Root Layout (QueryProvider, Nav, Footer)
│   │   ├── globals.css                    # Tailwind v4 theme variables & base styles
│   │   ├── page.tsx                       # Home page (Hero, curated shelves)
│   │   ├── movies/
│   │   │   ├── page.tsx                   # Movies Catalog (Category tabs & pagination)
│   │   │   └── [id]/page.tsx              # Movie Details (trailers, cast, similar)
│   │   ├── tv/
│   │   │   ├── page.tsx                   # TV Shows Catalog (Category tabs & pagination)
│   │   │   └── [id]/page.tsx              # TV Show Details (seasons, episodes, cast)
│   │   ├── people/
│   │   │   └── page.tsx                   # Trending celebrities gallery
│   │   ├── search/
│   │   │   └── page.tsx                   # Live multi-search engine
│   │   ├── watchlist/
│   │   │   └── page.tsx                   # User's saved watchlist view
│   │   ├── loading.tsx                    # Route loading skeleton spinner
│   │   ├── error.tsx                      # Route error boundary
│   │   └── not-found.tsx                  # 404 page
│   │
│   ├── components/                        # Shared UI Components
│   │   ├── ui/                            # shadcn/ui primitives (button, badge, dialog, tabs, skeleton)
│   │   └── layout/                        # Layout chrome (navbar, footer, section-header)
│   │
│   ├── features/                          # Feature Domain Modules (aruSaku pattern)
│   │   ├── movies/
│   │   │   ├── components/                # movie-card.tsx, movie-grid.tsx, movie-hero.tsx
│   │   │   ├── hooks/use-movies.ts        # usePopularMovies, useMovieDetails, etc.
│   │   │   ├── services/movie.service.ts  # Axios API calls to TMDB movie routes
│   │   │   └── types/movie.types.ts       # TMovie, TMovieDetail, MovieCategory
│   │   │
│   │   ├── tv/
│   │   │   ├── components/                # tv-card.tsx, tv-grid.tsx
│   │   │   ├── hooks/use-tv.ts            # usePopularTv, useTvDetail, etc.
│   │   │   ├── services/tv.service.ts     # Axios API calls to TMDB TV routes
│   │   │   └── types/tv.types.ts          # TTvShow, TTvShowDetail, TvCategory
│   │   │
│   │   ├── people/
│   │   │   ├── components/                # person-card.tsx
│   │   │   ├── hooks/use-people.ts        # usePopularPeople, usePersonDetail
│   │   │   ├── services/people.service.ts # Axios API calls to TMDB people routes
│   │   │   └── types/people.types.ts      # TPerson, TPersonDetail
│   │   │
│   │   ├── search/
│   │   │   ├── hooks/use-search.ts        # useMultiSearch, useMovieSearch, useTvSearch
│   │   │   ├── services/search.service.ts # Axios calls for TMDB search
│   │   │   └── types/search.types.ts      # SearchResultItem, SearchParams
│   │   │
│   │   └── watchlist/
│   │       ├── components/                # watchlist-button.tsx, watchlist-view.tsx
│   │       └── store/                     # (points to use-watchlist-store.ts)
│   │
│   ├── lib/                               # Core Infrastructure Utilities
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
│   │   └── use-ui-store.ts                # Search modal & mobile menu state
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

## 4. Coding & Naming Standards

To maintain clean code practices as requested in the Elemes specification:

1. **File & Folder Names:** All files and folders use strict `kebab-case` (e.g., `movie-card.tsx`, `use-movies.ts`, `api-client.ts`).
2. **Layer Suffixes:**
   - `*.service.ts` — Axios HTTP communication layer.
   - `*.hooks.ts` / `use-*.ts` — React Query or custom state hooks.
   - `*.types.ts` — TypeScript types and interfaces.
   - `*.store.ts` / `use-*-store.ts` — Zustand store instances.
3. **Type Naming:**
   - Prefix domain entity types with `T` (e.g., `TMovie`, `TTvShow`, `TPerson`).
   - Use standard PascalCase for auxiliary interfaces (e.g., `Genre`, `VideoResponse`, `PaginationParams`).
4. **Shadcn First Rule:** UI components are created by customizing shadcn primitives, preventing ad-hoc unstyled elements and ensuring accessible ARIA roles.

---

## 5. Data Flow & State Lifecycle

```
[User Action / Page Load]
         │
         ▼
[React Component / Page] ── reads ──► [Zustand Store] (Watchlist / UI)
         │
         ▼
[React Query Hook (e.g. usePopularMovies)]
         │
    (Cache Hit?) ──► Yes ──► Returns Cached Data Instantly (staleTime: 5m)
         │ No
         ▼
[Domain Service (e.g. MovieService.getPopular)]
         │
         ▼
[Axios Client (apiClient)] ── Injects Bearer Token ──► [TMDB API]
         │
         ▼
[Response Interceptor] (Validates & Parses Data)
         │
         ▼
[React Query Cache Updated] ──► UI Renders with zero flicker
```

---

## 6. Performance & Web Vitals Optimization

1. **Next.js Image Component (`next/image`):**
   - Remote patterns configured for `image.tmdb.org`.
   - Responsive `sizes` attributes prevent loading over-dimensioned assets on mobile devices.
   - Automatic WebP/AVIF format conversion and lazy-loading with priority on Hero posters.
2. **TanStack Query Caching:**
   - `staleTime: 1000 * 60 * 5` (5 minutes) prevents redundant network roundtrips when navigating between tabs.
   - `gcTime: 1000 * 60 * 30` (30 minutes) retains unused query cache in memory.
   - `refetchOnWindowFocus: false` avoids disruptive re-fetches during normal browsing.
3. **Debounced Search:**
   - Multi-search queries require at least 2 characters before initiating network calls, saving API quota and reducing client lag.
4. **Bundle Splitting:**
   - Shared chunks are isolated to `~103 kB`, achieving minimal First Load JS.

---

## 7. Deployment & CI/CD Guide

The project is pre-configured for instant zero-configuration deployment to **Vercel** or **Netlify**:

```bash
# Production Build Command
npm run build

# Output Directory
.next

# Required Environment Variables in Dashboard
NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_v4_bearer_token
```
