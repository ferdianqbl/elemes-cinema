# Elemes Cinema Design System (ECDS) — "Midnight Cyan"

> **Design Metaphor:** *Cinema theater at midnight. Deep obsidian canvas, glowing full-bleed film artwork, and electric cyan neon accents powering every interaction.*

**Theme:** Dark Mode First (Midnight Cinema)  
**Version:** 1.2.0  
**Status:** Canonical Design Standard  
**Document Path:** `workspace/docs/DESIGN_SYSTEM.md`  

---

## 1. Design Philosophy & Core Principles

Inspired by the **HBO Max and Apple TV+ cinema-dark architecture**, the **Elemes Cinema Design System (ECDS)** is engineered specifically for film and television catalog discovery.

1. **Artwork is the Hero:** The page background is pure black (`#000000`), allowing movie posters and backdrop stills to glow with maximum visual saturation without UI clutter.
2. **Single Electric Accent (Electric Cyan):** Rather than scattering multiple competing colors, a single **Electric Cyan (`#00E5FF` / `#22D3EE`)** accent powers all primary buttons, active tabs, focus rings, and interactive focal points.
3. **Contrast-Driven Elevation:** Depth is created exclusively through surface contrast shifts (Obsidian `#000000` $\to$ Abyss `#07090E` $\to$ Snow `#FFFFFF` / Cyan `#00E5FF`) and hairline borders (`border-white/10`).
4. **Fluid Spring Motion:** State changes, active category pill transfers, and mobile dock indicators rely on physical spring animations (`motion.span layoutId`) rather than abrupt cuts or static CSS transitions.
5. **Native Mobile Ergonomics:** On handheld devices, thumb-reach navigation is prioritized with a frosted-glass bottom dock (`<MobileTabBar />`), safe-area inset protection, and tactile tap feedback (`active:scale-90`).
6. **Strict Geometric Radii Discipline:** Exact three-tier radius scale ($8\text{px}$ cards/buttons, $100\text{px}$ pills, $4\text{px}$ tags) with zero intermediate radius variations.

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

## 3. Typography & Marquee Tracking

### Font Family
- **Primary Font:** `Geist` (with fallback to `Inter`, `Helvetica Neue`, `sans-serif`) loaded via Next.js Font Optimization (`--font-sans`).
- **Tabular Figures (`tnum`):** OpenType numeric alignment enabled for ratings, durations, budgets, and release years.

### Type Scale & Hierarchy

| Role | Font Size | Weight | Line Height | Letter Spacing | CSS Utility |
|---|---|---|---|---|---|
| **Hero Display** | $48\text{px} - 56\text{px}$ | 300 (Light) / 400 | $1.05$ | $-0.02\text{em}$ | `text-4xl md:text-5xl font-light tracking-tight` |
| **Section Heading** | $24\text{px} - 32\text{px}$ | 400 (Regular) | $1.15$ | $-0.01\text{em}$ | `text-2xl md:text-3xl font-normal tracking-tight` |
| **Card Title** | $14\text{px} - 16\text{px}$ | 600 (Semibold) | $1.25$ | $0$ | `text-sm md:text-base font-semibold text-white` |
| **Body / Synopsis**| $14\text{px}$ | 400 (Regular) | $1.50$ | $0$ | `text-sm text-slate-300 leading-relaxed` |
| **Marquee Eyebrow**| $11\text{px} - 12\text{px}$ | 600 (Semibold) | $1.20$ | $+0.08\text{em}$ (Wide) | `text-xs uppercase font-semibold tracking-wider text-cyan-400` |
| **Metadata Tag** | $10\text{px} - 11\text{px}$ | 500 (Medium) | $1.10$ | $+0.05\text{em}$ | `text-[11px] font-medium text-slate-400` |

---

## 4. Spacing, Shapes & Radii Discipline

### Geometric Radii Rule
No arbitrary intermediate border-radius values are permitted. Only three specific radius tiers exist:

```
┌────────────────────────────────────────────────────────┐
│  Tags & Badges:      4px      (rounded-[4px])          │
│  Cards & Buttons:    8px      (rounded-lg / rounded-md)│
│  Pills & Toggles:    100px    (rounded-full)           │
└────────────────────────────────────────────────────────┘
```

1. **Micro Elements ($4\text{px}$):** Category tags, metadata badges, year indicators (`rounded-[4px]`).
2. **Structural Elements ($8\text{px}$):** Primary CTA buttons, Movie cards, TV cards, Person cards, Poster thumbnails, Input boxes, Modal containers (`rounded-lg`).
3. **Pills & Circular Icons ($100\text{px}$):** Watchlist circular buttons, Navigation category pills, Search triggers (`rounded-full`).

---

## 5. Animation & Motion Standards (`motion/react`)

### 5.1 Active Category Spring Indicator
Category tabs utilize hardware-accelerated spring animations for fluid transitions:
```tsx
<motion.span
  layoutId="activeMovieTabIndicator"
  className="absolute inset-0 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/30"
  transition={{ type: "spring", stiffness: 450, damping: 35 }}
/>
```

### 5.2 Card Grid Cross-Fade Transitions
When switching categories, the movie/TV grid smoothly fades and shifts:
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeCategory}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
  >
    <MovieGrid movies={movies} />
  </motion.div>
</AnimatePresence>
```

---

## 6. Native Mobile App Components

### 6.1 Fixed Bottom Dock (`<MobileTabBar />`)
- **Container:** `fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/92 backdrop-blur-2xl border-t border-white/10`.
- **Safe Area Inset:** `pb-[max(env(safe-area-inset-bottom,0px),8px)]`.
- **Tactile Feedback:** `active:scale-90 transition-transform`.
- **Active Indicator:** Glowing cyan top-line indicator (`layoutId="mobileTabIndicator"`).
- **Badge Counter:** Live cyan counter badge on the Watchlist tab.

### 6.2 Mobile Horizontal Scroll Shelves
- **Pill Container:** `flex items-center gap-1.5 p-1 rounded-full bg-[#07090E] border border-white/10 w-full overflow-x-auto no-scrollbar scroll-smooth flex-nowrap shrink-0`.
- **Pills:** `shrink-0 whitespace-nowrap active:scale-95`.

---

## 7. Do's and Don'ts

### ✅ DO
- Use `#000000` as the absolute base page canvas.
- Use **Electric Cyan (`#00E5FF`)** as the single primary accent color across all interactive buttons and active states.
- Maintain wide positive letter-spacing (`tracking-wider` / `+0.08em`) on all uppercase small labels and badges.
- Keep card radius strictly at $8\text{px}$ and pills strictly at `rounded-full`.
- Use hairline borders (`border-white/10` or `border-cyan-500/20`) to define separation without muddy artificial shadows.
- Add `active:scale-90` / `active:scale-95` on touch interactions for a responsive native feel.

### ❌ DON'T
- Never use heavy drop shadows (`shadow-2xl` with black blurs) — let contrast provide elevation.
- Never mix arbitrary corner radii (e.g. $6\text{px}$, $14\text{px}$, $20\text{px}$).
- Do not introduce multiple saturated rainbow accent colors on the same screen.
- Do not allow category switchers to wrap onto 2-3 vertical lines on mobile devices.
- Do not use gray/washed-out canvas backgrounds (`#1f2937`) — stick to deep Obsidian `#000000`.
