# G8CHAIN Design System — Explorer Edition

**Purpose:** single source of truth for the visual design of the **G8chain Explorer** (`/Users/salman/Desktop/g8chain-explorer-frontend`, a Blockscout frontend fork). Every value below is extracted from the G8CHAIN website's production stylesheet (`g8chain_website/src/index.css`, ~8.4k lines) so the Explorer renders indistinguishably from the site: same colors, same typography, same spacing, same component language.

**Provenance:** values verified directly against website code on **2026-09-23** (not copied from the website's older `DESIGN_SYSTEM_G8CHAIN.md`, which has drifted from code in several places — e.g. it still documents button glow shadows that were subsequently banned).

**Website stack reference:** Vite + React 18 + vanilla CSS (`index.css`), framer-motion, lucide-react. **Explorer stack:** Next.js 16 + React 19 + Chakra UI v3 + Emotion — see §10 for the token mapping into that system.

---

## 0. Critical rules (read first — do not violate)

1. **LIGHT THEME ONLY.** Never add `prefers-color-scheme: dark` handling, dark-mode toggles, or `dark:` variants. Dark *sections* (hero bands) are explicit design decisions, not theme states. In the Explorer, pin the color mode to `light` and remove/hide the user-facing theme toggle (§10.5).
2. **Corner radius: 0 everywhere** — buttons, panels, chips, cards, tables, inputs, dialogs. Only sanctioned exceptions: circular dots/bullets and spinners (functional circles), and the 12px footer brand mark.
3. **Primary color is `#0C90B8`.** Never introduce new hues. The only sanctioned accents: the primary family itself, highlight `#38B3D4`, status green/amber (§1.4), and the partner palette (§1.6).
4. **NO GLOWS / NO SHADOWS.** Hover feedback = color/border change + slight lift (`translateY(-2px)`), never `box-shadow` or glow effects. The website's older docs mention button glow shadows — that rule was superseded; shadows are banned. (This also means neutralizing Blockscout's shadow tokens — §10.3.)
5. **Fonts:** DM Sans (sans) and Space Mono (mono) only. Never load another typeface.
6. **Text content belongs to the client** — do not invent marketing copy. Data labels, status words, and the branding strings in §8 are the sanctioned vocabulary.
7. **Mono for machine data.** Addresses, hashes, block numbers, timestamps, gas values, table numerics → Space Mono. Body copy and headings → DM Sans.
8. **Uppercase mono kickers** with wide letter-spacing (`.1–.3em`) label every section, panel, and card group (§2.3).

---

## 1. Color system

### 1.1 Primary brand family

| Role | Value | Usage |
|---|---|---|
| **Primary** | `#0C90B8` | The single brand color. CTAs, links hover, kicker marks, selected states, value highlights, icons |
| Primary hover | `#0a7495` | Button hover fill, second-step emphasis |
| Primary pressed/deep | `#085d78` | Deep-press fills, dark-tint text, primary hover fill |
| Highlight (excited) | `#38B3D4` | Accent word in `<em>` inside titles, eyebrow squares, accents on dark bands |
| Kicker text on dark | `#4fc3e0` | Mono eyebrow text over navy heroes |
| Light tints | `#e5f3f8` / `#edf6fa` / `#e9f2f8` / `#ebf7fa` | Chip backgrounds, card tints, button hover fill (graduated, pick per context) |
| Surface wash | `rgba(12,144,184,.07–.22)` | Radial washes on hero/section backgrounds |

### 1.2 Light-theme page (the Explorer's base shell)

| Role | Value |
|---|---|
| Page background | `#fbfcfa` (body token equivalent: `hsl(47 35% 98%)`) |
| Heading text | `#101828` |
| Top accent bar | `#171a1e` (4px solid bar at the very top of the page) |
| Body text | `#6e7985` |
| Muted text | `#828b96` · `#929ba4` · `#68727d` · `#6c7784` (context-dependent; pick one per component and stay consistent) |
| Hairlines / borders | `#e1e6ea` (dominant) · `#e2e7ea` · `#d1dce8` (button borders) · `rgba(29,37,46,.1)` (module dividers) |
| Panel background | `#f4f8fc` |
| Scrolled-header glass (light) | `rgba(252,253,251,.72)` bg + `rgba(29,37,46,.08)` border |
| Selection | `#dfeeff` background, `#15171b` text |

### 1.3 Dark bands (hero sections — explicit design decision)

Background gradient: `linear-gradient(160deg, #0d1a29 0%, #0a1520 45%, #070f18 100%)` with cyan radial washes `rgba(12,144,184,.2)` / `rgba(12,144,184,.14)` layered on top.

| Role | Value |
|---|---|
| Heading on dark | `#f2f7fb` (contrast ~14:1) |
| Lede on dark | `#e8f1f8` |
| Body on dark | `rgba(203,219,232,.92)` |
| Accent `<em>` on dark | `#38B3D4` |
| Glass surface on dark | `rgba(13,27,41,.38–.5)` + backdrop blur (§5.4) |

### 1.4 Status colors (explorer semantics)

| Status | Value | Usage |
|---|---|---|
| Success / finalized / live | `#22c55e` | Live dots, success status dots, "sealed" states |
| Success (text/deep) | `#298e69` | Checkmarks, legend text, partner green |
| Pending | `#f59e0b` | Amber pulsing indicators, pending transactions |

Map Blockscout's `ok`/`success` → `#22c55e`, `pending`/`warning` → `#f59e0b`, `error` → `#0C90B8` family is NOT for errors — use the primary only for interactive/brand states; error red stays out of the palette unless the client supplies one (request guidance if needed).

### 1.5 Forbidden

- Any hue outside the families above (no purple, no pink, no Tailwind default blues).
- Box-shadows and glows (rule 4).
- Dark page background (rule 1).

### 1.6 Partner palette (footer rows / brand squares only)

`#1F4DD8` (ALPHAG8) · `#0C90B8` · `#0A2370` · `#298E69` (EARTHG8 green). Not for UI states.

---

## 2. Typography

### 2.1 Fonts & loading

| Token | Stack | Use |
|---|---|---|
| `--app-font-sans` | `'DM Sans', sans-serif` | All body copy, headings, buttons |
| `--app-font-mono` | `'Space Mono', monospace` | Eyebrows/kickers, meta rows, addresses, hashes, stat values, table numerics, chips, legal text |

Website loads via Google Fonts: **DM Sans** `wght 400;500;600;700;900` + **Space Mono** (400/700 available). Display headings use weight **300** (and subpage heroes **200**) — when loading fonts for the Explorer, load the **variable** DM Sans range (`DM Sans:opsz,wght@9..40,100..1000`) so weights 200–900 all render true, or at minimum add 200/300 to the load spec.

### 2.2 Type scale (exact values from the website)

| Style | Spec |
|---|---|
| Hero display (dark hero) | `clamp(2.9rem, 7.4vw, 6.4rem)`, weight 300, line-height 1.02, letter-spacing `-0.02em`, color `#f2f7fb`; one accent word wrapped in `<em>` → `#38B3D4` |
| Subpage hero title | `clamp(2.4rem, 5vw, 4.2rem)`, weight 200, letter-spacing `-0.04em` (website's `.ep-title` override used by its Explorer/Docs pages) |
| Section title | `clamp(2rem, 3.8vw, 3.35rem)`, line-height 1.06, weight 300 |
| Card/panel title | 13–16px, weight 600–700, DM Sans, `#101828` |
| Body copy | 16px / line-height 1.7, `#6e7985` |
| Hero sublede | `clamp(13px, 1.3vw, 15px)` |
| Mono data rows (addresses, txs) | Space Mono 11–13px; secondary data `#8592a0` |
| Metric/stat values | `clamp(1.7rem, 3.1vw, 2.4rem)`, weight 500, letter-spacing `-0.08em` |

### 2.3 Kickers / eyebrows (mono, uppercase)

| Context | Spec |
|---|---|
| Standard kicker | Space Mono 12px, weight 700, uppercase, `#0c90b8` |
| Hero kicker (dark) | Space Mono 14px, weight 700, letter-spacing `.22em`, `#4fc3e0`; optional 10px `#38B3D4` square before the text |
| Subpage eyebrow | Space Mono 11px, weight 700, letter-spacing `.3em`, `#6cc4de` on dark |
| Shared mono-uppercase utility | letter-spacing `.1em` (chips, meta rows, table headers) |

### 2.4 Machine-data text rules

- **Addresses/hashes:** Space Mono, truncate with ellipsis middle or tail; copy button alongside (§6.5).
- **Block numbers / timestamps / gas / amounts:** Space Mono 11–13px.
- **Table headers:** mono uppercase 11–12px, letter-spacing `.1em`, muted color.

---

## 3. Shape, spacing & grid

### 3.1 Corner radius

**0 everywhere.** Documented exceptions (functional circles only): status dots and live indicators (`border-radius: 50%`/`999px`), circular icon bullets, spinners, and the footer brand mark (12px). Do not round anything else — no `6px`, no `8px`, no pill buttons.

### 3.2 Page rail & layout

- Page rail: `--rail-width: min(86vw, 1020px)`, centered. Narrow content never touches viewport edges on desktop.
- Explorer-style wide shells may extend to **max-width 1240px** (the website's own explorer page uses this), keeping the same centered-rail pattern.
- Module sections: `padding: 52px 38px 66px`, separated by `border-bottom: 1px solid rgba(29,37,46,.1)`.
- Full-bleed hero bands: `width: 100vw; margin-inline: calc(50% - 50vw)`.

### 3.3 Breakpoints (max-width, from the website)

| Breakpoint | Gates |
|---|---|
| **899px** | 3-col grids collapse to fewer columns |
| **799px** | The dominant mobile breakpoint: grids stack, nav → mobile menu, hero actions go full-width, footer 2-col |
| **680px** | Footer legal wraps |
| **480px** | Single-column fine-tuning |

(Blockscout's own breakpoint scale may differ — when in doubt, align the *behavior* to these gates.)

### 3.4 Borders & dividers

Hairline discipline: `1px solid #e1e6ea` for card/panel borders; `rgba(29,37,46,.1)` for section dividers. Cards in a grid share hairlines (grid owns the top/left borders, cells own right/bottom) rather than doubling borders.

---

## 4. Iconography

- **lucide-react** icons only (website standard; Blockscout already ships lucide).
- Stroke width 1.5–2, size 14–20px inline, 30px chips for metric cards.
- Icon color follows adjacent text or `#0C90B8` for brand/selected states.

---

## 5. Component specifications

### 5.1 Buttons

**Base (secondary/outline):**
- Space Mono 12px, weight 700, uppercase, letter-spacing `.08em`, color `#0c90b8`
- `border: 1px solid #d1dce8`, `padding: 11px 14px`, radius 0, inline-flex, gap 7px
- Hover: `translateY(-2px)`, border → `#0c90b8`, background → `#ebf7fa`. No shadow.

**Primary:**
- Solid `#0c90b8`, text `#f7faff`, same metrics as base
- Hover: background → `#085d78`, text `#fff`, same lift

**Hero glass variant (on dark bands):**
- `padding: 13px 22px`; background `rgba(13,27,41,.38)` + `backdrop-filter: blur(10px) saturate(1.5)`; text `#d9eef7`; glossy diagonal sheen `::before` (`linear-gradient(105deg, rgba(255,255,255,.22), rgba(255,255,255,.05), transparent)`)
- Hero primary fill: gradient `rgba(31,173,210,.85) → rgba(10,116,149,.9)`, hover toward `rgba(38,190,228,.9) → rgba(12,144,184,.95)`
- Hover: `translateY(-2px)` + background → `rgba(20,42,62,.5)`

### 5.2 Cards & panels

- White background, `1px solid #e1e6ea` border, radius 0, no shadow.
- Card header: mono uppercase 13px, weight 700, `#101828`, letter-spacing `.1em` — sometimes with a "live" pulse dot (§6.2) on the right.
- Hover (interactive cards): border → brand `#0C90B8` + `translateY(-2px)`. No shadow.
- Graduated tint cards: plain / `#edf6fa` / `#e9f2f8` backgrounds with values stepping `#0c90b8 → #0a7495 → #085d78`.

### 5.3 Tables & lists (explorer core)

- Row separators: `1px solid #e1e6ea` (never heavier).
- Header row: mono uppercase 11–12px, letter-spacing `.1em`, muted `#6c7784`, no fill (or `#f4f8fc` at most).
- Numeric/hash cells: Space Mono 11–13px; secondary text `#8592a0`.
- Row hover: background `#f4f8fc` (or `#ebf7fa` for stronger affordance), no shadow.
- Selected state: `#0C90B8` left accent bar (3–4px) + tint background.

### 5.4 Liquid glass (frosted pane, for hero search / overlay surfaces on dark)

`backdrop-filter: blur(18px) saturate(1.6)` (10px blur for buttons), translucent navy tint `rgba(13,27,41,.34–.5)`, inset top highlight `inset 0 1px 0 rgba(255,255,255,.18)`, radius 0. The website's explorer search bar uses `rgba(13,27,41,.5)` + blur, max-width 640px.

### 5.5 Inputs & search

- White background, `1px solid #d1dce8` border, radius 0, DM Sans body text.
- Focus: border → `#0C90B8` (+ optional 3px `rgba(12,144,184,.15)` ring — a ring is acceptable as focus affordance, not decoration).
- Placeholder: muted `#828b96`.

---

## 6. Explorer-specific patterns (from the website's own explorer page)

The website ships a styled test Explorer (`ExplorerPage.tsx` + `index.css:8818–9079`) — reuse its patterns:

1. **Hero:** dark navy gradient band, padding-top ~170px (header clearance), kicker eyebrow (10px `#38B3D4` square + mono 11px `.3em` `#6cc4de`), huge title with `<em>Explorer</em>` in `#38B3D4`, glass search bar beneath.
2. **Layout:** max-width 1240px; two-column grid `minmax(200px, .55fr) / minmax(0, 2fr)`; sticky light sidebar of category cards (white, `#e1e6ea` borders, brand-blue icons, `#0C90B8` selected accent bar) beside a content column of white cards.
3. **Live feeds:** cards titled "Latest Blocks" / "Latest Transactions" with a pulsing `#22c55e` live dot; new items animate in (website simulates a block every ~2.3s).
4. **Status dots:** 50% circles — `#22c55e` success, `#f59e0b` pending — inline with mono data rows.
5. **Copy-to-clipboard:** small ghost icon buttons (Copy icon → Check icon on success) beside addresses/hashes.
6. **Honesty note:** when data is simulated/illustrative, say so in a muted footer line — never present mock data as real.

---

## 7. Motion system

Full catalogue lives in the website's `animation_design.md`. The essentials:

| Pattern | Spec |
|---|---|
| Reveal spring | `{ type: 'spring', mass: 1, stiffness: 90, damping: 15 }`, `whileInView` **once**, viewport-triggered |
| Stagger | `delay = index * 0.05` |
| Reduced motion | `prefers-reduced-motion` → `{ duration: 0.3 }` fade, no springs/parallax |
| Hover | Color/border change + `translateY(-2px)`, transition `.2s ease`. **Never** box-shadow/glow |
| Live indicators | Pulse animation (opacity/scale) on `#22c55e` dots only |

Keep motion subordinate: reveals + hovers + pulses. No parallax, no tilt, no cursor-glow in the Explorer.

---

## 8. Branding text essentials (sanctioned copy)

- **Wordmarks:** `G8CHAIN` (primary), `ALPHAG8` — "Exclusive Technology Partner" (partner square `#1F4DD8`). Render wordmarks in DM Sans, tight letter-spacing; never restyle.
- **Legal footer line:** `© 2026 G8CHAIN — G8CHAIN S.R.L.` · `Design & Concept ALPHAG8.com`
- **Legal links:** Imprint · Terms of Use · Privacy Policy · Swiss Data Security · ISO 27001 · FINMA · nFADP (separated by 4px square markers)
- **Compliance vocabulary** (badges/labels): MiCA, GDPR, ISO 27001, PCI DSS, SOX, MiFID II, EU AI Act, NIST post-quantum, CO₂ Neutral Operations.
- **Label style:** mono uppercase with wide letter-spacing; badges are square-cornered chips on `#e5f3f8`-family tints with `#0a7495`/`#085d78` text, or status tints for live states.
- Marketing narrative copy is client-supplied — do not paraphrase or invent.

---

## 9. Accessibility

- Text contrast: light-theme body `#6e7985` on `#fbfcfa` ≈ 4.6:1; dark-band text ≥ 9:1 — never lighten body text below these.
- Focus rings: 3px `rgba(12,144,184,.15)` + solid `#0C90B8` border (visible focus on square corners).
- Status must never rely on color alone — pair dots with text labels.
- Respect `prefers-reduced-motion` (§7).

---

## 10. Mapping into this codebase (Blockscout fork / Chakra UI v3)

This app is a Blockscout frontend: Next.js 16 (pages router), React 19, **Chakra UI v3.36** (`createSystem` + Panda-style tokens + recipes), Emotion, next-themes. Theme entry: `src/toolkit/theme/theme.ts` (`createSystem(defaultConfig, customConfig)`), provider in `src/toolkit/chakra/provider.tsx`.

### 10.1 Where each design-system token lands

| Design token | Target file(s) |
|---|---|
| Brand colors | `src/toolkit/theme/foundations/colors.ts` — `DEFAULT_THEME_COLORS` under `colors.theme.*` (bg, text, hover, selected, icon, button, link, graph…) |
| Light/dark semantic pairs | `src/toolkit/theme/foundations/semanticTokens.ts` — `_light`/`_dark` pairs; fill `_light` with §1 values and make `_dark` mirror `_light` (or remove dark usage entirely, §10.5) |
| Fonts | `src/toolkit/theme/foundations/typography.ts` — `BODY_TYPEFACE` / `HEADING_TYPEFACE` constants + `textStyles` (map §2.2 scale onto `heading.xl–xs` / `text.xl–xs`); also `src/config/misc.ts` (`NEXT_PUBLIC_FONT_FAMILY_*`) |
| Radius → 0 | `src/toolkit/theme/foundations/borders.ts` — radii tokens |
| Shadows → none | `src/toolkit/theme/foundations/shadows.ts` — neutralize the scale (`xs–2xl`, `action_bar`, `dark-lg`) to `none`/transparent (rule 4); audit recipes that consume them |
| Body bg/fg, selection, scrollbar | `src/toolkit/theme/globalCss.ts` — body `#fbfcfa`/`#171a1e`, selection `#dfeeff`/`#15171b` |
| Breakpoints | `src/toolkit/theme/foundations/breakpoints.ts` (align behavior to §3.3 gates) |
| Font loading | `src/pages/_document.tsx` — replace Poppins/Inter `<link>`s with DM Sans (variable range) + Space Mono |
| Component look | `src/toolkit/theme/recipes/` (~38 recipes) and `src/toolkit/chakra/` snippets — key ones: `button`, `table`, `tabs`, `dialog`, `badge`, `input` |

### 10.2 Brand colors via env (zero-code path for colors)

Blockscout supports runtime theming: `NEXT_PUBLIC_COLOR_THEME_OVERRIDES` (JSON subset of `DEFAULT_THEME_COLORS`) and `NEXT_PUBLIC_FONT_FAMILY_HEADING`/`BODY` (JSON `{name, url}`). Use env overrides for quick iteration; commit the values in `colors.ts`/`typography.ts` for the canonical build.

### 10.3 Required recipe overrides

- **All recipes:** radius 0, no shadows (tokens handle most; sweep recipes for hardcoded `radius`/`shadow`).
- **button:** mono 12px/700/uppercase/`.08em`, padding `11px 14px`, solid primary + hover per §5.1; remove any lift-shadows.
- **table:** hairline `#e1e6ea` rows, mono numerics, mono uppercase headers, hover `#f4f8fc`.
- **dialog/popover:** square corners, hairline border, no shadow (use a subtle scrim instead of elevation).
- **badge/tag:** square chips, tint backgrounds per §8.

### 10.4 Status color mapping

`success/finalized → #22c55e`, `pending → #f59e0b`, link/interactive → `#0C90B8`. Replace Blockscout's default green/orange/red status palette with these (no red in the G8chain palette — flag any error states for client input).

### 10.5 Pin light mode

- Set `NEXT_PUBLIC_COLOR_THEME_DEFAULT=light` and restrict `NEXT_PUBLIC_COLOR_THEMES` to `['light']`.
- Hide the theme toggle UI (`src/shell/top-bar/settings/color-theme/SettingsColorTheme.tsx`) so users can't switch.
- Verify no `next-themes` class swapping injects dark styles (rule 1).

### 10.6 Chrome

- Recreate the website's header/footer language in `src/shell/`: 4px `#171a1e` top bar, `#fbfcfa` footer with colorstrip (`#085d78 → #0a7495 → #0C90B8 → #38b3d4`), legal line per §8, partner rows with square bullets.
- Logo/favicon: current favicon uses `#356ad1`, which is not in the palette — replace with a `#0C90B8`-family mark.

---

## 11. Do / Don't quick reference

| ✅ Do | ❌ Don't |
|---|---|
| `#0C90B8` for everything interactive/brand | New hues, purple/blue defaults, red errors |
| Radius 0 on every surface | Rounded buttons, pill chips, rounded dialogs |
| Hover = color + `translateY(-2px)` | Box-shadows, glows, elevation |
| DM Sans body / Space Mono data | Inter, Roboto, monospace body copy |
| `#fbfcfa` page, `#e1e6ea` hairlines | Pure white pages, heavy gray borders |
| Mono uppercase kickers `.1–.3em` | Sentence-case section labels |
| Light mode pinned | Dark toggle, `prefers-color-scheme` styles |
| Client copy verbatim (§8) | Invented marketing text |
| lucide icons 1.5–2 stroke | Mixed icon sets |
| Reveal spring `{1, 90, 15}` once | Parallax, tilt, cursor glow |
