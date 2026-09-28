# memory.md — G8Chain BlockScout Explorer Redesign

> Persistent working memory for the redesign effort. Update it whenever a phase lands,
> a rule is decided, or a gotcha is discovered. Last updated: 2026-09-24.

## Project

- **Repo:** `/Users/salman/Desktop/g8chain-explorer-frontend`
- **Branch:** `g8chain-redesign` → remote `github.com/samreact1996/g8chain-explorer-frontend` (PR target: `main`)
- **What it is:** BlockScout fork restyled to the G8Chain design system, executed as a phased plan (Phases 1–9).

## Goal

Turn the stock Blockscout explorer into a G8Chain-branded explorer: dark navy hero band,
liquid-glass header, mono-typed "machine data" language (Space Mono), brand cyan `#0C90B8`
accents — while keeping all upstream explorer functionality.

## Phase status

### Committed (on `g8chain-redesign`)
| Commit | Content |
|---|---|
| `d46c18980` | Phase 0 — baseline screenshots |
| `b97d7e163` | Phase 1 — source audit map |
| `70c66ff44` | Disable ad slots by default |
| `bd4d61b73` | Phase 2 — design foundation (DM Sans body/headings, Space Mono machine data, favicon `#0C90B8`) |
| `77a4a5aae` | Phase 3 — global shell + homepage hero: fixed navbar (G8 mark, G8CHAIN wordmark, 5 links; gas strip / DeFi dropdown / CSV / sidebar nav removed), glass-on-scroll (`rgba(252,253,251,0.72)` + blur, transparent over homepage hero), full-bleed dark hero (mono kicker "▪ DISTRIBUTED LEDGER", two-line title with cyan accent "explorer", liquid-glass search, 5 `ds-statcell` stat boxes). Right hero side reserved for future image/animation. |

### Phase 3.5 — header fixes (user-requested, **uncommitted** at time of writing)
Files modified but not committed: `TopBar.tsx`, `NavLink.tsx`, `NavLinkGroup.tsx`,
`MainArea.tsx`, `LayoutHome.tsx`, `Footer.tsx`, `NetworkLogo.tsx`, favicons, `favicon.svg`.
1. Removed Add-G8Chain-to-wallet button + settings gear from TopBar.
2. Monospace nav text; active tab dark navy, no white chip when scrolled (`isOverHero` prop).
3. Compact liquid-glass dropdowns for Tokens/Contracts (§5.4).
4. Inner pages offset below fixed navbar: `MainArea.tsx` uses
   `FIXED_HEADER_HEIGHT = TOP_BAR_HEIGHT(36) + HORIZONTAL_NAV_BAR_HEIGHT(49)`;
   `isFullBleed` prop (on `MainArea.tsx`, `MainColumn.tsx`, used by `LayoutHome.tsx`)
   lets the homepage hero slide under the transparent header.
5. Footer/logo wordmarks mono: `NetworkLogo.tsx` (16px, 0.02em), `Footer.tsx` (15px).
   Copyright: "© 2026 G8CHAIN — G8CHAIN S.R.L. · Design & Concept ALPHAG8.com".

**Outstanding:** 4 ESLint errors in `src/shell/navigation/horizontal/NavLinkGroup.tsx`
(unused imports `chakra`, `Flex`; unused var `isHighlighted`; `react/jsx-no-bind` line 56).
Then browser-verify top/scrolled/dropdowns/inner pages and commit + push.

### Homepage Latest Transactions restyle (done 2026-09-24, **uncommitted**)
User feedback round 1 (7 changes) + round 2 (declutter): transaction items are now
**boxed cards matching `LatestBlocksItem`** (`borderRadius="md"`, `border.divider`, `p={ 3 }`),
rendered in a `VStack gap={ 2 }` instead of a table (`LatestTxs.tsx` dropped `TableRoot/TableBody`,
kept `TableContainerScrollable` as the scroll wrapper and `LATEST_TXS_TABLE_MIN_WIDTH` as `minW`).
Card layout (`LatestTxsItem.tsx`): left column stacked — type/status tags, bold hash, from → to
addresses on one line; right column right-aligned stacked — bold Value on top, time under it,
Fee at bottom (`gap={ 2 }`). "Coin transfer" badge blue (`TxType.tsx`); "Token transfer" stays orange.
Headings "Latest blocks"/"Latest transactions" in Space Mono via inline
`style={{ fontFamily: 'var(--chakra-fonts-mono)' }}` (see Gotchas for why).
Files: `LatestTxsItem.tsx`, `LatestTxs.tsx`, `Transactions.tsx`, `LatestBlocks.tsx`, `TxType.tsx`.
Verified: tsc + ESLint clean, vitest home slice 9/9, live screenshots at 1440px.

### Nav bar: Accounts item (done 2026-09-24, **uncommitted**)
Added an "Accounts" main nav item between Transactions and Tokens in
`src/shell/navigation/useNavItems.ts` — links to `/accounts` (Top Accounts page,
`h1` "Top accounts" verified), icon `navigation/top_accounts`,
`isActive: pathname.startsWith('/accounts')`. Nav now reads
Explorer · Blocks · Transactions · Accounts · Tokens ▾ · Contracts ▾.

### Latest blocks box: mono number + miner (done 2026-09-24, **uncommitted**)
In `LatestBlocksItem.tsx`: block number rendered in Space Mono by replacing
`textStyle="md"` with explicit `fontSize="16px" lineHeight="24px" fontWeight={ 500 }` +
`fontFamily="mono"` (textStyle class would override the font prop); miner `AddressEntity`
gets `fontFamily="mono"` (entity props inherit to link/content, no textStyle conflict).

### Homepage alignment + tx card polish (done 2026-09-24, **uncommitted**)
1. **One left edge everywhere (1240 rail + 24px pad):** TopBar inner Flex
   `px={{base:3, lg:6}} maxW=1240` (was 10/1280); HeroBanner moved padding inside the
   rail box (`maxW=1240 mx=auto px={base:3, lg:6}`, band itself `px=0`) — this was the
   mismatch (hero content at x=100 vs sections at x=124); `Home.tsx` wraps the
   blocks/txs area in the same `maxW=1240 mx=auto px` Box (MainColumn has no horizontal
   padding on the homepage, so without this the sections sat at 100px). Hero title
   "explorer" → "Explorer" (config `heroBanner.text` can override).
2. **Gradient squares for addresses:** new `AddressGradientSquare.tsx` next to
   LatestTxsItem — 20px `borderRadius="sm"` box, `linear-gradient(135deg, hsl(h1) → hsl(h2))`
   with both hues derived from the address hash (deterministic, same address = same
   colors) — the stat-cell accent look instead of the circle identicon. Tx card address
   rows use `noIcon` AddressEntity + this square before each address.
3. **Right column = time / amount / fee, no "Value" label:** token transfers show
   amount + symbol (`AssetValue` with `asset=token.symbol`, bold mono) — main-page API
   strips `token_transfers`, so the card fetches `core:tx` details when
   `transaction_types` includes `token_transfer` (`enabled: needsTokenData`); NFT-type
   totals fall back to the token symbol; coin transfers show the native value (bold mono).
Verified: tsc + ESLint clean, vitest home 9/9, measured edges all at 124px, screenshots.

### Footer rebuilt to G8Chain site footer (done 2026-09-24, **uncommitted**)
`src/shell/footer/Footer.tsx` fully rewritten from the user's reference HTML (the
G8CHAIN website footer), then revised per user feedback: **white background** (`bg.primary`,
dark text), same layout: four-color strip (`#1F4DD8 #0C90B8 #38B3D4 #298E69`), mono
"Powered by ALPHAG8 G8CHAIN" bar with ISO certs, three columns — brand (zap-mark +
"G8CHAIN EXPLORER" + mission text "G8Chain Explorer lets you inspect and analyze G8Chain…"),
quick links (**no "Platform" heading**; Explorer /, Blogs `#` placeholder — page doesn't
exist yet, Transactions /txs, Accounts /accounts, Tokens /tokens, Contracts
/verified-contracts — all real routes), Partners (4 rows unchanged:
ALPHAG8/FAGRI DIGITAL/WATERG8 + EARTHG8 "Soon"). "Global G8Chain Portal" tag replaced by
`<NetworkAddToWallet source="Footer"/>` — the "Add G8Chain" wallet button; renders only
when a browser wallet (MetaMask etc.) is detected (test browser shows nothing; users with
MetaMask see it). Legal bar unchanged. Old Blockscout links removed. Long SVG path
extracted to `ZAP_PATH` const (max-len 160 rule). Verified: tsc/eslint clean, vitest 9/9,
footer `rgb(251,252,250)` renders correctly (screenshot).

### "Activity console" panel — center section redesign (done 2026-09-24, **uncommitted**)
Goal: at first glance not read as Blockscout; center stays WHITE (user rejected a dark
panel — dark lives only in the hero + footer strip). Chosen via options: "Instrument
console panel", block number as the card hero, hover-only motion (no pulse/slide-in).
- `Home.tsx`: one bordered rounded panel (`border.divider`, `overflow=hidden`) wraps both
  columns; `Flex` row (column on mobile) with the blocks column (`width 300px` on lg,
  right hairline border) and the tx column (`flexGrow=1`). Panel `mt=8 mb=10` — the
  bottom margin is the requested 40px gap between panel and footer (MainColumn has no
  bottom padding on the homepage).
- `LatestBlocks.tsx`: mono uppercase "▪ LATEST BLOCKS" header + "→ View all" link
  (small SVG arrow BEFORE the text, per user wording); Network utilization moved under
  the header as `textStyle=xs`; **4 blocks** on desktop (was 3); blocks render as
  **borderless rows** in a VStack with sibling-selector hairlines
  (`css={{ '& > * + *': { borderTop... } }}` — Chakra v3 VStack has NO `divider` prop).
  Column is flex-column, list `flex={ 1 }` so rows stretch to fill the panel height —
  both columns always end together (fixes "blocks section looks empty from below").
- `LatestBlocksItem.tsx`: number-as-hero row — accent square + block-cube icon + big bold
  mono height (18px) + time right; **stacked label/value lines below: Txn, then Reward,
  then Miner** (user order), miner is a plain mono address — NO gradient square in the
  blocks column (user: "just the address, so it looks clean"); hover bg `rgba(12,144,184,0.04)`.
- `Transactions.tsx`: mono "▪ LATEST TRANSACTIONS" header + "→ View all"; single-tab case
  skips AdaptiveTabs entirely.
- `LatestTxs.tsx`: **5 txs** (user iterated 6 → 5: with 4 blocks on the left, 5 rows
  balance the columns); hairline rows; feed chain is flex-column with `flex={ 1 }` so
  rows stretch like the blocks side.
- `LatestTxsItem.tsx`: row with the approved inner layout (tags / mono hash / gradient-
  square address line + right time/amount/fee column); gradient squares at **size 12**
  (user hand-tuned from 16); **full wallet addresses** — `truncation="dynamic"` (measured
  middle-ellipsis: full when it fits) + `noCopy` + `fontSize="13px"` + `minW={ 0 }` +
  `columnGap 1.5` on the address HStack. Verified zero ellipsis at 1440px (coin rows fit
  both 42-char addresses); narrower viewports degrade gracefully via the measured truncate.
  Copy buttons removed from addresses (hash copy button remains above; user approved look).
Verified: tsc + ESLint clean, vitest home 9/9, live screenshot + measured 40px gap,
4 block rows / 6 tx rows in DOM.

### Address hover dashed-box clipping fixed (done 2026-09-28, **uncommitted**)
User: on hover the dashed highlight box around addresses was missing its bottom line.
Cause: the highlight box is a `::before` pseudo-element on `.address-entity` (see
`src/toolkit/theme/globals/address-entity.ts` — box extends 5px beyond the address on
top/left/right/bottom) and ancestors with `overflow: hidden` sitting flush with the
address line clipped the bottom 5px. Fixed by removing `overflow="hidden"` from:
(1) the tx-row content VStack in `LatestTxsItem.tsx`, (2) the Txn/Reward/Miner secondary
Flex in `LatestBlocksItem.tsx` — the only two clipper ancestors crossing the pseudo box;
long content is already handled by each address's own measured Truncate. Verified
programmatically: 14/14 address entities unclipped at 1440px.
User follow-up: the box had too much padding — tightened in `address-entity.ts` to a
snug 2px on all sides (`top/left: -2px`, `width/height: calc(100% + 4px)`, `py/pl: 0.5`;
no-copy variant `pr: 1`, `width: calc(100% + 8px)`); measured: 2px top/bottom, 4px
left, ~6px right (copy-button clearance). Verified with the highlight class applied
(hover detection is delayed by the context's 100ms timer + React events, so synthetic
hovers miss it — add `address-entity_highlighted` directly to inspect the box).

### Gradient square replaces circle identicons app-wide (done 2026-09-28, **uncommitted**)
User: everywhere the explorer shows the circular gradient identicon, use the homepage's
gradient box instead. Implementation: the canonical `AddressIdenticon`
(`src/slices/address/components/icon/AddressIdenticon.tsx`) now renders
`AddressGradientSquare` (new shared component in the same folder; the homepage copy was
moved there, homepage imports it, old local file deleted) — the old dynamic identicon
loading (blockie/jazzicon/gradient_avatar/nouns/github, cookie switchable) is fully
replaced by this design decision (the identicon-type settings UI was already removed in
Phase 3.5). AddressEntity's loading Skeleton changed `borderRadius="full"` → `"sm"`.
Because every address icon in the app renders through AddressIdenticon (AddressEntity on
tx/address/token/block pages, Top Accounts, user profile avatar), the square propagates
app-wide. **Size is pinned to 12×12** at AddressIdenticon regardless of the `size` callers
pass (was 20/24/30 across the app); `AddressGradientSquare` default is also 12. Verified:
tsc + ESLint clean, vitest 21/21 (home + address slices), Top Accounts all squares measure
exactly 12px, tokens page 0 circles, homepage unchanged visual.

### Navbar dropdowns + hero search: liquid glass (done 2026-09-28, **uncommitted**)
User: dropdowns were solid white, too much padding; hero search was solid white too.
- `NavLinkGroup.tsx`: PopoverContent now carries the §1.2 glass treatment directly —
  `background rgba(252,253,251,0.72)` + `backdropFilter blur(16px) saturate(1.5)` +
  white-alpha border + soft shadow; panel `minW 176`, body `px/py 1.5`, items `px 2.5
  py 1.5` `borderRadius sm`, trigger `py 6px` (sleeker). NOT done in the popover recipe —
  that would glass every popover app-wide (search suggestions etc.); scoped to nav.
- `SearchBarInput.tsx` (hero variant only): form bg `transparent` (was `bg.primary`),
  input bg `rgba(252,253,251,0.12)` + `backdropFilter blur(12px) saturate(1.5)`; env
  `heroBanner.search.background` still overrides when set. Non-hero search bars unchanged.
Verified in browser: dropdown measures `rgba(252,253,251,0.72)` + blur, 176×80;
hero search input shows translucent glass with the dark hero bleeding through.
Note: nav dropdown triggers render as `span[data-part=trigger]` (not `li`) — locate via
`[data-part="trigger"]` + text. Synthetic cua hovers don't trigger the address highlight
(100ms timer + React events); add the class directly to inspect it.

### Five-piece polish: dropdown hover, search text, hero subtext, scrim, frosted tooltips (done 2026-09-28, **uncommitted**)
1. **Dropdown sub-option hover → brand blue:** new `hoverColor` prop on `NavLink`
   (`_hover: { color: hoverColor ?? 'g8primary' }` in BOTH branches — the no-textColor
   branch needed its own spread to override the `variant="navigation"` link styles);
   `NavLinkGroup` passes `hoverColor="g8primary"`. Verified `rgb(12,144,184)` on hover.
2. **Hero search typed text → white:** `SearchBarInput` Input `color` is `white` when
   `isHeroBanner` (was `_light: black` — invisible on the glass). Inner-page inputs keep
   black.
3. **Hero subtext** under the title in `HeroBanner.tsx` (ChakraText — DOM `Text` global
   exists, don't import `Text` name there): "Inspect and analyze G8Chain Distributed
   Ledger Infrastructure. Search transactions, verify smart contracts, and explore
   addresses across the G8Chain ecosystem." — `maxW 560`, 15/16px, `rgba(242,247,251,0.72)`.
4. **Scrim covers the console panel when hero search is open:** `SearchBarBackdrop` is
   now wrapped in `<Portal>` (body child). Root cause: the hero's full-bleed
   `transform: translateX(-50%)` created a stacking context that trapped the old
   in-tree fixed backdrop, so the console panel + SocketNewItemsNotice ("scanning new
   transactions…") painted above the dim. Portaled backdrop z-1300 now covers all page
   content; verified via elementFromPoint over the notice.
5. **Frosted tooltips app-wide:** tooltip recipe `regular` variant → `--tooltip-bg:
   rgba(252,253,251,0.72)`, `backdropFilter: blur(16px) saturate(1.5)`,
   `color: text.primary` (was gray.900 bg + white text). Applies to every regular
   tooltip (address hover, token hover, stat cells); `popover`-variant tooltips unchanged.
Verified: tsc + ESLint clean, vitest 9/9, all five measured in the live browser.

### 12px icon pass + hero spacing + token icon in tx rows (done 2026-09-28, **uncommitted**)
1. **Copy button 12×12 app-wide:** `CopyToClipboard` default `boxSize` 5 → **3** (12px).
   Follow-up fix in `src/toolkit/chakra/icon-button.tsx`: IconButton force-clones its icon
   child to a fixed 20px (`boxSize: 5`) for the `2xs` size, which overflowed the shrunken
   button — the clone now uses `rest.boxSize ?? (size === '2xs_alt' ? 3 : 5)`, so an
   explicit button boxSize scales the icon too. Verified on / + /txs: button AND svg both
   12px (60 buttons on /txs). Note: client-side nav right after a recompile can serve a
   stale chunk — hard-reload before measuring.
2. **Contract icon 12×12:** AddressEntity contract branch (verified/regular/proxy/safe)
   passes `boxSize="12px"` (was the 20px default from `getIconProps` content variant).
   Verified on /txs: all `contracts/*` sprite icons measure 12px.
3. **Homepage tx rows — token recipient icon:** in `LatestTxsItem`, the recipient slot
   shows `TokenIconPlaceholder boxSize 12px` when `tokenTransfer?.token || dataTo.is_contract`
   (Usdt and other tokens/contracts), else the gradient square (plain wallets). From-address
   keeps the gradient square.
4. **Hero spacing:** title `mb` 8/10 → 4/5, subtext keeps `mt 2`, search bar gets `mt 5`
   — clear air between title → subtext → search.
Verified: tsc + ESLint clean, vitest 21/21, homepage + /txs screenshots (copy 12,
contract icons 12, token icon before Usdt).

### Monospace machine data on list pages (done 2026-09-28, **uncommitted**)
User: block numbers, tx hashes, and addresses on the explorer list pages in Space Mono.
- Blocks page (`BlocksTableItem.tsx`): BlockEntity `fontFamily="mono"` + miner
  AddressEntity `fontFamily="mono"`.
- Transactions page (`TxsTableItem.tsx`): TxEntity `fontFamily="mono"`; AddressFromTo got
  a new `fontFamily?: string` prop (forwarded to the container Flex + both AddressEntity
  instances in BOTH compact and long modes) — passed `"mono"`.
- Accounts page (`AddressesTableItem.tsx`): AddressEntity `fontFamily="mono"`.
- Token transfers page (`TokenTransfersTableItem.tsx`): TxEntity + AddressFromTo `"mono"`.
Verified in browser on all four pages: block numbers, tx hashes, addresses all measure
`"Space Mono"`. Note: BlockEntity's `fontFamily` prop works on its link (props inherit),
no textStyle conflict.

### Tabs → G8CHAIN filter-button look app-wide (done 2026-09-28, **uncommitted**)
User reference: small bordered uppercase tab buttons — idle: transparent bg, `#dce3e9`
border, `#89929d` text; selected: `#edf8fb` bg, `#a3cede` border, `#0c90b8` text; hover:
border `#a3cede` + text blue; transition .25s ease. Implemented in the **tabs recipe**
(`src/toolkit/theme/recipes/tabs.recipe.ts`) so every tab surface in the explorer gets
it: `solid` (default for AdaptiveTabs/RoutedTabs — txs, blocks, tokens, address/token/
contract details), `secondary` (contract details), and `segmented` (contract code — kept
its joined geometry, adopted the colors). Trigger: Space Mono 11px/600/0.04em uppercase,
`px 9px py 7px`, `minH 28`, 1px border, radius none, list `gap 1.5`.
Verified on /txs (Mined/Pending), /token-transfers (FILTER button shares the look),
and an /address detail page (6 tabs, Details selected): all measure exactly the
reference colors + Space Mono.

### Vercel deployment (set up 2026-09-28, committed `39fe67984`)
Symptom: Hobby deploy stuck >20min on "Creating an optimized production build".
Diagnosis: production build peaked at **3.47GB RSS locally** (15 page-data workers +
compiler-API type check) vs Vercel Hobby's 4GB build machine → OOM stalls the runner with
no error surfaced. Fix (committed): `experimental.cpus: 4` +
`typescript.ignoreBuildErrors: true` in next.config.js (enforcement stays `pnpm lint:tsc`)
+ `vercel.json` buildCommand `pnpm svg:build-sprite && ./deploy/scripts/make_envs_script.sh
&& next build` (skips download_assets — its env URLs are unset; script itself skips
missing URLs gracefully). Verified: full build succeeds under a 3GB cap
(NODE_OPTIONS=--max-old-space-size=3072, BUILD_ID written).
**User's Vercel checklist (Hobby):** import repo, branch `g8chain-redesign`; add the
NEXT_PUBLIC_* env vars in Project Settings → Environment Variables (copy from .env.local
but change: APP_HOST → the vercel app domain, APP_ENV → production, API_HOST →
explorer.g8chain.com etc.); framework Next.js auto-detected; the in-repo vercel.json
supplies the build command. If it still OOMs: try NODE_OPTIONS=--max-old-space-size=3584
env var, or move type-checking back on with Pro. Client envs are baked at build →
envs.js (make_envs_script.sh) reads them from Vercel's build env; domain changes need
redeploy.

## Locked workflow rules (from user)

1. **Do NOT run the Playwright visual snapshot suite unless explicitly asked.**
   Some golden snapshots are stale by design; one deliberate `--update-snapshots` pass
   is planned at Phase 9 QA only. (There is one known flaky failure: `Home.pw.tsx`
   "degradation view", 14px diff vs `maxDiffPixels: 5` in `playwright-ct.config.ts` line 54 — unresolved, regen cancelled.)
2. Per-phase verification = **real-browser screenshot pass + `pnpm lint:tsc` + ESLint**.
3. Commit per phase with a descriptive message; push to `origin/g8chain-redesign`.
   (Never commit or push without the user asking.)
4. Keep `SPDX-License-Identifier: LicenseRef-Blockscout` headers on files.
5. Cite design-system sections in code comments (e.g. `§1.2`, `§5.4`).
6. Verify at **1440px and 375px** viewports; dev server at `http://localhost:3000`.

## Conventions

- Static checks: `pnpm lint:tsc`; `npx eslint <paths> --quiet` (`--fix` for stylistic, then re-Read files before editing).
- Vitest for slice specs: `npx vitest run src/slices/home`.
- When giving the user estimates or summaries, plain language (they asked what the Playwright
  visual tests are for — explain visual regression testing simply; still owed an answer if not yet given).

## Architecture notes

- **Shell:** `src/shell/` — `TopBar.tsx` (logo + search entry), `navigation/horizontal/`
  (`NavLink.tsx`, `NavLinkGroup.tsx`), `footer/Footer.tsx`, `layout/` (`LayoutHome.tsx`, `MainArea.tsx`).
- **Home:** `src/slices/home/pages/index/` — `Home.tsx` (hero + two-column latest area),
  `HeroBanner.tsx` (dark band, `BACKGROUND_DEFAULT` gradient), `stats/HomeStats.tsx`
  (10 stat widgets, `CELL_ACCENTS` palette), `blocks/LatestBlocks*.tsx`, `txs/LatestTxs*.tsx`.
- **Tx slice:** `src/slices/tx/components/` — `TxType.tsx` (badge colors), `TxFee.tsx`,
  `TxAdditionalInfo`, `entity/TxEntity.tsx` (hash row: icon + link + copy).
- **Address from/to:** `src/slices/address/components/from-to/AddressFromTo.tsx` (compact/long modes),
  `AddressFromToIcon.tsx` (in/out/self arrow), `src/slices/address/utils/tx.ts` (`getTxCourseType`).
- **Theme:** `src/toolkit/theme/foundations/typography.ts` — `BODY_TYPEFACE`/`HEADING_TYPEFACE`
  DM Sans, `MONO_TYPEFACE` Space Mono; `fonts.mono` token = `--chakra-fonts-mono`.
  Space Mono loaded via `_document.tsx` Google Fonts link (body slot).
- Config: `src/config/` slices/features; `NEXT_PUBLIC_VIEWS_TX_HIDDEN_FIELDS` env can hide
  value/fee (not set in this deployment — both visible).

## Gotchas (hard-won)

- **Chakra v3 textStyle beats style props:** the Heading's `textStyle` (e.g. `heading.xs`)
  emits a class with `font-family: var(--chakra-fonts-heading)` that outranks a `fontFamily`
  style prop. The `css` prop is dropped entirely by wrapped components (the `Heading` wrapper
  doesn't forward it). Inline `style={{ fontFamily: 'var(--chakra-fonts-mono)' }}` is the reliable override.
- **Chakra internal props override spread props** — pass dedicated props (`isFullBleed`) instead of style spreads.
- Dev server compiles on demand: after edits the page can briefly blank/skeleton — poll for
  rendered content before judging.
- Screenshot tooling can time out on a busy page; retry rather than assume breakage.
- Vitest runs are slow (~10–25s for home slice) — that's normal.

## Next steps (in order)

1. Fix the 4 ESLint errors in `NavLinkGroup.tsx`.
2. Browser-verify Phase 3.5 header fixes (top/scrolled, dropdowns, inner pages) at 1440/375.
3. Commit + push Phase 3.5 and the homepage latest-transactions restyle (when the user asks).
4. Answer the Playwright visual-regression question (plain language), if still owed.
5. Begin **Phase 5** — core explorer pages (txs/blocks lists & detail, address, token, contract).
