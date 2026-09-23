# G8Chain Explorer — Acceptance Criteria

## Integration

- [ ] Local frontend starts with `pnpm dev`
- [ ] Real G8Chain blocks load
- [ ] Real G8Chain transactions load
- [ ] Search works for real data
- [ ] Block pages work
- [ ] Transaction pages work
- [ ] Address pages work
- [ ] Token pages work where supported
- [ ] Contract pages work where supported
- [ ] No CORS regression
- [ ] No duplicated `/api/v2` proxy path
- [ ] RPC chain ID remains 17171

## Design

- [ ] Branding is clearly G8Chain
- [ ] Application no longer looks like untouched default Blockscout
- [ ] Typography is coherent
- [ ] Spacing is coherent
- [ ] Colors are centralized
- [ ] Cards/tables/badges are consistent
- [ ] Navigation is polished
- [ ] Search is visually prominent
- [ ] Homepage has clear hierarchy
- [ ] Transaction page is easy to scan
- [ ] Block page is easy to scan
- [ ] Address page is easy to scan
- [ ] Contract UX is developer-friendly
- [ ] Mobile design is intentional
- [ ] Motion respects reduced-motion settings

## Data integrity

- [ ] No fake metrics
- [ ] No invented token prices
- [ ] No fabricated chart values
- [ ] Exact blockchain values preserve precision
- [ ] Unavailable data is clearly marked as unavailable
- [ ] Empty states distinguish "no data" from "loading failed"

## Engineering

- [ ] API logic remains separated from UI
- [ ] No large duplicate fetch implementations
- [ ] Shared components are reused
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Build passes
- [ ] No unexpected console errors
- [ ] No hydration errors
- [ ] No excessive polling
- [ ] No unnecessary data overfetching

## Routing

- [ ] Existing transaction URLs work
- [ ] Existing address URLs work
- [ ] Existing block URLs work
- [ ] Existing token URLs work
- [ ] Existing contract URLs work
- [ ] Redirects/aliases are used where a route must change

## Demo

- [ ] Production explorer is untouched
- [ ] Local/staging demo is stable
- [ ] A client walkthrough can be completed without dev tools
- [ ] The visual redesign is obvious within the first minute
- [ ] Known limitations are documented

## Licensing / attribution

- [ ] Current Blockscout licence reviewed for intended client use
- [ ] Required Blockscout attribution is preserved
- [ ] Commercial/third-party deployment rights are confirmed before client production delivery
