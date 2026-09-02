# Feature Validations & Testing Guide

**Project:** Elemes Cinema — Movie & TV Show Catalog Web App  
**Test Suite Coverage:** Functional, UI/UX, Performance, Accessibility & Persistence  
**Assessment Target:** Elemes Frontend Developer (Middle Level)  
**Submission Contact:** `alifa@elemes.id`  

---

## 1. Quality Assurance Strategy & Test Matrix

This document provides a systematic verification matrix for all features requested in the **Frontend Test Elemes** specification.

### Summary Status Dashboard

| Category | Features Tested | Status |
|---|:---:|:---:|
| **1. TMDB API Endpoints Integration** | 12 endpoints | ✅ **Passed** |
| **2. Home & Discovery Engine** | Hero, Shelves, Badges | ✅ **Passed** |
| **3. Movies Catalog & Pagination** | 4 Categories + Dynamic Pages | ✅ **Passed** |
| **4. TV Catalog & Season Guide** | 4 Categories + Season breakdown | ✅ **Passed** |
| **5. Movie & TV Detail Pages** | Metadata, Trailer player, Cast | ✅ **Passed** |
| **6. Multi-Search & Live Filtering** | Debounced search, Tab filters | ✅ **Passed** |
| **7. Persistent Watchlist** | Add/Remove, LocalStorage, Counter | ✅ **Passed** |
| **8. People / Cast Gallery** | Actors grid, Filmography credits | ✅ **Passed** |
| **9. Loading States & Error Boundaries** | Skeletons, Global 404, Error retry | ✅ **Passed** |
| **10. Accessibility & Semantic HTML** | ARIA roles, Keyboard nav, Contrast | ✅ **Passed** |
| **11. Responsive Design (Mobile/Desktop)**| Mobile (375px), Tablet, Desktop | ✅ **Passed** |

---

## 2. Feature-by-Feature Validation Steps

---

### Feature 1: Featured Hero Banner & Home Discovery
- **Route:** `/`
- **Objective:** Verify featured movie hero banner, movie & TV shelves, and celebrity spotlight.
- **Test Steps:**
  1. Open the homepage at `http://localhost:3000`.
  2. Verify the Hero Banner loads with high-resolution backdrop, movie title, overview synopsis, release year, and star rating.
  3. Click **"Watch Details"** — confirms navigation to the specific `/movies/[id]` page.
  4. Click **"Add to Watchlist"** — confirms button state transforms into "In Watchlist" and the navbar counter increments.
  5. Scroll down to verify Popular Movies (10 items), Top Rated TV Series (10 items), and Trending Stars (6 items).
- **Expected Result:** Instant render without layout shift; skeleton shimmers appear during initial load.
- **Validation Status:** ✅ **Passed**

---

### Feature 2: Movies Catalog & Category Tabs
- **Route:** `/movies`
- **Objective:** Verify all 4 movie category endpoints and pagination controls.
- **Test Steps:**
  1. Navigate to `/movies`.
  2. Click on the category tabs: **Popular**, **Top Rated**, **Now Playing**, and **Upcoming**.
  3. Verify that the grid updates seamlessly with movies relevant to each category.
  4. Navigate to **Page 2** via the "Next" button at the bottom.
  5. Confirm the page number updates to "Page 2 of X" and previous button is enabled.
- **Expected Result:** Data fetches via TanStack Query; previous pages are cached in memory for zero-delay back-and-forth navigation.
- **Validation Status:** ✅ **Passed**

---

### Feature 3: TV Shows Catalog & Season Guide
- **Route:** `/tv`
- **Objective:** Verify TV categories (Popular, Top Rated, On The Air, Airing Today).
- **Test Steps:**
  1. Navigate to `/tv`.
  2. Switch between **Popular**, **Top Rated**, **On The Air**, and **Airing Today**.
  3. Click on any TV show card (e.g., *The Last of Us* or *House of the Dragon*).
  4. On the detail page (`/tv/[id]`), verify the **Seasons & Episodes** gallery renders all broadcast seasons with episode counts.
  5. Verify creator names and show status are properly formatted.
- **Expected Result:** Accurate season breakdowns, broadcast metadata, and related TV series recommendations.
- **Validation Status:** ✅ **Passed**

---

### Feature 4: Movie & TV Detail Pages (Trailers & Cast)
- **Route:** `/movies/[id]` and `/tv/[id]`
- **Objective:** Verify YouTube trailer player, cast filmography, and production financial metadata.
- **Test Steps:**
  1. Open a movie detail page (e.g., `/movies/550` or from the home hero).
  2. Inspect the **Official Trailer** section. Click play on the embedded YouTube iframe.
  3. Verify the **Top Cast** grid displays the actor's picture, real name, and character name.
  4. Verify the **Budget** and **Revenue** formatting converts numbers to readable currency (`$100,000,000`).
  5. Verify the **Runtime** formats into hours and minutes (`2h 19m`).
- **Expected Result:** Video streams cleanly without blocking page interaction; fallbacks display if no trailer exists.
- **Validation Status:** ✅ **Passed**

---

### Feature 5: Universal Multi-Search Engine
- **Route:** `/search` and Navbar Search Input
- **Objective:** Test live search across movies, TV shows, and cast profiles.
- **Test Steps:**
  1. Enter a search term (e.g., `"Avatar"` or `"Nolan"`) in the top navigation search bar and press Enter.
  2. Verify the `/search?q=...` page displays matched results.
  3. Click the filter tabs: **Movies**, **TV Series**, and **People**.
  4. Verify that clicking "People" displays actor/director cards, while "Movies" displays movie cards.
  5. Test an empty or unmatched query (e.g., `"xyzabc12345"`).
- **Expected Result:** Zero-state placeholder appears with friendly suggestion message; no unhandled exceptions.
- **Validation Status:** ✅ **Passed**

---

### Feature 6: LocalStorage Watchlist Persistence
- **Route:** `/watchlist`
- **Objective:** Verify bookmarking across the app and browser local storage retention.
- **Test Steps:**
  1. On the home page or catalog pages, click the bookmark icon on 3 different movies and 2 TV shows.
  2. Notice the global navbar badge immediately shows **"5"**.
  3. Navigate to `/watchlist`. Verify all 5 items are displayed with their respective poster, rating, and media type tag.
  4. Hard refresh the browser (`Cmd + Shift + R` or `Ctrl + F5`).
  5. Confirm all 5 items remain intact (persisted in `localStorage`).
  6. Switch filter tab to "Movies" — shows only the 3 movies.
  7. Click the trash icon on one item to remove it — navbar count decrements to **"4"**.
  8. Click **"Clear All"** — confirm the illustrated empty state is displayed.
- **Expected Result:** 100% reactive state updates without requiring page reloads or remote logins.
- **Validation Status:** ✅ **Passed**

---

### Feature 7: Popular People Directory
- **Route:** `/people`
- **Objective:** Verify trending actor profiles and filmography.
- **Test Steps:**
  1. Navigate to `/people`.
  2. Verify the 20-item actor grid loads with profile photos, department ("Acting", "Directing"), and "known-for" sample titles.
  3. Navigate to Page 2 to verify pagination.
- **Expected Result:** Clean responsive photo grid with graceful placeholder fallbacks for missing portraits.
- **Validation Status:** ✅ **Passed**

---

### Feature 8: Error Boundaries & Edge Cases
- **Objective:** Verify application resilience against invalid IDs, missing images, and offline scenarios.
- **Test Steps:**
  1. Navigate to an invalid route: `/non-existent-page`.
  2. Confirm the custom **404 - Page Not Found** page renders with a "Back to Home" button.
  3. Navigate to an invalid movie ID: `/movies/999999999999`.
  4. Confirm the friendly fallback message ("Movie not found") renders gracefully.
  5. Verify items with missing TMDB posters display the `/placeholder-poster.png` fallback without broken `<img>` icons.
- **Expected Result:** Zero unhandled crashes; error boundaries catch and allow one-click recovery.
- **Validation Status:** ✅ **Passed**

---

### Feature 9: Accessibility & Keyboard Navigation (A11y)
- **Objective:** Ensure compliance with basic web accessibility guidelines.
- **Test Steps:**
  1. Use only the `Tab` and `Shift + Tab` keys to navigate from the Navbar down through the catalog cards.
  2. Confirm active focus rings (`focus-visible:ring-2`) are clearly visible on buttons, links, tabs, and inputs.
  3. Press `Enter` on a Watchlist button — item toggles state.
  4. Screen-reader check: Verify icon buttons include descriptive `aria-label` attributes (e.g., `aria-label="Add to watchlist"`).
  5. Verify semantic landmark hierarchy: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- **Expected Result:** 100% keyboard accessible without trapping focus.
- **Validation Status:** ✅ **Passed**

---

### Feature 10: Responsive & Mobile Viewport Audit
- **Objective:** Test UI scaling on multiple screen widths.
- **Test Breakdown:**
  - **Mobile ($375\text{px} - 640\text{px}$):** Mobile hamburger drawer opens smoothly, search input scales to full width, movie cards display in a 2-column grid.
  - **Tablet ($768\text{px} - 1024\text{px}$):** 3 to 4-column media grids, inline navigation visible.
  - **Desktop ($1280\text{px}+$):** 5-column media grids, wide cinematic hero banner, detailed metadata columns.
- **Validation Status:** ✅ **Passed**

---

---

## 3. Automated Testing Suites

### 3.1 Unit & Integration Testing (Vitest + Testing Library)
Vitest executes unit and component integration tests with jsdom environment:

```bash
# Run unit & integration tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate code coverage report
npm run test:coverage
```

#### Test Suite Breakdown (34 / 34 Tests Passing)
* `src/lib/__tests__/utils.test.ts` (11 tests) — Formatters for currency, runtime, ratings, and ISO dates.
* `src/lib/__tests__/tmdb.test.ts` (7 tests) — TMDB image CDN URL builders and YouTube video embeds.
* `src/store/__tests__/use-watchlist-store.test.ts` (5 tests) — Zustand state mutations and LocalStorage persistence.
* `src/features/movies/__tests__/movie.service.test.ts` (4 tests) — Movie API service layer.
* `src/features/tv/__tests__/tv.service.test.ts` (2 tests) — TV show API service layer.
* `src/features/search/__tests__/search.service.test.ts` (1 test) — Multi-search API service layer.
* `src/components/ui/__tests__/rating-badge.test.tsx` (4 tests) — RatingBadge rendering and color token variants.

### 3.2 End-to-End Testing (Playwright)
Playwright executes user journeys across Chromium and Mobile viewports:

```bash
# Run all E2E tests headless
npm run test:e2e

# Run E2E tests with interactive UI mode
npm run test:e2e:ui
```

#### E2E Test Suites
* `e2e/home.spec.ts` — Brand header, featured hero banner, discovery shelves, catalog links.
* `e2e/movies.spec.ts` — Category tab switching, pagination, and movie detail navigation.
* `e2e/tv.spec.ts` — TV catalog category filters and seasons/episodes breakdown.
* `e2e/search.spec.ts` — Multi-search results, filter tabs, and quick search modal dialog (`⌘K`).
* `e2e/watchlist.spec.ts` — Add to watchlist, counter badge updates, viewing and LocalStorage persistence.

---

## 4. Submission Checklist for Elemes

Before sending the assignment to **`alifa@elemes.id`**, confirm the following deliverables:

- [x] **Framework & Stack:** Next.js 16.2.9 (Turbopack) + React 19 + TypeScript + Tailwind CSS v4 + Axios + TanStack Query + Zustand.
- [x] **TMDB API Requirements:** Exceeded minimum (12+ endpoints integrated).
- [x] **Automated Testing Suite:** 34 Vitest unit tests + Playwright E2E test suite.
- [x] **Documentation Included:**
  - [`README.md`](../README.md) (Installation, setup, documentation hub)
  - [`docs/PRD.md`](./PRD.md) (Product Requirements & User Personas)
  - [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) (System Architecture & Module Breakdown)
  - [`docs/API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) (12+ TMDB Endpoints Reference)
  - [`docs/DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) (Elemes Cinema Design System — Midnight Cyan)
  - [`docs/FEATURE_VALIDATIONS.md`](./FEATURE_VALIDATIONS.md) (Testing & Quality Assurance Guide)
- [x] **Production Build:** `npm run build` generates 100% static & dynamic routes with **0 errors**.
- [x] **GitHub Repository:** Pushed to [https://github.com/ferdianqbl/elemes-cinema](https://github.com/ferdianqbl/elemes-cinema).
- [ ] **Live Demo Deployment:** Deploy to Vercel / Netlify and generate public URL.
- [ ] **Email Submission:** Send email to `alifa@elemes.id` with repository and live demo links.
