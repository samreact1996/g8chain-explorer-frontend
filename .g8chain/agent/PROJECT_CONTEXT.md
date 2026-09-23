# G8Chain Explorer — Project Context

## Client

Client operates G8Chain and currently exposes a Blockscout-powered explorer at:

`https://explorer.g8chain.com/`

## User's objective

Create a client-facing redesigned explorer demo.

The client has not yet specified whether they want a complete frontend replacement or a substantial design upgrade of the existing Blockscout experience.

Therefore the current strategy is intentionally reversible.

## Current strategy

Use the official Blockscout frontend as the application baseline.

Customize its UI heavily.

Keep the existing G8Chain Blockscout backend/API/RPC.

Do not build a new backend for the demo.

## Why this strategy

The data and explorer functionality already work.

The project does not need a second indexer, Postgres database, backend API, or RPC infrastructure for the demo.

The demo should prove the design direction quickly.

## Current local project

The local repository is a private fork/custom clone of the official Blockscout frontend.

Local path used during setup:

`~/Desktop/g8chain-explorer-frontend`

Local application:

`http://localhost:3000`

Development command:

`pnpm dev`

## Verified G8Chain integration

### Core API

`https://explorer.g8chain.com/api/v2`

Verified endpoint:

`GET /api/v2/blocks?size=1`

returned real block data.

Verified transaction endpoints:

`GET /api/v2/transactions?size=5`

`GET /api/v2/main-page/transactions`

returned real transactions.

Verified indexing status:

`GET /api/v2/main-page/indexing-status`

returned:

- finished_indexing: true
- finished_indexing_blocks: true
- indexed_blocks_ratio: 1.00
- indexed_internal_transactions_ratio: 1

### Stats

`GET /api/v2/stats`

returned real network statistics, including a diagnostic snapshot of total addresses, total blocks, total transactions, average block time, gas prices, coin price and market cap.

These are diagnostic snapshots, not hard-coded product values.

### RPC

Direct public RPC:

`https://rpc.g8chain.com`

returned chain ID `0x4313`.

Browser access from localhost initially failed CORS.

The existing Blockscout RPC endpoint solved the local browser CORS problem:

`https://explorer.g8chain.com/api/eth-rpc`

It returned `eth_chainId → 0x4313` and a valid current `eth_blockNumber` during testing.

The local frontend is currently configured to use the Blockscout `/api/eth-rpc` endpoint for local development.

## Chain

Chain ID: `17171`

Hex: `0x4313`

Network: `G8Chain`

Native symbol currently configured in the working frontend: `G8C`

Native decimals currently configured: `18`

Treat the RPC/API as authoritative if an inconsistency is discovered.

## Current .env.local essentials

```env
NEXT_PUBLIC_APP_PROTOCOL=http
NEXT_PUBLIC_APP_HOST=localhost
NEXT_PUBLIC_APP_PORT=3000
NEXT_PUBLIC_APP_ENV=development

NEXT_PUBLIC_API_PROTOCOL=https
NEXT_PUBLIC_API_HOST=explorer.g8chain.com
NEXT_PUBLIC_API_BASE_PATH=/
NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL=wss

NEXT_PUBLIC_NETWORK_NAME=G8Chain
NEXT_PUBLIC_NETWORK_SHORT_NAME=G8C
NEXT_PUBLIC_NETWORK_ID=17171
NEXT_PUBLIC_NETWORK_RPC_URL=https://explorer.g8chain.com/api/eth-rpc

NEXT_PUBLIC_NETWORK_CURRENCY_NAME=G8Chain
NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL=G8C
NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS=18

NEXT_PUBLIC_IS_TESTNET=false

NEXT_PUBLIC_USE_NEXT_JS_PROXY=true
```

## Important environment note

The `/` base path plus `NEXT_PUBLIC_USE_NEXT_JS_PROXY=true` is intentional for this local setup.

The previous incorrect combination caused requests like:

`/node-api/proxy/api/v2/api/v2/main-page/transactions`

and a 400 response.

The corrected setup now works.

## What has already been solved

- Git/tag startup issue
- local frontend startup
- G8Chain Core API connection
- browser CORS issue for the RPC
- proxy path duplication issue
- real block data
- real transaction data
- real indexing-status verification

Do not reopen these problems unless a later change breaks them.

## Next intended task

Map the current frontend source tree and then begin the redesign with shared visual foundations and the homepage.
