# G8Chain Explorer Redesign — Implementation Plan

## Objective

Transform the working Blockscout frontend (already connected to the live G8Chain backend) into a premium G8Chain explorer per `.g8chain/agent/*` + `DESIGN_SYSTEM_G8CHAIN.md`, without touching the backend, API layer, integration config, or Blockscout attribution.

## Locked decisions (from your answers)

1. **Error color**: crimson red `#DC143C` (new `error` status token; failed txs, alerts, border/field errors). Success stays `#22c55e`, pending `#f59e0b`.
2. **Logo**: typeset `G8CHAIN` wordmark in DM Sans, tight letter-spacing (no image asset).
3. **Nav**: restructured to five main items — Explorer (home) / Blocks / Transactions / Tokens / Contracts — with practical sub-items (Tokens → Tokens, Token transfers; Contracts → Verified contracts, Verify contract). All existing routes stay reachable; URLs unchanged.
4. **Homepage**: dark navy hero band (`#0d1a29` gradient + cyan washes, glass search bar), light theme everywhere else.
5. **Pace**: first run = Phases 0–1 only, then pause for your review. Later runs start on your heads-up.
6. **Commits**: one commit per phase on `g8chain-redesign`. You commit the spec files (`.g8chain/`, `DESIGN_SYSTEM_G8CHAIN.md`, `.zcodeignore`) yourself.

## Non-negotiables (verified against code)

- `.env.local` / `public/assets/envs.js` integration values frozen: `explorer.g8chain.com`, `NEXT_PUBLIC_API_BASE_PATH=/`, `NEXT_PUBLIC_USE_NEXT_JS_PROXY=true`, RPC via `/api/eth-rpc`. Never reintroduce the `/api/v2` path duplication.
- No API-layer changes; presentation components never fetch directly (hooks: `useApiQuery` / `useApiPaginatedQuery`).
- No fake data; BigInt-safe value formatting stays (`src/shared/values/`).
- Blockscout attribution in footer preserved (licence `LicenseRef-Blockscout` mandates interface attribution linking to blockscout.com) alongside the G8Chain legal line.

---

# FIRST RUN — Phases 0 & 1

## Phase 0 — Baseline verification

1. `pnpm dev` (first compile can take ~45s — known Turbopack behavior).
2. Verify real data loads at `localhost:3000`: homepage widgets, `/blocks`, `/txs`, `/block/[n]`, `/tx/[hash]`, `/address/[hash]`, `/tokens`, `/search-results?q=…` — using real hashes/addresses fetched from `explorer.g8chain.com/api/v2`.
3. Confirm no CORS errors, no duplicated `/api/v2` proxy path, chain ID 17171 in network requests.
4. Capture baseline screenshots (desktop + 375px mobile) of homepage, block, tx, address pages via browser automation → store under `docs/baseline/`.
5. `git status` sanity; no prod config changes.

**Commit 1**: baseline screenshots + any audit-adjacent housekeeping.

## Phase 1 — Source audit → `docs/G8CHAIN-SOURCE-MAP.md`

Exploration is already done (three deep code sweeps). I'll verify key claims file-by-file, then write the map covering:

- **App shell**: `src/shell/layout/` (LayoutHome vs Layout vs LayoutApp), `TopBar.tsx`, `HeaderDesktop/Mobile`, `Burger` drawer, `footer/Footer.tsx` (hardcoded Blockscout attribution + `NEXT_PUBLIC_FOOTER_LINKS`), `CONTENT_MAX_WIDTH` in `shell/layout/utils.ts`.
- **Navigation**: `src/shell/navigation/useNavItems.ts` (hardcoded items — the restructure point), renderers `navigation/vertical|horizontal|mobile/NavigationDesktop|Mobile`, env-switchable via `NEXT_PUBLIC_NAVIGATION_LAYOUT`.
- **Homepage**: `src/pages/index.tsx` → `src/slices/home/pages/index/Home.tsx` (HeroBanner, `stats/HomeStats.tsx` + widgets, `charts/ChainIndicators`, `blocks/LatestBlocks`, `txs/LatestTxs`, `highlights/`), contexts `home-data-context.tsx`, `useHomeBlocksData` (socket-merged), `useStatsHome` (`stats:pages_main`).
- **Search**: `src/slices/search/` — `SearchBarDesktop/Mobile`, `SearchBarSuggest/*`, shortcut is `/` (no Cmd+K today), query via `useQuickSearchQuery` → `core:quick_search`; results page `src/pages/search-results.tsx`.
- **Core slices** (routes in `src/pages/`, rendering in `src/slices/`, ownership per `src/slices/CONTEXT.md`): block (Blocks/BlocksTable/BlockDetails), tx (TxIndex/TxsTable/TxDetails, `TxStatus.tsx` → `shared/tags/status-tag/StatusTag.tsx` — the status-color remap point), address (Address details + tabs), token (Token details, holders, instance), contract (Contract details, `useContractTabs`, verification flow), internal-tx/token-transfer shared tables.
- **API/query layer** (documented as frozen): `src/api/` registry (`service:name` resources), `buildUrl` + `/node-api/proxy` logic (`isNeedProxy`, SSRF-allowlisted `src/pages/api/proxy.ts`), hooks `useApiQuery`/`useApiInfiniteQuery`/`useApiPaginatedQuery`, types from `@blockscout/api-types@0.0.1-beta.d261ddc`.
- **Theme/design tokens**: `src/toolkit/theme/theme.ts` (`createSystem`), `foundations/colors.ts` (`DEFAULT_THEME_COLORS`, env-merge point), `semanticTokens.ts` (full semantic surface incl. `badge.*`, `alert.*`, `table.header.*`), `typography.ts` (Poppins/Inter constants), `borders.ts` (radii — set to 0), `shadows.ts` (neutralize), `globalCss.ts` (body bg/selection), `breakpoints.ts` (sm 415 / lg 1000 / xl 1440 — no `md`), 38 recipes in `recipes/` (+ hardcoded radius/shadow spots found in button/tabs/dialog/badge/input recipes), font loading in `src/pages/_document.tsx` (Google Fonts links, currently Poppins/Inter), color mode via next-themes in `toolkit/chakra/color-mode.tsx` (currently system-default — must pin light), theme toggle sole consumer `top-bar/settings/Settings.tsx` → `SettingsColorTheme.tsx`.
- **Branding**: `src/slices/chain/logo/NetworkLogo|NetworkIcon.tsx`, favicon, `TestnetBadge`.
- **Tests**: ~226 `*.pw.tsx` visual + ~27 `*.spec.tsx` co-located; snapshot-churn implication for each phase.
- **Integration contract**: env essentials, proxy flow diagram, "do not touch" list.

**Commit 2**: `docs/G8CHAIN-SOURCE-MAP.md`.

## Run 1 report (Changed / Preserved / Tested / Known issues / Next), then pause for your review.

---

# ROADMAP — later runs (after your heads-up)

## Phase 2 — Design foundation (shared primitives only, zero behavior change)

1. **Fonts**: `_document.tsx` → DM Sans variable range (`opsz,wght@9..40,100..1000`) + Space Mono 400/700; keep Poppins/Inter links removed; set `BODY_TYPEFACE`/`HEADING_TYPEFACE` in `typography.ts`; remap `textStyles` (heading.xl–xs / text.xl–xs) onto the §2.2 scale.
2. **Colors**: rewrite `_light` values in `DEFAULT_THEME_COLORS` to the §1 palette (`bg.primary → #fbfcfa`-family, brand `#0C90B8` for button/link/selected/icon, hover `#0a7495`, highlight `#38B3D4`); `_dark` mirrors `_light` (pinned light). Add crimson `#DC143C` to `text.error`/`border.error`/`alert.bg.error`/`badge.red` semantic tokens + StatusTag mapping.
3. **Radius → 0**: `radii` tokens (`sm/base/md/lg/xl` → 0, keep `full` for dots/spinners) + sweep hardcoded recipe radii (button, tabs, dialog, badge, input).
4. **Shadows → none**: neutralize `shadows.ts` scale, `action_bar`, `dark-lg` + semantic popover/drawer shadows (subtle scrim instead); sweep recipe refs (`size.md`, `size.lg`, `shadows.xs`).
5. **globalCss**: body `#fbfcfa`/`#171a1e`, selection `#dfeeff`/`#15171b`, scrollbar; button recipe → mono 12px/700/uppercase/`.08em`, `11px 14px` padding, hover = color + `translateY(-2px)`; table recipe → hairline `#e1e6ea`, mono uppercase headers, hover `#f4f8fc`.
6. **Pin light mode**: `NEXT_PUBLIC_COLOR_THEME_DEFAULT=light`, `NEXT_PUBLIC_COLOR_THEMES=['light']` in `.env.local` + hide theme toggle in `Settings.tsx`; verify no dark styles inject.
7. Regression: homepage, blocks, txs, address, contract routes load; run affected `pw`/`spec` tests (update visual snapshots deliberately, phase by phase).

## Phase 3 — Global shell

Typeset G8CHAIN wordmark in `NetworkLogo`/`NetworkIcon` (DM Sans, square mark, `#0C90B8` family; replace off-palette favicon); nav restructure in `useNavItems.ts` (five main items + sub-items, both horizontal & vertical renderers + mobile drawer); restyle TopBar/headers/footer (`#fbfcfa` footer, 4px `#171a1e` top bar, colorstrip, G8Chain legal line §8 + preserved Blockscout attribution); glass-search treatment for header search; page container width (wide shell ≤1240px). No API logic touched.

## Phase 4 — Homepage

Rebuild `HeroBanner` as dark navy band: kicker eyebrow, big DM Sans light title with `<em>` accent, glass search bar (max 640px); network overview via existing `HomeStats` widgets restyled (Space Mono metric values, graduated tint cards); latest blocks/txs as G8Chain tables with live `#22c55e` pulse dots (reuse existing socket/data contexts — data flow untouched); drop/hide unsupported widgets per verified features; reveal-on-scroll motion (spring `{1,90,15}`, once, reduced-motion fallback). Real data only.

## Phase 5 — Core explorer pages (per DESIGN_BRIEF hierarchies)

Restyle txs list/detail, blocks list/detail, address, token, contract pages slice-by-slice — detail pages as scannable technical records (mono machine data, kickers, status dots, copy buttons), sections rendered only when real data exists. Maintain every data flow and route.

## Phases 6–10

**6** contract DX polish (verified source, read/write, ABI, logs). **7** analytics/secondary features only if verified backend support. **8** intentional mobile passes at 320/375/390/430/tablet/desktop (align behavior to the 899/799/480 gates within Chakra's breakpoint system). **9** QA: `pnpm lint` / `lint:tsc` / `build` + vitest + affected Playwright, console/hydration/duplicate-request checks. **10** demo readiness (staging deploy via deploy-demo, walkthrough, known limitations). Per-phase report each run.

---

## Risks / known issues to track

- ~226 Playwright visual tests will churn as tokens change — snapshots updated deliberately per phase, not bulk-regenerated blindly.
- Breakpoints: Chakra has no `md`; keep Chakra's scale, align behavior to the website's gates.
- Hero band over light theme needs the header/hero boundary handled carefully in `LayoutHome` (sticky header vs full-bleed band).
- `ENV.local.example` referenced in `.g8chain/agent/README.md` doesn't exist (env essentials are inline in `PROJECT_CONTEXT.md`) — will note in the source map.
- Full `pw` suite + `pnpm build` not yet run in this session — Phase 0 verifies what matters first (app + routes), full gates at Phase 9 and after each risky change.
