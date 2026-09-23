# G8Chain Explorer — Source Map

Phase 1 audit of the actual repository state, verified against code on **2026-09-23** on branch `g8chain-redesign` (baseline commit `a2c56810c`). This is the authoritative map for the G8Chain redesign: every path below was inspected in this working tree, not assumed from another Blockscout version.

Companion baselines: `docs/baseline/*.png` (homepage, block, tx, address at 1440px; homepage at 375px).

---

## 1. What this codebase is

A client customization of the official [Blockscout frontend](https://github.com/blockscout/frontend), running as:

- **Next.js 16** (pages router) + **React 19**, TypeScript
- **Chakra UI v3.36** (`createSystem` + Panda-style tokens + recipes) on **Emotion**
- **TanStack Query** for data fetching/caching; **next-themes** for color mode
- **pnpm**; Vitest (unit) + Playwright (visual) tests, co-located with sources
- Runtime configuration via `window.__envs` (loaded from `public/assets/envs.js`) — **no build-time env reads**; `next.config.js` is static by rule

Directory roles (there is no `src/ui` and no `src/lib`):

| Directory | Role |
|---|---|
| `src/pages/` | Thin Next.js route wrappers (dynamic import + `PageNextJs` + `getServerSideProps`) |
| `src/slices/` | Domain UI, per entity; the slice owning an entity owns its rendering |
| `src/features/` | Feature-flagged modules (`multichain`, `stats`, `gas-tracker`, `connect-wallet`, …) |
| `src/shell/` | App chrome: top bar, header, navigation, footer, layout wrappers |
| `src/toolkit/` | `@blockscout/ui-toolkit` workspace package: Chakra theme, recipes, UI primitives |
| `src/shared/` | Cross-slice shared UI/utilities (pagination, entities, values, tags, router) |
| `src/api/` | Resource registry + query hooks + proxy plumbing (**frozen for this redesign**) |
| `src/config/` | The only place env vars may be read (ESLint-enforced) |

Per-directory `CONTEXT.md` files document non-obvious rules. The ones that constrain the redesign: `src/slices/CONTEXT.md` (slice ownership; child slices never import from parents), `src/api/CONTEXT.md` (URL assembly, proxy, response types), `src/config/CONTEXT.md` (single import surface, env access rules), `src/toolkit/CONTEXT.md` (publishable package; no `SpriteIcon` inside toolkit), `src/shared/pagination/CONTEXT.md` (URL is the only list state).

---

## 2. Integration contract (frozen — do not modify without a concrete reason)

Current working configuration, verified live on 2026-09-23:

| Item | Value | Where |
|---|---|---|
| Core API host | `https://explorer.g8chain.com` | `.env.local`, mirrored in `public/assets/envs.js` |
| `NEXT_PUBLIC_API_BASE_PATH` | `/` | `.env.local` |
| `NEXT_PUBLIC_USE_NEXT_JS_PROXY` | `true` | `.env.local` |
| RPC endpoint | `https://explorer.g8chain.com/api/eth-rpc` | `.env.local` (`NEXT_PUBLIC_NETWORK_RPC_URL`) |
| Network | G8Chain, ID `17171` (`0x4313`), currency G8C / 18 decimals | envs |
| Backend version | Blockscout v9.0.2 (shown in footer) | live |

Request flow while the proxy is enabled: browser → `/node-api/proxy/api/v2/...` → rewrite (`src/server/rewrites.js`) → `src/pages/api/proxy.ts` → `x-endpoint` header target (default: core endpoint), guarded by an SSRF allowlist. The duplicated-path failure mode (`/api/v2/api/v2/...`, HTTP 400) happens if `NEXT_PUBLIC_API_BASE_PATH` is set to `/api/v2` together with the proxy — verified absent; correct path returns live data.

Live checks on 2026-09-23: `GET /api/v2/blocks` (latest height ≈ 4,231,923–4,232,034 during the session, ~3s blocks), `GET /api/v2/transactions`, homepage widgets, `/api/eth-rpc` → `eth_chainId: 0x4313`, indexing complete.

---

## 3. App shell

| Concern | Path | Notes |
|---|---|---|
| Layout variants | `src/shell/layout/Layout.tsx` (default), `LayoutHome.tsx` (homepage: no separate header row — HeroBanner carries search), `LayoutApp.tsx`, `LayoutSearchResults.tsx`, `LayoutError.tsx` | `LayoutHome` is the variant to extend for the dark-hero treatment |
| Layout internals | `src/shell/layout/components/` — `Root.ts`, `Container.tsx`, `TopRow`, `NavBar.ts` / `SideBar.ts` (compile-time pickers between horizontal vs vertical nav renderers), `MainArea.tsx`, `MainColumn.tsx`, `Content.tsx` | Nav layout picked by `NEXT_PUBLIC_NAVIGATION_LAYOUT` |
| Content width | `src/shell/layout/utils.ts` (`CONTENT_MAX_WIDTH`), toggle `NEXT_PUBLIC_MAX_CONTENT_WIDTH_ENABLED` | Wide-shell target for the redesign: ≤ 1240px |
| Top bar | `src/shell/top-bar/TopBar.tsx` — chain menu, `TopBarStats.tsx` (gas strip), DeFi dropdown, add-to-wallet, CSV/ABI download, settings gear | Separate from the nav row |
| Desktop header | `src/shell/header/HeaderDesktop.tsx` — search bar (+ profile when vertical nav) | |
| Mobile header | `src/shell/header/HeaderMobile.tsx`, `Burger.tsx` (opens `Drawer` with `NavigationMobile`) | |
| Alert banner | `src/shell/header/HeaderAlert.tsx` | |
| Footer | `src/shell/footer/Footer.tsx` — **hardcodes Blockscout links and attribution** (`renderProjectInfo()`: "Made with Blockscout", "Copyright © Blockscout Limited 2023-{year}", backend/frontend version links); external links from `NEXT_PUBLIC_FOOTER_LINKS` (unset here) | Blockscout attribution is licence-mandated (`LicenseRef-Blockscout`) — preserve while adding the G8Chain legal line |
| Color-theme switcher | `src/shell/top-bar/settings/color-theme/SettingsColorTheme.tsx`, sole consumer `src/shell/top-bar/settings/Settings.tsx`; availability via `src/shell/top-bar/config.ts` | Hide this when pinning light mode (Phase 2) |

## 4. Navigation

- **Item list is code, not config**: `src/shell/navigation/useNavItems.ts` — builds `mainNavItems` (Blockchain group, Tokens group, Apps, Charts & stats group, API, Other group) and `accountNavItems` (watchlist, private tags, API keys, custom ABI), gated on `config.features.*`. **This is the file to restructure for the five-item G8Chain nav.**
- Renderers: `src/shell/navigation/vertical/NavigationDesktop.tsx` (collapsible sidebar), `src/shell/navigation/horizontal/NavigationDesktop.tsx` (top nav), `src/shell/navigation/mobile/NavigationMobile.tsx` (drawer content); shared `NavLink.tsx`, `NavLinkGroup.tsx`, `NavLinkIcon.tsx`.
- External "Other" links: `NEXT_PUBLIC_OTHER_LINKS` env JSON via `src/shell/navigation/config.ts`.
- Network selector: `src/shell/top-bar/chain-menu/` (`ChainMenu.tsx`, `ChainMenuContent.tsx`).
- Current default layout in this fork: **vertical sidebar** (see baseline screenshots).

## 5. Homepage

Entry: `src/pages/index.tsx` → (multichain disabled) `src/slices/home/pages/index/Home.tsx`, wrapped in `LayoutHome`.

| Widget/section | Path |
|---|---|
| Hero (title + search + ad slot) | `src/slices/home/pages/index/HeroBanner.tsx` (text/bg configurable via `config.slices.home.heroBanner`) |
| Stats widgets | `src/slices/home/pages/index/stats/HomeStats.tsx` + `stats/widgets/` (`HomeStatsTotalTxs`, `TotalAddresses`, `LatestBlock`, `GasTracker`, etc.); data via `stats/useStatsHome.ts` → `useApiQuery('stats:pages_main')` |
| Charts ("C-lets") | `src/slices/home/pages/index/chains/ChainIndicators.tsx` + `ChainIndicatorsChart.tsx` (data: `hooks/useChartDataQuery.ts`) |
| Latest blocks | `src/slices/home/pages/index/blocks/LatestBlocks.tsx` (+ `Item/Degraded/Fallback`); data: `contexts/home-data-context.tsx` + `hooks/useHomeBlocksData.ts` (`core:homepage_blocks` + WebSocket `blocks:new_block` merging into the query cache, capped) |
| Latest txs | `src/slices/home/pages/index/txs/Transactions.tsx` + `LatestTxs.tsx` / `LatestTxsItem.tsx`; live via `src/slices/tx/hooks/useTxsSocketTypeAll.ts` |
| Highlights | `src/slices/home/pages/index/highlights/Highlights.tsx` (external JSON config; unset here) |

The homepage lists **do not** reuse the full-list tables; they have their own item rows (see §7). Baseline screenshot shows the hero carrying a purple/blue gradient with a "Network logo placeholder" and an ad slot — both are Phase 3/4 redesign targets.

## 6. Search

Feature slice: `src/slices/search/`.

- Inputs: `components/search-bar/SearchBarDesktop.tsx`, `SearchBarMobile.tsx` (mobile opens a full Drawer), shared `SearchBarInput.tsx`.
- Suggestions: `SearchBarSuggest/` (`SuggestAddress/Tx/Block/Token/ItemLink/Label/BlockCountdown`), category taxonomy in `utils/search-categories.ts`; recent searches in `SearchBarRecentKeywords.tsx` (localStorage).
- Queries: `hooks/useQuickSearchQuery.ts` — debounced `useApiQuery('core:quick_search')` + `core:search_check_redirect`; full results page `hooks/useSearchQuery.ts` → `src/pages/search-results.tsx`.
- Keyboard shortcut today: **`/` focuses search**. There is no Cmd+K palette; the brief allows adding it only if it fits the existing architecture cleanly.
- Resource declared in `src/api/resources/services/core/misc.ts`.

## 7. Core explorer slices

Route wrappers live in `src/pages/`; rendering lives in `src/slices/<entity>/`. Ownership rule (from `src/slices/CONTEXT.md`): the owning slice's components are imported by everyone else; child-slice tab content mounts at `<child>/pages/<parent>/`.

| Entity | List | Detail | Entity link | Status/format pieces |
|---|---|---|---|---|
| Block | `src/slices/block/pages/index/Blocks.tsx` → `BlocksContent.tsx`, `BlocksTable.tsx`, `BlocksTableItem.tsx` | `src/slices/block/pages/details/Block.tsx`, `BlockDetails.tsx` | `src/slices/block/components/entity/BlockEntity.tsx` | hooks `useBlockQuery.ts`, `useBlockTxsQuery.ts` |
| Tx | `src/slices/tx/pages/index/TxIndex.tsx` → `list/TxsContent.tsx`, `list/TxsTable.tsx`, `list/TxsTableItem.tsx`, `list/TxsTabs.tsx` | `src/slices/tx/pages/details/Transaction.tsx`, `info/TxDetails.tsx`, `info/parts/TxDetailsStatus.tsx` | `src/slices/tx/components/entity/TxEntity.tsx` | **Status: `src/slices/tx/components/TxStatus.tsx` → `src/shared/tags/status-tag/StatusTag.tsx` (color mapping lives here — the Phase 2 status-recolor point)**; `TxType.tsx`, `TxFee.tsx` |
| Address | `src/slices/address/pages/index/Accounts.tsx` | `src/slices/address/pages/details/Address.tsx` + `info/AddressDetails.tsx`, `info/AddressBalance.tsx`; tabs `txs/`, `internal-txs/`, `token-transfers/`, `tokens/`, `coin-balance/`, `blocks-validated/`, `logs/` | `src/slices/address/components/entity/AddressEntity.tsx` (+ `from-to/AddressFromTo.tsx`) | |
| Token | `src/slices/token/pages/index/Tokens.tsx` (+ `TokensTable.tsx`, `TokensList.tsx` mobile) | `src/slices/token/pages/details/Token.tsx`, `info/TokenDetails.tsx`; tabs `holders/`, `inventory/`; instance page `pages/instance/TokenInstance.tsx` | `src/slices/token/components/entity/` | `NativeTokenTag.tsx`, NFT media `components/nft-media/` |
| Contract | `src/slices/contract/pages/index/VerifiedContracts.tsx` | `src/slices/contract/pages/details/Contract.tsx`; tabs in `useContractTabs.tsx` (`code/ContractCode.tsx`, `methods/ContractMethods*` read/write) | — | verification flow `pages/contract-verification/` |
| Internal tx (no page) | — | mounted by block/address/tx | — | `src/slices/internal-tx/components/InternalTxsTable.tsx` |
| Token transfer | — | — | — | `src/slices/token-transfer/components/list/TokenTransferTable.tsx`, `snippet/`, `TokenTransferTypeBadge.tsx` |

Shared list/table infrastructure:

- `src/shared/pagination/useApiPaginatedQuery.ts` — the one-stop paginated hook (URL-driven page/cursor/filter/sorting; see `src/shared/pagination/CONTEXT.md`). Consumers: all full lists.
- `src/shared/lists/DataList.tsx` — generic wrapper (error → `ApiFetchAlert`, empty → `EmptyState`).
- Table primitives: `src/toolkit/chakra/table.tsx`; naming convention `*Table.tsx` / `*TableItem.tsx` / `*Content.tsx` (mobile).

Value & time formatting (BigInt-safe — keep using, never use float math):

- `src/shared/values/entity/utils.ts` (`formatBnValue`, WEI/GWEI divisors) + `NativeCoinValue.tsx`, `TokenValue.tsx`, `GasPriceValue.tsx`
- `src/shared/numbers/` (`NumberEntity.tsx`, `compareBns.ts`)
- `src/shared/date-and-time/` (`Time.tsx`, `TimeWithTooltip.tsx`, dayjs setup)

## 8. API / query layer (frozen — presentation must not bypass it)

- **Resource registry**: `src/api/resources/index.ts` (`RESOURCES`, keyed `` `${ApiName}:${resourceKey}` ``); per-service declarations in `src/api/resources/services/**` (e.g. `core/block.ts` → `/api/v2/blocks`). Response types come from generated `@blockscout/*-types` npm packages (core: `@blockscout/api-types@0.0.1-beta.d261ddc`); filter/sorting param types live in `src/slices/**/types/api.ts` by design.
- **URL assembly**: `src/api/utils/build-url.ts` → `getResourceParams` + proxy decision in `is-need-proxy.ts` (true when `NEXT_PUBLIC_USE_NEXT_JS_PROXY=true` or dev/review env). Endpoint/basePath from `src/api/config.ts` env parsing.
- **Hooks** (`src/api/hooks/`): `useApiQuery.ts`, `useApiInfiniteQuery.ts`, `useApiFetch.ts`, plus `src/shared/pagination/useApiPaginatedQuery.ts`. Query keys via `getResourceKey`.
- **Proxy handler**: `src/pages/api/proxy.ts` (SSRF allowlist, header forwarding); rewrites in `src/server/rewrites.js`; runtime config served by `src/pages/api/config.ts` (`/node-api/config`).
- **WebSocket**: `src/api/socket/` channels (used by homepage blocks/txs and list "new items" notices).

**Redesign rule**: UI slices consume these hooks; nothing else. No fetching in presentation components, no changes to `src/api/` unless a documented insufficiency exists.

## 9. Theme / design-token layer (the primary redesign surface)

Composition: `src/toolkit/theme/theme.ts` (`createSystem(defaultConfig, customConfig)`) → provider `src/toolkit/chakra/provider.tsx` → color mode via **next-themes** in `src/toolkit/chakra/color-mode.tsx` (attribute `class`).

| Token area | Path | Current state → redesign action |
|---|---|---|
| Theme colors | `src/toolkit/theme/foundations/colors.ts` — `DEFAULT_THEME_COLORS` under `colors.theme.*` (bg, text, hover, selected, icon, button, link, graph, navigation, stats, topbar, tabs), `_light`/`_dark` pairs; merged with `NEXT_PUBLIC_COLOR_THEME_OVERRIDES` (parsed in `src/shell/top-bar/config.ts`) | Blockscout blue/gray palette → G8Chain §1 palette in `_light`; mirror `_dark` = `_light` |
| Semantic tokens | `src/toolkit/theme/foundations/semanticTokens.ts` — full surface incl. `button.*`, `link.*`, `input.*`, `badge.{gray,green,red,...}`, `alert.bg.*`, `table.header.*`, `tooltip.*`, `dialog.*`, `toast.*` | Recolor success/pending/error; keep token names |
| Typography | `src/toolkit/theme/foundations/typography.ts` — `BODY_TYPEFACE` (Inter), `HEADING_TYPEFACE` (Poppins), `textStyles` heading.xl–xs / text.xl–xs; env override `NEXT_PUBLIC_FONT_FAMILY_*` in `src/config/misc.ts` | → DM Sans (body+headings) / Space Mono (machine data); rescale `textStyles` per design-system §2.2 |
| Font loading | `src/pages/_document.tsx` — plain Google Fonts `<link>`s (currently Poppins 400–700, Inter 400–700) | → DM Sans variable range + Space Mono |
| Radii | `src/toolkit/theme/foundations/borders.ts` — `none` 0, `sm` 4, `base` 8, `md` 12, `lg` 16, `xl` 24, `full` 9999 | → all 0 except `full` (functional circles) |
| Shadows | `src/toolkit/theme/foundations/shadows.ts` — `size.xs–2xl`, `action_bar`, `dark-lg`; semantic `popover`/`drawer` shadows in `semanticTokens.ts` | Neutralize to none; scrim instead of elevation |
| Global CSS | `src/toolkit/theme/globalCss.ts` + `src/toolkit/theme/globals/` (body bg/fg, selection, scrollbar, autofill, entity/address-entity globals) | Body `#fbfcfa`/`#171a1e`, selection `#dfeeff`/`#15171b` |
| Breakpoints | `src/toolkit/theme/foundations/breakpoints.ts` — `sm` 415, `lg` 1000, `xl` 1440, `2xl` 1920, `3xl` 3000. **No `md` token** (common gotcha) | Keep scale; align behavior to design-system gates (899/799/680/480) |
| Recipes | `src/toolkit/theme/recipes/*.recipe.ts` (~38, aggregated in `index.ts`: 12 single + 26 slot recipes) | Key overrides: button, table, tabs, dialog, badge, input. Hardcoded radius/shadow refs found in `button` (base/sm), `tabs` (indicator shadow var), `dialog` (xl radius, size.lg shadow), `badge` (sm), `input` (base radius, size.md shadow) — sweep during Phase 2 |
| Color mode pin | `toolkit/chakra/color-mode.tsx` reads `config.shell.topBar.colorTheme.default`; with no `NEXT_PUBLIC_COLOR_THEME_DEFAULT` set, next-themes falls back to **system** — this is why the baseline renders dark on dark-OS machines | Set `NEXT_PUBLIC_COLOR_THEME_DEFAULT=light` + `NEXT_PUBLIC_COLOR_THEMES=['light']`, hide `SettingsColorTheme.tsx` |

## 10. Branding / logo

- `src/slices/chain/logo/NetworkLogo.tsx` (full wordmark; drawer/sidebar/chain menu) and `NetworkIcon.tsx` (square icon; mobile header, collapsed sidebar) — currently a "Network logo placeholder" (no `NEXT_PUBLIC_NETWORK_LOGO` asset is configured).
- `src/slices/chain/TestnetBadge.tsx` (not shown; `NEXT_PUBLIC_IS_TESTNET=false`).
- Favicon: current mark is off-palette (`#356ad1`) — replace with a `#0C90B8`-family mark in Phase 3.
- Typeset G8CHAIN wordmark (DM Sans, tight letter-spacing) is the agreed logo treatment — implemented in `NetworkLogo`/`NetworkIcon`, no image asset.

## 11. Tests

- **~226 Playwright visual tests** (`*.pw.tsx`, co-located `__screenshots__/`) and **~27 Vitest unit tests** (`*.spec.tsx`), plus `*.primed.spec.tsx` integration specs (e.g. `src/slices/tx/pages/details/Transaction.primed.spec.tsx`).
- Examples: `TxsTable.pw.tsx`, `BlockDetails.pw.tsx`, `LatestBlocks.pw.tsx`, `StatusTag.pw.tsx`.
- Runner: `pnpm test:pw` (`tools/playwright/run.sh`), `pnpm test:vitest`.
- **Implication**: token-level changes (Phase 2) will churn many visual snapshots. Update them deliberately per phase after human review of the rendered result; never bulk-regenerate blind.

## 12. Feature flags relevant to what renders

`src/config/features.ts` re-exports every `src/features/*/config`; nav items and page swaps key off them. Observed active in this deployment: `apiDocs` (internal `/api-docs`), `gasTracker` (shown; gas price currently N/A), `stats` (homepage C-lets + `/stats`). Observed inactive/disabled: `multichain`, `marketplace` (no Apps nav), `zetachain`, `tac`, `validators`, `celo`, `beaconChain`, `dexPools`, `nameServices`, `rollup` (default non-rollup nav branch confirmed in `useNavItems.ts`). `internalTx` slice enabled (Internal txns tabs render).

**Consequence for the nav restructure**: the five G8Chain items map to verified features only — Explorer (`/`), Blocks (`/blocks`), Transactions (`/txs`), Tokens (`/tokens`, + Token transfers), Contracts (`/verified-contracts`, + Verify contract). Unused groups (Apps, Charts & stats sub-items, Other) get pruned from the nav; their routes keep working.

---

## 13. Baseline observations (2026-09-23, feeding Phase 2–4 decisions)

1. **Dark mode renders by system preference** (no pinned default) — violates design-system rule 1; pin light in Phase 2.
2. **Hero carries a purple/blue gradient** (Blockscout default) and a **"Network logo placeholder"** — replaced in Phases 3–4 by the dark navy G8Chain band + typeset wordmark.
3. **Ad slots are active**: hero sidebar ad (homepage), "Sponsored" text bar + inline banner on tx/address detail pages (Blockscout ad feature, FUN88/bc.game creative). They clash with the premium positioning — flag for a client decision before Phase 5; leave functional until then.
4. Gas tracker widget renders honestly as `$N/A` (no pricing data) — keep honest empty states.
5. Empty-token API responses and empty blocks are legitimate states (many zero-txn blocks at current usage); preserve "no data" vs "loading failed" distinction (`DataList` already does).
6. `.g8chain/agent/README.md` references `ENV.local.example`, which does not exist in the handoff; env essentials are inline in `PROJECT_CONTEXT.md` instead.

## 14. Redesign phase → code touchpoints (summary)

| Phase | Primary files |
|---|---|
| 2 — Foundation | `toolkit/theme/foundations/*`, `globalCss.ts`, `recipes/*` (button/table/dialog/badge/input/tabs), `_document.tsx`, `semanticTokens.ts`, env color-mode pinning, `StatusTag.tsx` recolor |
| 3 — Shell | `slices/chain/logo/*`, `shell/navigation/useNavItems.ts` + renderers, `shell/top-bar/*` (hide theme toggle, restyle), `shell/footer/Footer.tsx`, `shell/header/*`, content width |
| 4 — Homepage | `slices/home/pages/index/*` (HeroBanner → dark band, stats widgets, Latest blocks/txs restyle) |
| 5 — Core pages | `slices/{tx,block,address,token,contract}/pages/**` + shared list components |

Anything not listed under "API / query layer" (§8) stays untouched unless a documented blocker appears.
