# Elemes Cinema — Movie & TV Show Catalog Web App

A responsive, high-performance web application showcasing movies, TV shows, cast details, and entertainment discovery powered by the **The Movie Database (TMDB) API**.

Built for **Frontend Developer Test (Middle Level)** at **Elemes**.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Data Fetching & Caching:** [TanStack React Query v5](https://tanstack.com/query/latest)
- **HTTP Client:** [Axios](https://axios-http.com/) (Centralized API client with auth interceptors)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) with `persist` middleware (Watchlist & UI state)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🎯 Features & Requirements Covered

### 1. TMDB API Integration (10+ Endpoints)
- **Movies:**
  - `GET /movie/popular` — Popular movies
  - `GET /movie/top_rated` — Top rated movies
  - `GET /movie/now_playing` — Now playing movies
  - `GET /movie/upcoming` — Upcoming movies
  - `GET /movie/{id}` — Movie details
  - `GET /movie/{id}/credits` — Cast and crew
  - `GET /movie/{id}/videos` — Trailers and teasers
  - `GET /movie/{id}/similar` — Similar recommendations
- **TV Shows:**
  - `GET /tv/popular` — Popular TV shows
  - `GET /tv/top_rated` — Top rated TV shows
  - `GET /tv/on_the_air` — Currently airing TV shows
  - `GET /tv/airing_today` — Shows broadcasting today
  - `GET /tv/{id}` — TV show details and seasons
  - `GET /tv/{id}/credits` — TV cast and creators
- **People:**
  - `GET /person/popular` — Trending actors and filmmakers
  - `GET /person/{id}` — Person details and bio
- **Search:**
  - `GET /search/multi` — Unified search across movies, TV, and people

### 2. Core Capabilities & UX
- **Dynamic Watchlist:** Add/remove items with persistent `localStorage` storage via Zustand.
- **Search & Filter:** Live multi-search with category tabs (All, Movies, TV, People).
- **Responsive Media Sliders & Grids:** Adaptive layouts for mobile, tablet, and desktop.
- **Video Trailers:** Embedded YouTube player on movie and TV detail pages.
- **Accessible & Semantic HTML:** Proper landmarks (`<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`), ARIA labels, and keyboard navigability.
- **Skeleton Loading & Error Boundaries:** Polished fallback UI for async states.

---

## 📁 Folder Structure

Structured similarly to the modular feature-driven pattern:

```
workspace/
├── public/                 # Static assets & placeholders
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout + Providers
│   │   ├── globals.css     # Tailwind styling
│   │   ├── page.tsx        # Home overview & featured banner
│   │   ├── movies/         # Movies catalog & [id] detail
│   │   ├── tv/             # TV catalog & [id] detail
│   │   ├── people/         # Popular celebrities
│   │   ├── search/         # Multi-search page
│   │   └── watchlist/      # Saved media list
│   ├── components/         # Shared & layout UI
│   │   ├── ui/             # Button, Badge, RatingBadge, Skeleton, Tabs, Input
│   │   └── layout/         # Navbar, Footer, SectionHeader
│   ├── features/           # Modular domain architecture
│   │   ├── movies/         # Services, Hooks, Types, Components
│   │   ├── tv/             # Services, Hooks, Types, Components
│   │   ├── people/         # Services, Hooks, Types, Components
│   │   ├── search/         # Services, Hooks, Types, Components
│   │   └── watchlist/      # Store, Components, Views
│   ├── lib/
│   │   ├── axios.ts        # Configured Axios instance with interceptors
│   │   ├── tmdb.ts         # TMDB image helpers (posters, backdrops)
│   │   ├── constants.ts    # Categories, genres, nav links
│   │   └── utils.ts        # Formatting & className helpers
│   ├── providers/
│   │   └── query-provider.tsx  # TanStack Query client & devtools
│   ├── store/
│   │   ├── use-watchlist-store.ts # Persistent watchlist store
│   │   └── use-ui-store.ts        # UI modal & navigation state
│   └── types/              # Global API and common media types
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `18.17+` or `20+`
- A free TMDB API Key / Access Token from [The Movie Database](https://www.themoviedb.org/settings/api).

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

Fill in your TMDB credentials in `.env.local`:
```env
NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# TMDB API Read Access Token (v4 - Recommended)
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_v4_bearer_token_here

# OR TMDB API Key (v3 fallback)
NEXT_PUBLIC_TMDB_API_KEY=your_v3_api_key_here
```

### 3. Install Dependencies
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
