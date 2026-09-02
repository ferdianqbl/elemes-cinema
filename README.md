# 🎬 Elemes Cinema — Movie & TV Show Catalog Web App

A modern, high-performance cinema streaming and media discovery web application built for the **Frontend Developer Test (Middle Level)** at **Elemes**. Powered by **The Movie Database (TMDB) API**, **Next.js 16 (Turbopack)**, **React 19**, **TanStack React Query v5**, **Zustand**, and the custom **Elemes Cinema Design System (ECDS) — "Midnight Cyan"**.

---

## 📚 Project Documentation Hub

Complete technical specifications, API guides, and validation matrices are available in the [`docs/`](./docs) directory:

| Document | Description | Link |
|---|---|---|
| **Product Requirements Document** | Complete feature list, user personas, TMDB endpoints matrix, and non-functional requirements. | [📄 `docs/PRD.md`](./docs/PRD.md) |
| **System Architecture & Blueprint** | Technical stack breakdown, feature-driven folder structure, data flow, and naming standards. | [🏛️ `docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) |
| **TMDB API Integration Guide** | Comprehensive documentation for all 12+ integrated endpoints, query parameters, types, and schemas. | [📡 `docs/API_DOCUMENTATION.md`](./docs/API_DOCUMENTATION.md) |
| **Elemes Cinema Design System (ECDS)** | Canonical "Midnight Cyan" cinema dark-mode tokens, typography, radii rules, and components. | [🎨 `docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) |
| **Feature Validations & Testing Matrix** | Step-by-step test matrix, automated test execution, accessibility audit, and submission checklist. | [🧪 `docs/FEATURE_VALIDATIONS.md`](./docs/FEATURE_VALIDATIONS.md) |

---

## 🛠️ Technology Stack & Rationale

```
┌─────────────────────────────────────────────────────────────┐
│               Next.js 16.2.9 + React 19.2.0                 │
│                 (App Router with Turbopack)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
┌──────────────┐       ┌──────────────┐        ┌──────────────┐
│  Tailwind v4 │       │  TanStack Q5 │        │  Zustand v5  │
│  + shadcn/ui │       │ (Async SWR & │        │ (Watchlist & │
│ (ECDS Theme) │       │ 5m StaleTime)│        │   UI State)  │
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

* **Framework:** [Next.js 16.2.9 (App Router)](https://nextjs.org/) with high-speed **Turbopack** compilation.
* **UI Engine:** [React 19.2.0](https://react.dev/) utilizing modern hydration and concurrent transitions.
* **Language:** [TypeScript 5](https://www.typescriptlang.org/) in strict mode with exhaustive TMDB entity models.
* **Styling & Components:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui (Base UI)](https://ui.shadcn.com/) configured with the ECDS Midnight Cyan design system.
* **Server State & Caching:** [TanStack React Query v5](https://tanstack.com/query/latest) with a 5-minute stale-time caching strategy and deterministic query key factories.
* **HTTP Client:** [Axios](https://axios-http.com/) configured with request/response interceptors for TMDB v4 Bearer Tokens and v3 API Key fallbacks.
* **Client State & Persistence:** [Zustand v5](https://zustand-demo.pmnd.rs/) with `persist` middleware for zero-friction `localStorage` synchronization.
* **Unit Testing:** [Vitest 3](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + [jsdom](https://github.com/jsdom/jsdom).
* **End-to-End Testing:** [Playwright](https://playwright.dev/) across Desktop and Mobile viewports.
* **Iconography:** [Lucide React](https://lucide.dev/).

---

## 🎯 Integrated Features & TMDB Endpoints

The project integrates **12 TMDB API endpoints**, exceeding the 4-endpoint minimum required by the assessment:

### 1. Movies Domain (`/movies` & `/movies/[id]`)
- `GET /movie/popular` — Trending & popular movies
- `GET /movie/top_rated` — Critically acclaimed movies
- `GET /movie/now_playing` — Currently playing in theaters (powers Home Featured Hero)
- `GET /movie/upcoming` — Upcoming cinema releases
- `GET /movie/{id}` — In-depth details, runtime, budget, revenue, genres
- `GET /movie/{id}/credits` — Top 10 cast filmography and characters
- `GET /movie/{id}/videos` — Official YouTube video trailers and teasers
- `GET /movie/{id}/similar` — Recommended similar movies

### 2. TV Series Domain (`/tv` & `/tv/[id]`)
- `GET /tv/popular` — Popular television shows
- `GET /tv/top_rated` — Highest-rated TV series
- `GET /tv/on_the_air` — Shows currently broadcasting episodes
- `GET /tv/airing_today` — Episodes airing today
- `GET /tv/{id}` — Show details, creators, and complete season/episode guide
- `GET /tv/{id}/credits` — Starring and recurring series cast
- `GET /tv/{id}/videos` — Official TV show trailers

### 3. People & Celebrities Domain (`/people` & `/people/[id]`)
- `GET /person/popular` — Trending global actors and directors
- `GET /person/{id}` — Actor biography, birth place, birthday, and alias names
- `GET /person/{id}/combined_credits` — Comprehensive cross-media filmography

### 4. Search Engine (`/search` & Quick `⌘K` Modal)
- `GET /search/multi` — Unified live search querying movies, TV series, and cast simultaneously with category filter tabs (`All`, `Movies`, `TV`, `People`).

### 5. LocalStorage Watchlist (`/watchlist`)
- Reactive bookmarking stored in `localStorage` via Zustand with live navbar badge counter and media-type filtering (`All`, `Movies`, `TV`).

👉 Read full API schema in [📡 `docs/API_DOCUMENTATION.md`](./docs/API_DOCUMENTATION.md).

---

## 🎨 Design System: "Midnight Cyan" (ECDS)

The interface follows the **Elemes Cinema Design System (ECDS)** inspired by the HBO Max cinema-dark architecture:

* **Obsidian Canvas (`#000000`):** Pure black base letting poster artwork illuminate like theater screens.
* **Abyss Surface (`#07090E`):** Elevated cards, dropdown menus, and search dialog chrome.
* **Electric Cyan (`#00E5FF`):** Signature primary CTA button fill, active tab indicators, focus rings, and switches.
* **Marquee Gold (`#F59E0B`):** Star ratings ($\ge 7.0$) and critically acclaimed score badges.
* **Strict Radii Hierarchy:** $8\text{px}$ for buttons and media cards, $100\text{px}$ (`rounded-full`) for pill category toggles, $4\text{px}$ for micro tags. Zero mixed arbitrary radii.
* **Contrast-Driven Elevation:** Zero artificial drop shadows — depth is established strictly through high-contrast surface polarity and hairline borders (`border-white/10`).

👉 Read full design tokens in [🎨 `docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md).

---

## 📁 Feature-Driven Directory Structure

```
workspace/
├── docs/                                  # Comprehensive Documentation Hub
│   ├── PRD.md                             # Product Requirements Document
│   ├── ARCHITECTURE.md                    # System Architecture Blueprint
│   ├── API_DOCUMENTATION.md               # TMDB API Integration Reference
│   ├── DESIGN_SYSTEM.md                   # Elemes Cinema Design System Specification
│   └── FEATURE_VALIDATIONS.md             # Quality Assurance & Test Guide
├── e2e/                                   # Playwright End-to-End Test Suite
│   ├── home.spec.ts                       # Home & discovery navigation tests
│   ├── movies.spec.ts                     # Movies catalog & detail tests
│   ├── tv.spec.ts                         # TV catalog & seasons guide tests
│   ├── search.spec.ts                     # Multi-search & ⌘K modal tests
│   └── watchlist.spec.ts                  # LocalStorage watchlist persistence tests
├── public/                                # Static assets & placeholder images
├── src/
│   ├── app/                               # Next.js 16 App Router Route Tree
│   │   ├── layout.tsx                     # Global Root Layout (QueryProvider, Tooltips, Nav)
│   │   ├── globals.css                    # Tailwind v4 theme variables & base styles
│   │   ├── page.tsx                       # Home page (Hero banner, curated shelves)
│   │   ├── movies/
│   │   │   ├── page.tsx                   # Movies Catalog (Category tabs & pagination)
│   │   │   └── [id]/page.tsx              # Movie Details (trailers, cast, similar)
│   │   ├── tv/
│   │   │   ├── page.tsx                   # TV Shows Catalog (Category tabs & pagination)
│   │   │   └── [id]/page.tsx              # TV Show Details (seasons, episodes, cast)
│   │   ├── people/
│   │   │   ├── page.tsx                   # Popular celebrities gallery
│   │   │   └── [id]/page.tsx              # Actor profile & filmography
│   │   ├── search/
│   │   │   └── page.tsx                   # Dedicated multi-search engine
│   │   ├── watchlist/
│   │   │   └── page.tsx                   # Persistent Saved Watchlist view
│   │   ├── loading.tsx                    # Route loading skeleton spinner
│   │   ├── error.tsx                      # Global error boundary with retry
│   │   └── not-found.tsx                  # Custom 404 page
│   │
│   ├── components/                        # Shared UI Components
│   │   ├── ui/                            # shadcn/ui primitives (button, badge, dialog, tabs)
│   │   └── layout/                        # Navbar, Footer, SectionHeader
│   │
│   ├── features/                          # Feature Domain Modules
│   │   ├── movies/                        # Components, Hooks, Services, Types
│   │   ├── tv/                            # Components, Hooks, Services, Types
│   │   ├── people/                        # Components, Hooks, Services, Types
│   │   ├── search/                        # Quick search modal, Hooks, Services, Types
│   │   └── watchlist/                     # Watchlist buttons, View, Store
│   │
│   ├── lib/                               # Core Utilities
│   │   ├── axios.ts                       # Axios client with TMDB auth interceptors
│   │   ├── tmdb.ts                        # TMDB image sizing & video URL builders
│   │   ├── constants.ts                   # Navigation links, genres, category maps
│   │   └── utils.ts                       # Formatters for date, runtime, currency, ratings
│   │
│   ├── providers/                         # Providers (TanStack Query Client)
│   ├── store/                             # Global Zustand Stores (Watchlist & UI State)
│   ├── test/                              # Vitest Test Setup & Global Mocks
│   └── types/                             # Global TypeScript Contracts & API Responses
├── .env.example                           # Environment variables schema
├── components.json                        # shadcn/ui configuration
├── next.config.ts                         # TMDB Image domain allowlist
├── package.json                           # Dependencies & scripts
├── playwright.config.ts                   # Playwright E2E configuration
├── postcss.config.mjs                     # Tailwind PostCSS configuration
├── tsconfig.json                          # TypeScript configuration with @/* path aliases
└── vitest.config.ts                       # Vitest configuration with jsdom & react
```

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js:** `18.18+` or `20+` / `22+`
* **Package Manager:** `npm` (or `pnpm` / `yarn`)
* **TMDB API Account:** Free account from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api).

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate your TMDB credentials in `.env.local`:
```env
NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# TMDB API Read Access Token (v4 - Recommended)
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_v4_bearer_token_here

# OR TMDB API Key (v3 fallback)
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_v3_api_key_here
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🧪 Testing & Verification

For detailed test procedures, responsive audits, accessibility verification, and edge-case testing, refer to [🧪 `docs/FEATURE_VALIDATIONS.md`](./docs/FEATURE_VALIDATIONS.md).

### 1. Unit & Component Integration Tests (Vitest)
```bash
# Run unit & integration tests (34 tests passing)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### 2. End-to-End Tests (Playwright)
```bash
# Run all E2E tests headless
npm run test:e2e

# Run E2E tests with interactive UI mode
npm run test:e2e:ui
```

### 3. Production Build Validation
```bash
# Compile optimized production build with Turbopack (0 errors)
npm run build
```

---

## 📬 Submission Info

* **Candidate:** Ferdian Iqbal
* **Assessment:** Frontend Developer Technical Test (Middle Level)
* **Company:** Elemes (`alifa@elemes.id`)
* **Repository:** [https://github.com/ferdianqbl/elemes-cinema](https://github.com/ferdianqbl/elemes-cinema)
