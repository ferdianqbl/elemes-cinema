# Elemes Cinema Design System (ECDS) — "Midnight Cyan"

> **Design Metaphor:** *Cinema theater at midnight. Deep obsidian canvas, glowing full-bleed film artwork, and electric cyan neon accents powering every interaction.*

**Theme:** Dark Mode First (Midnight Cinema)  
**Version:** 1.0.0  
**Status:** Canonical Design Standard  
**Document Path:** `workspace/docs/DESIGN_SYSTEM.md`  

---

## 1. Design Philosophy & Core Principles

Inspired by the **HBO Max cinema-dark architecture**, the **Elemes Cinema Design System (ECDS)** is engineered specifically for film and television catalog discovery.

1. **Artwork is the Hero:** The page background is pure black (`#000000`), allowing movie posters and backdrop stills to glow with maximum visual saturation without UI clutter.
2. **Single Electric Accent (Electric Cyan):** Rather than scattering multiple competing colors, a single **Electric Cyan (`#00E5FF` / `#06B6D4`)** accent powers all primary buttons, active tabs, focus rings, and interactive focal points.
3. **Contrast-Driven Elevation (Zero Drop Shadows):** Depth is created exclusively through surface contrast shifts (Obsidian `#000000` $\to$ Abyss `#07090E` $\to$ Snow `#FFFFFF` / Cyan `#00E5FF`) and hairline borders (`border-white/10`), eliminating muddy artificial drop shadows.
4. **Cinema Marquee Typography:** Headlines use lighter, elegant weights ($300 - 400$) while micro-labels, metadata tags, and category eyebrows feature positive marquee letter-spacing (`+0.08em` to `+0.1em`).
5. **Strict Geometric Radii Discipline:** Exact three-tier radius scale ($8\text{px}$ cards/buttons, $100\text{px}$ pills, $4\text{px}$ tags) with zero intermediate radius variations.

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

## 5. Component Library & Implementation Specifications

### 5.1 Primary Electric Cyan CTA Button
```tsx
// Electric Cyan CTA
<Button className="h-10 px-5 rounded-lg bg-cyan-400 text-neutral-950 font-bold hover:bg-cyan-300 active:scale-[0.98] transition-all">
  <Play className="h-4 w-4 fill-current mr-2" />
  <span>Watch Details</span>
</Button>
```

### 5.2 Ghost Marquee Button
```tsx
// Ghost Outline Button
<Button variant="outline" className="h-10 px-5 rounded-lg border border-white/20 bg-transparent text-white hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/20 transition-all">
  <span>More Information</span>
</Button>
```

### 5.3 Cinema Poster Card
- **Surface:** `#07090E` (Abyss Surface) with `1px solid rgba(255, 255, 255, 0.08)` hairline border.
- **Image:** $2:3$ Aspect ratio with `rounded-t-lg` overflow-hidden container.
- **Hover State:** Smooth scale ($1.03\times$) on the poster image, border transitions to `border-cyan-500/50`, zero drop shadows.
- **Badges:** RatingBadge top-left, circular WatchlistButton top-right.

### 5.4 Marquee Rating Badge
- **High Rating ($\ge 7.0$):** Gold accent (`bg-amber-950/80 text-amber-400 border border-amber-500/30`).
- **Standard Rating ($< 7.0$):** Cyan/Glacier accent (`bg-cyan-950/80 text-cyan-400 border border-cyan-500/30`).
- Star icon fill matches current text token.

### 5.5 Category Navigation Pill Switcher
- **Container:** `bg-[#07090E] border border-white/10 p-1 rounded-full`.
- **Active Tab:** `bg-cyan-400 text-neutral-950 font-bold rounded-full`.
- **Inactive Tab:** `text-slate-400 hover:text-white rounded-full`.

---

## 6. Do's and Don'ts

### ✅ DO
- Use `#000000` as the absolute base page canvas.
- Use **Electric Cyan (`#00E5FF`)** as the single primary accent color across all interactive buttons and active states.
- Maintain wide positive letter-spacing (`tracking-wider` / `+0.08em`) on all uppercase small labels and badges.
- Keep card radius strictly at $8\text{px}$ and pills strictly at `rounded-full`.
- Use hairline borders (`border-white/10` or `border-cyan-500/20`) to define separation without drop shadows.

### ❌ DON'T
- Never use heavy drop shadows (`shadow-2xl` with black blurs) — let contrast provide elevation.
- Never mix arbitrary corner radii (e.g. $6\text{px}$, $14\text{px}$, $20\text{px}$).
- Do not introduce multiple saturated rainbow accent colors (e.g., green, purple, orange buttons on the same view).
- Do not use tight negative letter-spacing on small utility labels.
- Do not use gray/washed-out canvas backgrounds (`#1f2937`) — stick to deep Obsidian `#000000`.

---

## 7. Tailwind CSS v4 Theme Token Mapping

```css
@theme inline {
  --color-obsidian: #000000;
  --color-abyss: #07090e;
  --color-abyss-elevated: #0e121b;
  --color-electric-cyan: #00e5ff;
  --color-glacier-beam: #38bdf8;
  --color-snow: #ffffff;
  --color-ash-mist: #94a3b8;
  --color-iron-veil: #334155;
  --color-marquee-gold: #f59e0b;
  --color-cinema-crimson: #ef4444;

  --radius-tags: 4px;
  --radius-cards: 8px;
  --radius-buttons: 8px;
  --radius-pills: 9999px;
}
```
