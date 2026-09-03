# Product Requirements Document (PRD)

**Project:** Elemes — Movie & TV Show Catalog Web App  
**Client / Assessment:** Frontend Developer Technical Test (Middle Level) — Elemes  
**API Source:** [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs)  
**Submission Contact:** `alifa@elemes.id`  
**Status:** Complete / Shipped  
**Version:** 1.3.0  

---

## 1. Executive Summary & Objective

The **Elemes Catalog** is a modern, responsive, and performance-oriented entertainment web application built to showcase movies, TV series, trailers, and cast profiles sourced from the TMDB API. 

The application is inspired by modern streaming interfaces (Apple TV+ / Netflix / Letterboxd Pro) and provides users with a comprehensive catalog discovery engine, interactive trailer previews, live multi-search, a persistent local watchlist with cinephile analytics, a native mobile application experience with a fixed bottom dock, real-time where-to-stream watch providers, genre discovery shelves, and a multi-slide premiere carousel.

### Key Objectives
- Exceed the minimum requirement of 4 TMDB API endpoints by integrating **17 distinct endpoints** (including Watch Providers and Discover by Genre).
- Deliver a cinema-grade visual experience with pure black canvas (`#000000`), electric cyan highlights (`#00E5FF`), smooth spring layout animations (`motion`), and tactile touch micro-interactions.
- Provide reliable client-side state persistence for user bookmarking and watchlists without requiring external authentication or 3-legged OAuth friction.
- Provide reversible user actions with toast feedback (Sonner) featuring instant "Undo".
- Deliver an authentic Native Mobile App experience with bottom dock navigation, safe-area inset support, and horizontal touch-scrollable category and genre chips.
- Maintain a 100% automated test pass rate across unit tests (**64 tests**, **92.21% coverage**) and end-to-end browser tests (**26 tests**).

---

## 2. Target Audience & User Personas

| Persona | Motivation | Primary Need |
|---|---|---|
| **Casual Moviegoer** | Quick discovery of what's currently trending in theaters or streaming. | Engaging multi-slide hero banner, simple category tabs, clear ratings, streaming provider logos. |
| **TV Binge-Watcher** | Keeping track of ongoing series and upcoming season broadcast schedules. | Episode counts, season overviews, airing schedules, where to watch. |
| **Film Enthusiast** | Deep-diving into directors, cast members, official trailers, streaming providers, and budgets. | High-res trailers, full cast filmography, production metadata, JustWatch provider links. |
| **Planner / Curator** | Saving titles to watch over the weekend without losing data on page reload. | 1-click Watchlist with instant counter badge, watched status tracking, toast feedback with Undo, and browser persistence. |
| **Mobile User** | Browsing the catalog comfortably on smartphones with one thumb. | Native bottom dock navigation, swipeable category chips, tactile touch feedback. |

---

## 3. Comprehensive Feature Scope & Requirements

### 3.1 Home & Discovery Engine (`/`)
- **Multi-Slide Featured Premiere Carousel:** Auto-advancing (7s interval, pauses on hover) carousel displaying the top 5 premiere titles with smooth cross-fade transitions (`AnimatePresence`), previous/next navigation buttons, and bottom-right interactive pagination pills.
- **Popular Movies Shelf:** Curated 10-item grid showing current international box office hits.
- **Top Rated TV Shows Shelf:** Curated widescreen cards featuring critically acclaimed series.
- **Trending Cast & Celebrities:** Profile cards of trending actors, directors, and creators with department and known-for badges.
- **Direct Navigation Links:** Quick "View All" action buttons to deep catalog sections.

### 3.2 Movies Catalog & Category Switcher (`/movies`)
- **URL Query Parameter Synchronization:** Tabs sync with `?category=` (`popular`, `top_rated`, `now_playing`, `upcoming`), supporting browser back/forward and deep linking.
- **Direct Navbar Activation:** Clicking specific categories in the desktop navbar dropdown or mobile drawer directly activates the corresponding tab.
- **Fluid Spring Animation:** Powered by `motion/react`, the active tab pill glides seamlessly between categories using spring physics (`layoutId="activeMovieTabIndicator"`).
- **Secondary Horizontal Genre Shelf:** Touch-scrollable genre filter chips (Action, Adventure, Animation, Comedy, Crime, Drama, Horror, Sci-Fi, Thriller) powered by TMDB `/discover/movie`.
- **Smooth Content Transitions:** Category and genre grid changes cross-fade and translate smoothly via `<AnimatePresence>`.
- **Dynamic Pagination:** Page navigation with Previous / Next / Page Indicator and automatic page resets on category change.

### 3.3 Movie Detail View (`/movies/[id]`)
- **Cinematic Backdrop Header:** Full-bleed cinematic backdrop banner with atmospheric vignette gradients seamlessly blending into the canvas.
- **Elevated Floating Poster:** 3D elevated floating movie poster (`shadow-2xl shadow-black border-2 border-white/15`).
- **Where to Stream / Watch Providers:** Dynamic streaming platform logos (Netflix, Disney+, Prime Video, Apple TV) prioritized by user region (`ID` with `US` fallback) with JustWatch deep link.
- **Minimalist Movie Facts Grid:** Clean, authentic TMDB data tiles (Release Date, Original Language, Budget, Worldwide Revenue in USD).
- **Interactive Actions:** Full-width "Add to Watchlist" toggle with Sonner toast feedback and Undo action, "Watch Trailer" anchor jump, and Official Website link.
- **Official Trailer Video Player:** High-definition responsive 16:9 YouTube embed.
- **Top Billed Cast Carousel:** Horizontal scroll shelf of actors with photo, character name, and actor name.
- **Similar Titles Recommendation Shelf:** Grid of related titles.

### 3.4 TV Shows Catalog & Detail View (`/tv` & `/tv/[id]`)
- **TV Category Switcher:** Synchronized tabs for `popular`, `top_rated`, `on_the_air`, and `airing_today` with smooth spring animation.
- **Horizontal TV Genre Shelf:** Touch-scrollable genre chips for TV series (Action & Adventure, Animation, Comedy, Crime, Drama, Mystery, Sci-Fi & Fantasy).
- **Where to Stream / Watch Providers:** Shows available streaming services for television series.
- **Seasons & Episode Guide:** Comprehensive breakdown cards for each broadcast season including season poster, air date, and episode count.
- **Cast & Similar Series Shelves:** Full ensemble cast credits and algorithmically recommended similar TV series.

### 3.5 Global Multi-Search Engine (`/search` & Modal Dialog)
- **Omni-Search Bar:** Floating modal dialog accessible anywhere via desktop `Cmd+K` / `Ctrl+K` keyboard shortcut or mobile search tab.
- **Debounced Live Query:** 300ms input debounce preventing TMDB rate limit exhaustion.
- **Multi-Entity Results:** Simultaneously queries and presents Movies, TV Shows, and People/Actors with distinct badges.
- **Dedicated Search Results Page:** Deep search results page with filter tabs (`all`, `movie`, `tv`, `person`), match counts, and pagination.

### 3.6 Local Watchlist & Cinephile Dashboard (`/watchlist`)
- **Persistent LocalStorage State:** Zustand store serialized to browser LocalStorage. 0 login friction, private to the user's device, instant offline load.
- **Toast Feedback with Reversible "Undo":** Instant dark-themed toast notification when bookmarking or removing titles, complete with an "Undo" button to revert accidental taps.
- **Dual Status Tracking:** "Want to Watch" vs "Watched" toggle for personal film logging.
- **Cinephile Metrics Bar:** Dynamic calculation of Total Saved Titles, Watched Count, and Average Score.
- **Sort & Filter Controls:** Multi-criteria sorting (Recently Added, Highest Rating, Newest Release, Title A-Z) and media type filtering (`all`, `movies`, `tv`).

### 3.7 Native Mobile App Viewport
- **Fixed Mobile Bottom Navigation Dock:** Sleek glassmorphism bottom bar (`md:hidden`) offering 5 core tabs (Home, Movies, TV, Search, Watchlist with live count badge).
- **Safe Area Inset Protection:** Native support for iOS Home Indicator and Android navigation bars (`env(safe-area-inset-bottom)`).
- **Horizontal Touch Shelves:** Smooth, finger-flickable scroll rows with zero scrollbars (`no-scrollbar`).

### 3.8 Resilient Network Layer
- **Axios Exponential Backoff & Jitter:** Automatically retries idempotent GET requests on rate limits (429) or transient TMDB server errors (5xx) with exponential delay and randomized jitter.

---

## 4. Technical Specifications & Architecture

| Layer | Technology Choice | Rationale |
|---|---|---|
| **Framework** | Next.js 16.2.9 (App Router) + React 19 | Server Component streaming, static prerendering, modern React hooks. |
| **Styling** | Tailwind CSS v4 | High-performance CSS engine with modern color primitives. |
| **Animations** | Motion 12 (`motion/react`) | Hardware-accelerated spring animations for tab indicators and carousel transitions. |
| **Server State** | TanStack React Query v5 | Automatic query caching, background stale-while-revalidate, pagination prefetching. |
| **Client State** | Zustand v5 + `persist` middleware | Lightweight client-side reactive store with LocalStorage hydration. |
| **Notifications** | Sonner v2 | Clean, performant dark-themed toast notification stack with action buttons. |
| **HTTP Client** | Axios v1.13 | Request interceptors, Bearer authentication, exponential backoff retries. |
| **Testing** | Vitest 3.2.7 + Playwright 1.58.2 | 64 unit/integration tests (92.21% coverage) and 26 end-to-end browser tests. |

---

## 5. Acceptance Criteria Checklist

- [x] TMDB API integration with at least 4 endpoints (achieved: **17 endpoints**).
- [x] Responsive layout across Mobile, Tablet, Laptop, and Desktop viewports.
- [x] Native Mobile bottom dock with live badge counter.
- [x] Movies & TV category tabs with smooth spring animation and URL query syncing.
- [x] Quick genre discovery filtering on Movies and TV pages.
- [x] Where to Watch streaming provider integration.
- [x] Multi-slide Premiere Carousel on Home page.
- [x] Reversible bookmarking with Sonner toast feedback and "Undo" action.
- [x] Watchlist persistence in browser LocalStorage without login friction.
- [x] Unit test suite exceeding 90% coverage (**92.21% achieved across 64 tests**).
- [x] End-to-end Playwright tests passing 100% (**26 / 26 passed**).
- [x] Production build passes cleanly with zero errors (`npm run build`).

---

## 6. Related Documentation
- **Technical Architecture Blueprint:** [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md)
- **TMDB API Specification & Schemas:** [`docs/API_DOCUMENTATION.md`](./API_DOCUMENTATION.md)
- **Design System Tokens:** [`docs/DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
- **Quality Assurance Matrix:** [`docs/FEATURE_VALIDATIONS.md`](./FEATURE_VALIDATIONS.md)
