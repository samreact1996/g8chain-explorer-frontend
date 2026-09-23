# G8Chain Explorer — Design Brief

## Product positioning

The explorer should feel like:

**G8Chain's own professional distributed-ledger intelligence interface.**

Not:

**Blockscout with a new logo.**

The client is evaluating visual direction through a demo, so the visual transformation needs to be obvious.

## Design personality

- premium
- precise
- technical
- calm
- confident
- modern
- information-rich
- highly legible

## Visual principles

### 1. Information first

Numbers, addresses, hashes, timestamps and transaction states must be easy to scan.

### 2. Strong hierarchy

Every page should make the following clear:

- where the user is
- what entity they are viewing
- the entity's current state
- the most important information
- where deeper technical details live

### 3. Motion with purpose

Use motion for state transitions, navigation feedback, realtime updates, hover/focus feedback, and progressive reveal.

Avoid animation for decoration alone.

Support reduced-motion preferences.

### 4. Technical but approachable

An expert developer should feel at home. A non-expert should still understand the main status and meaning of common information.

### 5. Avoid visual clichés

Avoid overuse of neon, purple/blue Web3 gradients, glowing borders, huge decorative 3D crypto symbols, noisy backgrounds, and glass everywhere.

### 6. Responsive by design

Desktop and mobile should be intentionally designed. Do not just shrink the desktop table.

## Recommended global shell

```text
G8CHAIN
──────────────────────────────────────────────────
Explorer   Blocks   Transactions   Tokens   Contracts

                                     Search
                                     Connect
──────────────────────────────────────────────────
```

The exact navigation should follow verified feature availability.

## Homepage direction

Suggested hierarchy:

```text
G8Chain
Explore the distributed ledger

[ Search address / transaction / block / token ]

Network overview
[ Blocks ] [ Transactions ] [ Addresses ] [ Avg block time ]

Network activity
[ chart ]

Latest blocks
[ redesigned table/list ]

Latest transactions
[ redesigned table/list ]
```

The homepage should immediately communicate that this is G8Chain, the network is live, data is current, the explorer is useful, and search is the primary action.

## Search

Accept transaction hash, block number/hash, address, contract, token, and supported name-service values.

Provide keyboard focus, clear categorization, copy actions, fast result rendering, and useful empty/error states.

Use `Cmd + K` on macOS if the existing architecture supports it cleanly.

## Transaction page

The transaction page should feel like a high-quality technical record.

Recommended hierarchy:

```text
TRANSACTION
[ success / failed / pending ]

hash

FROM                     TO
address                  address

Value
Fee
Gas used
Gas price
Block
Nonce
Timestamp

Token transfers
Logs
Internal transactions
Input / decoded call
```

Only render sections backed by real data.

## Address page

Recommended hierarchy:

```text
ADDRESS
0x....

Balance
Transaction count
Contract status / identity

Transactions
Internal transactions
Token transfers
Tokens
NFTs, if available
Analytics, if supported
```

## Block page

Recommended hierarchy:

```text
BLOCK
#4,229,210

Timestamp
Transactions
Gas used
Gas limit
Fee / base fee where applicable
Miner / validator / sequencer where applicable
Parent block
Hash

Transactions in block
```

## Token page

Recommended hierarchy:

```text
TOKEN
Name
Symbol
Contract

Supply
Decimals
Holders
Transfers

Overview
Holders
Transfers
Contract
```

Do not invent price/market-cap data if unavailable.

## Contract page

Prioritize developer usability.

Recommended sections:

- overview
- verified source
- ABI
- read contract
- write contract
- events/logs
- transactions

The UI should make verified contracts feel trustworthy and easy to inspect.

## Data visualization

Charts should be readable, low-noise, tooltip-rich, responsive, and consistent with the design system.

Avoid chart decoration that does not communicate information.

## Typography

Use the repository's existing font system unless there is a strong reason to introduce another.

Prioritize tabular numerals where appropriate, clear hash/address styling, readable secondary text, strong headings, and predictable hierarchy.

## Branding

Centralize G8Chain brand tokens.

Do not hard-code brand colors in dozens of components.

Keep the branding layer replaceable.

## Public copy

Use "distributed ledger" in G8Chain-authored descriptive copy when appropriate.

Technical terms such as EVM, RPC, API, Blockscout, ERC-20, etc. can remain technical terms.
