# Elemes Design System (EDS) — "Midnight Cyan"

> **Design Metaphor:** *Cinema theater at midnight. Deep obsidian canvas, glowing full-bleed film artwork, and electric cyan neon accents powering every interaction.*

**Theme:** Dark Mode First (Midnight Cinema)  
**Version:** 1.3.0  
**Status:** Canonical Design Standard  
**Document Path:** `workspace/docs/DESIGN_SYSTEM.md`  

---

## 1. Design Philosophy & Core Principles

Inspired by modern **cinema-dark architectures (Apple TV+ / Letterboxd Pro / HBO Max)**, the **Elemes Design System (EDS)** is engineered specifically for film and television catalog discovery.

1. **Artwork is the Hero:** The page background is pure black (`#000000`), allowing movie posters and backdrop stills to glow with maximum visual saturation without UI clutter.
2. **Single Electric Accent (Electric Cyan):** Rather than scattering multiple competing colors, a single **Electric Cyan (`#00E5FF` / `#22D3EE`)** accent powers all primary buttons, active tabs, focus rings, and interactive focal points.
3. **Contrast-Driven Elevation:** Depth is created exclusively through surface contrast shifts (Obsidian `#000000` $\to$ Abyss `#07090E` $\to$ Snow `#FFFFFF` / Cyan `#00E5FF`) and hairline borders (`border-white/10`).
4. **Fluid Spring Motion:** State changes, active category pill transfers, and mobile dock indicators rely on physical spring animations (`motion.span layoutId`) rather than abrupt cuts or static CSS transitions.
5. **Native Mobile Ergonomics:** On handheld devices, thumb-reach navigation is prioritized with a frosted-glass bottom dock (`<MobileTabBar />`), safe-area inset protection, and tactile tap feedback (`active:scale-95`).
6. **Reversible Micro-Interactions:** Transient actions (e.g. watchlist toggles) provide instant, reassuring feedback through dark-mode Sonner toasts with integrated "Undo" buttons.

---

## 2. Color Palette & Token Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Obsidian Canvas #000000                         │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                     Abyss Surface #07090E                      │   │
│   │   ┌────────────────────────────────────────────────────────┐   │   │
│   │   │                Poster Artwork (Full Bleed)             │   │   │
│   │   └────────────────────────────────────────────────────────┘   │   │
│   │   ┌──────────────────────┐        ┌────────────────────┐   │   │
│   │   │ Electric Cyan CTA    │        │ Glacier Beam Link  │   │   │
│   │   │ #00E5FF              │        │ #38BDF8            │   │   │
│   │   └──────────────────────┘        └────────────────────┘   │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### Color Tokens

| Token Name | Hex Value | CSS Variable | Semantic Role |
|---|---|---|---|
| **Obsidian Canvas** | `#000000` | `--color-obsidian` | Full page background, main viewport backdrop. |
| **Abyss Surface** | `#07090E` | `--color-abyss` | Secondary elevated surface, card backings, modal popovers, navigation chrome. |
| **Abyss Elevated** | `#0E121B` | `--color-abyss-elevated`| Hover state for cards, dropdown menus, table rows. |
| **Electric Cyan** | `#00E5FF` | `--color-electric-cyan` | **Primary Brand CTA fill**, active tab indicators, focus rings, interactive switches. |
| **Cyan Hover** | `#38E1FF` | `--color-cyan-hover` | Button hover state, interactive active feedback. |
| **Glacier Beam** | `#38BDF8` | `--color-glacier-beam` | Secondary link text, metadata badges, subtle highlights, subtitles. |
| **Snow White** | `#FFFFFF` | `--color-snow` | Primary typography, high-contrast headings, active button labels. |
| **Ash Mist** | `#94A3B8` | `--color-ash-mist` | Body text, synopsis, secondary metadata, unselected nav links. |
| **Iron Veil** | `#334155` | `--color-iron-veil` | Hairline border outlines (`border-white/10`), inactive control borders. |
| **Marquee Gold** | `#F59E0B` | `--color-marquee-gold` | Star rating badges, critically acclaimed scores. |
| **Cinema Crimson** | `#EF4444` | `--color-cinema-crimson` | Remove from watchlist, destructive actions, error badges. |

---

## 3. Core Component Library Specifications

### 3.1 Multi-Slide Featured Hero Carousel (`<MovieHero />`)
- **Aspect Ratios:** Responsive aspect ratio scaling (`aspect-[4/3]` mobile $\to$ `aspect-[16/8]` tablet $\to$ `aspect-[21/9]` desktop).
- **Cross-Fade Transitions:** Seamless motion cross-fading powered by `<AnimatePresence>` and `motion.div`.
- **Navigation Controls:** Left/Right chevron pills appear smoothly on desktop hover.
- **Micro-Pagination Dots:** Glassmorphic pill container at bottom right displaying slide status (`w-6 bg-cyan-400` active bar, `w-1.5 bg-white/30` inactive dots).

### 3.2 Where to Watch Streaming Badges (`<WatchProviders />`)
- **Surface:** Obsidian box with hairline white border (`bg-[#07090E] border border-white/10 p-4 sm:p-5 rounded-xl`).
- **Provider Tile:** `h-9 w-9 sm:h-10 sm:w-10 rounded-lg border border-white/15 bg-black` with smooth hover zoom (`hover:scale-105 hover:border-cyan-400`).
- **Accessible Tooltips:** Native base-ui tooltip displaying provider brand name.
- **Provider Attribution:** Subtle JustWatch link with external icon.

### 3.3 Quick Genre Filter Chips
- **Layout:** Horizontal momentum swipe shelf (`overflow-x-auto no-scrollbar scroll-smooth`).
- **Active State:** Glowing Cyan pill (`bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 font-semibold shadow-sm`).
- **Inactive State:** Translucent neutral pill (`bg-white/[0.04] text-slate-400 hover:text-white border border-white/10`).

### 3.4 Toast Feedback Stack (Sonner)
- **Position:** `bottom-right` desktop, bottom center above dock mobile.
- **Palette:** Dark glass surface with crisp white text.
- **Interactive Action:** High-contrast `[Undo]` button allowing users to effortlessly reverse accidental watchlist clicks within 4 seconds.

### 3.5 Minimalist Cinema Footer (`<Footer />`)
- **Layout:** Clean, 2-row layout with zero visual clutter.
- **Row 1:** Shortened brand logo ("Elemes") and inline catalog navigation links (Home, Movies, TV Shows, Watchlist).
- **Row 2:** TMDB attribution disclaimer and copyright.

---

## 4. Mobile Ergonomics & Native App Bar (`<MobileTabBar />`)

On viewports below 768px (`md`), standard desktop top headers are supplemented with a native-style bottom bar:
- **Mounting Position:** `fixed bottom-0 left-0 right-0 z-50` with glassmorphic backdrop (`bg-black/90 backdrop-blur-xl border-t border-white/10`).
- **Safe Area Inset:** `pb-[max(env(safe-area-inset-bottom),8px)]` padding prevents overlaps with system gestures.
- **Touch Feedback:** `active:scale-95` on every button with clear 24px Lucide icons.
- **Live Watchlist Counter:** Floating miniature badge showing realtime saved items.
