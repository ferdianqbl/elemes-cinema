# 🎬 Elemes — Movie & TV Show Catalog Web App

A modern, high-performance cinema streaming and media discovery web application built for the **Frontend Developer Test (Middle Level)** at **Elemes**. Powered by **The Movie Database (TMDB) API**, **Next.js 16 (Turbopack)**, **React 19**, **TanStack React Query v5**, **Zustand**, **Motion**, **Sonner**, and the custom **Elemes Design System (EDS) — "Midnight Cyan"**.

---

## 📚 Project Documentation Hub

Complete technical specifications, API guides, and validation matrices are available in the [`docs/`](./docs) directory:

| Document | Description | Link |
|---|---|---|
| **Product Requirements Document** | Complete feature list, user personas, 17 TMDB endpoints matrix, Watchlist ADR, and non-functional requirements. | [📄 `docs/PRD.md`](./docs/PRD.md) |
| **System Architecture & Blueprint** | Technical stack breakdown, feature-driven structure, Axios exponential backoff retry, mobile dock, and 92%+ coverage table. | [🏛️ `docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) |
| **TMDB API Integration Guide** | Comprehensive documentation for all 17 integrated endpoints, query parameters, types, schemas, and OAuth vs LocalStorage ADR. | [📡 `docs/API_DOCUMENTATION.md`](./docs/API_DOCUMENTATION.md) |
| **Elemes Design System (EDS)** | Canonical "Midnight Cyan" cinema dark-mode tokens, motion springs, toast patterns, and radii rules. | [🎨 `docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) |
| **Feature Validations & Testing Matrix** | Step-by-step test matrix, 64 unit tests (92.21% coverage), 26 Playwright E2E tests, and submission checklist. | [🧪 `docs/FEATURE_VALIDATIONS.md`](./docs/FEATURE_VALIDATIONS.md) |

---

## 🛠️ Technology Stack & Rationale

```
┌─────────────────────────────────────────────────────────────┐
│               Next.js 16.2.9 + React 19.2.0                 │
│                 (App Router with Turbopack)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
        ┌──────────────────────┼───────────────────────┐
        ▼                      ▼                       ▼
 ┌──────────────┐      ┌──────────────┐        ┌──────────────┐
 │  Tailwind v4 │      │  TanStack Q5 │        │  Zustand v5  │
 │  + shadcn/ui │      │ (Async SWR & │        │ (Watchlist & │
 │  + Motion    │      │ 5m StaleTime)│        │   UI State)  │
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

* **Framework:** [Next.js 16.2.9 (App Router)](https://nextjs.org/) with high-speed **Turbopack** compilation.
* **UI Engine:** [React 19.2.0](https://react.dev/) utilizing modern hydration and concurrent transitions.
* **Language:** [TypeScript 5](https://www.typescriptlang.org/) in strict mode with exhaustive TMDB entity models.
* **Styling & Components:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui (Base UI)](https://ui.shadcn.com/) configured with the EDS Midnight Cyan design system.
* **Animations:** [Motion (`motion/react`)](https://motion.dev/) powering fluid layout spring indicators (`layoutId`) and carousel cross-fades.
* **Server State & Caching:** [TanStack React Query v5](https://tanstack.com/query/latest) with a 5-minute stale-time caching strategy and deterministic query key factories.
* **HTTP Client & Resilience:** [Axios](https://axios-http.com/) configured with exponential backoff & jitter retry on 429 rate limits and 5xx server errors.
* **Client State & Persistence:** [Zustand v5](https://zustand-demo.pmnd.rs/) with `persist` middleware for zero-friction `localStorage` synchronization.
* **Toasts & Feedback:** [Sonner v2](https://sonner.emilkowal.ski/) providing instant dark toasts with an "Undo" action on watchlist toggles.
* **Unit Testing:** [Vitest 3](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + [jsdom](https://github.com/jsdom/jsdom) (64 tests passing, 92.21% coverage).
* **End-to-End Testing:** [Playwright](https://playwright.dev/) across Desktop and Mobile Chrome viewports (26 tests passing).
* **Iconography:** [Lucide React](https://lucide.dev/).

---

## 🎯 Integrated Features & TMDB Endpoints

The project integrates **17 TMDB API endpoints**, greatly exceeding the 4-endpoint minimum required by the assessment:

### 1. Home & Featured Premiere Carousel (`/`)
- `GET /movie/now_playing` & `GET /movie/popular` — Powers the auto-advancing (7s) multi-slide premiere carousel with smooth cross-fade animation, slide pagination pills, and responsive aspect ratios.
- Discovery shelves for Popular Movies, Top Rated TV Series, and Trending Stars.

### 2. Movies Domain (`/movies` & `/movies/[id]`)
- `GET /movie/popular` — Trending & popular movies
- `GET /movie/top_rated` — Critically acclaimed movies
- `GET /movie/now_playing` — Currently playing in theaters
- `GET /movie/upcoming` — Upcoming cinema releases
- `GET /movie/{id}` — In-depth details, runtime, budget, revenue, genres
- `GET /movie/{id}/credits` — Cast filmography and characters
- `GET /movie/{id}/videos` — Official YouTube video trailers and teasers
- `GET /movie/{id}/similar` — Recommended similar movies
- `GET /movie/{id}/watch/providers` — Regional streaming platforms (Netflix, Disney+, Prime Video, Apple TV) and JustWatch link
- `GET /discover/movie` — Quick horizontal genre filter shelf (Action, Adventure, Animation, Comedy, etc.)

### 3. TV Series Domain (`/tv` & `/tv/[id]`)
- `GET /tv/popular` — Popular television shows
- `GET /tv/top_rated` — Highest-rated TV series
- `GET /tv/on_the_air` — Shows currently broadcasting episodes
- `GET /tv/airing_today` — Episodes airing today
- `GET /tv/{id}` — Show details, creators, and complete season/episode guide
- `GET /tv/{id}/credits` — Starring and recurring series cast
- `GET /tv/{id}/videos` — Official TV show trailers
- `GET /tv/{id}/watch/providers` — Streaming platform availability for TV series
- `GET /discover/tv` — Quick horizontal genre filter shelf for TV shows

### 4. People & Celebrities Domain (`/people` & `/people/[id]`)
- `GET /person/popular` — Trending global actors and directors
- `GET /person/{id}` — Actor biography, birth place, birthday, and alias names
- `GET /person/{id}/combined_credits` — Comprehensive cross-media filmography

### 5. Search Engine (`/search` & Quick `⌘K` Modal)
- `GET /search/multi` — Unified live search querying movies, TV series, and cast simultaneously with category filter tabs (`All`, `Movies`, `TV`, `People`) and a 350ms debounce.

### 6. LocalStorage Watchlist with Sonner Toast & "Undo" (`/watchlist`)
- Reactive bookmarking stored in `localStorage` via Zustand with live navbar & mobile dock badge counters.
- **Sonner Toast with Undo:** Toggling watchlist triggers a dark toast notification with an instant `[Undo]` button.
- `WatchlistSkeleton` loader displayed while Zustand rehydrates, eliminating jarring empty flashes.
- Built-in **Cinephile Analytics Dashboard** calculating Total Watchtime (Hours & Minutes), Watched Completion %, and Average TMDB Rating.

### 7. Native Mobile App Experience (`<MobileTabBar />`)
- Fixed bottom dock with frosted-glass backdrop blur (`md:hidden`).
- 5 thumb-reachable tabs (Home, Movies, TV, Search modal, Watchlist).
- Safe-area inset support (`pb-[max(env(safe-area-inset-bottom),8px)]`) for modern bezel-less smartphones.
- Touch-scrollable category and genre chips with hidden scrollbars (`.no-scrollbar`).

👉 Read full API schema in [📡 `docs/API_DOCUMENTATION.md`](./docs/API_DOCUMENTATION.md).

---

## 🎨 Design System: "Midnight Cyan" (EDS)

The interface follows the **Elemes Design System (EDS)** inspired by modern cinema-dark architecture:

* **Obsidian Canvas (`#000000`):** Pure black base letting poster artwork illuminate like theater screens.
* **Abyss Surface (`#07090E`):** Elevated cards, dropdown menus, and search dialog chrome.
* **Electric Cyan (`#00E5FF`):** Signature primary CTA button fill, active tab indicators, focus rings, and switches.
* **Marquee Gold (`#F59E0B`):** Star ratings ($\ge 7.0$) and critically acclaimed score badges.
* **Strict Radii Hierarchy:** $8\text{px}$ for buttons and media cards, $100\text{px}$ (`rounded-full`) for pill category toggles, $4\text{px}$ for micro tags. Zero mixed arbitrary radii.
* **Fluid Spring Physics:** State changes and active pill transfers animated using `motion/react`.

👉 Read full design tokens in [🎨 `docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md).

---

## 🚀 Quick Start & Installation

### Prerequisites
* **Node.js:** `>= 18.18.0` (Node 20+ recommended)
* **npm:** `>= 9.0.0`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ferdianqbl/elemes-cinema.git
cd elemes-cinema
npm install
```

### 2. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```
Fill in your TMDB credentials:
```env
NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_v4_bearer_token
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_v3_api_key
```

### 3. Run Development Server (Turbopack)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Automated Testing Suite

### Unit & Integration Tests (Vitest)
```bash
# Run all 64 unit tests
npm run test

# Run tests with code coverage report (92.21% coverage)
npm run test:coverage
```

### End-to-End Tests (Playwright)
```bash
# Run all 26 E2E tests headless across Desktop and Mobile viewports
npm run test:e2e
```

---

## 📦 Production Build
```bash
npm run build
npm start
```

---

## 👨‍💻 Submission Information
* **Applicant:** Ferdian Iqbal
* **Assessment Target:** Frontend Developer (Middle Level) — Elemes
* **Submission Contact:** `alifa@elemes.id`
* **Repository:** [https://github.com/ferdianqbl/elemes-cinema](https://github.com/ferdianqbl/elemes-cinema)
