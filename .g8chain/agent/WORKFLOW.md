# G8Chain Explorer — Development Workflow

## Phase 0 — Baseline protection

Before redesigning:

1. Ensure the application runs.
2. Ensure the current G8Chain API integration works.
3. Ensure `git status` is clean except for intentional work.
4. Work on the redesign branch.
5. Never change production infrastructure.

Capture screenshots of the baseline homepage and at least one block page, transaction page, and address page.

## Phase 1 — Source audit

Map the actual repository.

Identify exact files/components for:

- app shell
- navigation
- homepage
- homepage stats
- latest blocks
- latest transactions
- search
- transaction list/detail
- block list/detail
- address
- token
- contract
- API/query layer
- design system
- theme

Write `docs/G8CHAIN-SOURCE-MAP.md`.

Do not redesign yet.

## Phase 2 — Design foundation

Change only shared visual primitives first:

- colors
- typography
- radii
- spacing
- surfaces
- borders
- shadows
- icon treatment
- buttons
- inputs
- cards
- tables
- badges

Goal: make the application start feeling like G8Chain without changing data behavior.

Regression check: homepage, blocks, transactions, address and contract routes must still load.

## Phase 3 — Global shell

Redesign header, navigation, logo treatment, global search, page container, footer, and responsive navigation.

Do not change API logic.

## Phase 4 — Homepage

Redesign homepage aggressively enough that the client can immediately see the new direction.

Prioritize hero/search, network overview, activity, latest blocks, and latest transactions.

Use real G8Chain data only.

## Phase 5 — Core explorer pages

Redesign:

1. transactions
2. transaction detail
3. blocks
4. block detail
5. address
6. token
7. contract

Maintain their existing data flows.

## Phase 6 — Developer experience

Polish verified contract UI, read contract, write contract, ABI/code, logs/events, and decoded transaction data.

## Phase 7 — Analytics and secondary features

Only after core explorer pages are stable, address statistics, charts, gas tracker, optional integrations, and wallet enhancements.

Enable only supported capabilities.

## Phase 8 — Mobile

Test intentionally at 320px, 375px, 390px, 430px, tablet widths, and desktop widths.

Do not simply shrink desktop tables.

## Phase 9 — QA

Run at minimum:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Run relevant test suites.

Use Playwright for key flows if already configured.

Check browser console for errors, hydration warnings, failed network requests, duplicate API requests, and CORS problems.

## Phase 10 — Demo readiness

Prepare a stable local demo, staging deployment, short client-facing walkthrough, screenshots/video if desired, and known limitations.

Do not replace the production explorer.

## Agent reporting format

After each major phase, report:

### Changed
What files/areas changed.

### Preserved
What backend/API/data behavior was intentionally untouched.

### Tested
What commands/routes were checked.

### Known issues
Anything still unresolved.

### Next
The next smallest logical phase.

## Stop conditions

Stop and investigate instead of continuing when:

- an API request path changes unexpectedly
- a production endpoint becomes the target
- indexed data disappears
- a feature requires an unknown backend service
- a design change breaks a working route
- licensing/attribution requirements become unclear
