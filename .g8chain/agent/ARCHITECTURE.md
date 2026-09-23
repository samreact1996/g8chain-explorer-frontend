# G8Chain Explorer — Technical Architecture

## Target architecture

```text
                           G8Chain
                              │
                              ▼
                     Existing RPC / chain
                              │
                              ▼
                   Existing Blockscout stack
                   ┌─────────────────────────┐
                   │ Indexer                 │
                   │ Database                │
                   │ Core API                │
                   │ Stats / optional APIs   │
                   │ WebSocket / optional    │
                   └────────────┬────────────┘
                                │
                                ▼
                     Customized frontend
                   ┌─────────────────────────┐
                   │ Next.js / React         │
                   │ G8Chain design system   │
                   │ Explorer views          │
                   │ Search                  │
                   │ Wallet UI               │
                   │ Analytics               │
                   └─────────────────────────┘
                                │
                                ▼
                      Demo / staging site
```

## Responsibility boundaries

### Blockscout backend owns

- blockchain indexing
- indexed transaction data
- indexed block data
- address activity
- token information
- contract data
- logs/events
- internal transactions
- explorer APIs
- backend statistics
- backend realtime services where configured

### Frontend owns

- information architecture
- layout
- navigation
- visual design
- UX
- search experience
- responsive behavior
- data presentation
- loading/empty/error states
- charts and interactions
- wallet presentation
- client-side/direct-RPC interactions where required

## API hierarchy

```text
React/Next.js UI
      │
      ▼
Blockscout query/service layer
      │
      ├── Core API
      │     ├── blocks
      │     ├── transactions
      │     ├── addresses
      │     ├── tokens
      │     ├── contracts
      │     └── other explorer data
      │
      ├── Stats API
      │     └── counters/charts where available
      │
      ├── WebSocket
      │     └── realtime data where available
      │
      └── RPC
            ├── eth_call
            ├── eth_getBalance
            ├── eth_getCode
            ├── eth_chainId
            └── wallet/direct chain actions where appropriate
```

## Integration rule

Prefer Blockscout indexed APIs for explorer data.

Use direct RPC only when the feature genuinely requires live chain interaction or a value not provided by Blockscout.

Do not create duplicate indexing logic in React.

## Data flow example

### Transaction page

```text
Route /tx/[hash]
        ↓
existing transaction query/service
        ↓
Blockscout Core API
        ↓
normalized/typed data
        ↓
G8Chain Transaction UI
```

### Contract write

```text
Contract page
        ↓
verified ABI / contract metadata
        ↓
wallet connection
        ↓
viem/wagmi or repository-native wallet layer
        ↓
RPC
        ↓
user confirmation
        ↓
transaction submitted
        ↓
Blockscout indexes transaction
        ↓
UI refreshes from explorer API
```

## Development architecture

For local work:

```text
Browser
   │
   ▼
localhost:3000
   │
   ├── Next.js proxy for Blockscout API
   │
   └── configured RPC endpoint
           ↓
explorer.g8chain.com
```

For production, evaluate whether direct API calls with correct CORS or a deliberately scoped server-side proxy are appropriate. Do not blindly carry the local proxy architecture into production.

## Optional services

The current Blockscout frontend supports additional APIs/services such as Stats API, metadata, contract-info, name service, multichain, rewards, user/account services, and other optional integrations.

Do not enable or invent these services unless the G8Chain deployment actually supports them and the feature is needed.

## Design-system architecture

Prefer:

```text
global tokens
   ↓
shared primitives
   ↓
shared explorer components
   ↓
page-specific compositions
```

Do not create page-specific versions of basic cards, tables, badges, buttons, inputs, or typography without a concrete reason.

## Source of truth

For each feature, identify its current implementation before modifying it.

Do not assume file names based on another Blockscout version.
