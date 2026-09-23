# G8Chain Explorer — Non-Negotiable Rules

## 1. Backend preservation

The existing G8Chain Blockscout backend is the source of truth for indexed explorer data.

Do not:

- modify the production Blockscout indexer
- modify the production database
- migrate production data
- create a second indexer for the demo
- replace the existing explorer backend
- duplicate indexed blockchain data without a real need

Frontend work must remain frontend work.

## 2. API layer protection

Do not scatter API calls through presentation components.

Use the repository's existing Blockscout API/query/service architecture.

Before changing any API abstraction:

- identify why the existing abstraction is insufficient
- document the change
- keep response normalization isolated
- do not duplicate the same request logic in multiple components

## 3. No fake data

Production UI must never invent block counts, transaction counts, TPS, gas values, balances, token supply, token prices, validators/miners, or historical chart values.

Use real API data or display an explicit unavailable/empty state.

## 4. Do not "fix" working integration casually

The following local development configuration is already proven:

- Core API host: `explorer.g8chain.com`
- Core API path behavior: `NEXT_PUBLIC_API_BASE_PATH=/` with the Next.js proxy enabled
- Local API proxy: `NEXT_PUBLIC_USE_NEXT_JS_PROXY=true`
- Local RPC: `https://explorer.g8chain.com/api/eth-rpc`

Do not revert these because they look unusual.

## 5. Production proxy rule

`NEXT_PUBLIC_USE_NEXT_JS_PROXY=true` is for the local development workflow unless a production architecture explicitly calls for it.

The current Blockscout documentation advises against using the Next.js proxy in production at scale because routing all API requests through the Node.js server can create performance issues.

## 6. Don't expose secrets

Anything prefixed `NEXT_PUBLIC_` is browser-visible.

Never put private keys, seed phrases, passwords, server-only secrets, or privileged API credentials into public environment variables.

## 7. Wallet safety

Wallet connection must remain optional for read-only explorer usage.

Never ask a user for seed phrases, private keys, or raw wallet credentials.

Never sign a transaction silently.

Clearly display user-facing transaction/signature actions.

## 8. Precision

Never use JavaScript floating-point arithmetic for token/wei calculations where exactness matters.

Use BigInt or the repository's safe numeric abstractions.

## 9. Routing

Preserve existing useful explorer URL patterns wherever practical.

If a route is changed, provide a compatible redirect/alias when it is low-risk.

Do not casually break links to transactions, addresses, blocks, tokens, or contracts.

## 10. Accessibility

Every redesigned component must remain keyboard usable, semantically structured, focus-visible, screen-reader understandable where relevant, compatible with reduced motion, and readable at mobile sizes.

## 11. Performance

Do not make the homepage fetch large unbounded datasets.

Use existing pagination, query caching, request deduplication, lazy loading, appropriate server/client boundaries, and virtualization only where genuinely needed.

Do not proxy every request through a server merely because it is easier.

## 12. Styling discipline

Do not create one-off styling systems for individual pages if a shared design token/component can solve the problem.

Prefer central theme/tokens, reusable components, consistent spacing, consistent radii, consistent typography, and reusable table/card patterns.

## 13. Progressive redesign

Do not rewrite the entire application in one pass.

Redesign in controlled slices:

1. visual foundation
2. global shell
3. homepage
4. search
5. transaction
6. block
7. address
8. token
9. contract
10. analytics
11. mobile/edge states
12. polish

After each slice, run the app, test affected routes, and run typecheck/lint/tests as appropriate.

## 14. Comments and documentation

Do not add comments that merely restate obvious code.

Do document non-obvious Blockscout behavior, API quirks, G8Chain-specific assumptions, workarounds, proxy behavior, and integration constraints.

## 15. Attribution/licence

Do not remove required Blockscout notices/attribution without first confirming the applicable current licence requirements and commercial rights.

## 16. When uncertain

Do not guess.

Investigate the actual code, API response, configuration, or official documentation.

If an assumption is necessary, record it in documentation.
