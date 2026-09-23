# G8Chain Explorer — Integration State

## Status

Current stage:

**Frontend is successfully connected to the existing G8Chain Blockscout backend.**

## Verified endpoints

### Blocks

```text
GET https://explorer.g8chain.com/api/v2/blocks?size=1
```

Returns real G8Chain block JSON.

## Transactions

```text
GET https://explorer.g8chain.com/api/v2/transactions?size=5
```

Returns real transactions.

```text
GET https://explorer.g8chain.com/api/v2/main-page/transactions
```

Returns real homepage transaction data.

## Block-specific transactions

```text
GET https://explorer.g8chain.com/api/v2/blocks/4229210/transactions?size=5
```

returned an empty list because that particular block had zero transactions.

That was not a backend failure.

## Indexing

```text
GET https://explorer.g8chain.com/api/v2/main-page/indexing-status
```

Verified complete indexing.

## Stats

```text
GET https://explorer.g8chain.com/api/v2/stats
```

Verified real stats endpoint.

Do not hard-code the snapshot values into the UI.

## RPC

### Direct public RPC

```text
https://rpc.g8chain.com
```

Browser access from localhost failed CORS.

### Working local-development RPC

```text
https://explorer.g8chain.com/api/eth-rpc
```

Verified:

```text
eth_chainId      → 0x4313
eth_blockNumber  → a valid live block number during testing
```

## Local proxy configuration

The working local frontend uses:

```env
NEXT_PUBLIC_USE_NEXT_JS_PROXY=true
NEXT_PUBLIC_API_BASE_PATH=/
```

The incorrect configuration was:

```env
NEXT_PUBLIC_USE_NEXT_JS_PROXY=true
NEXT_PUBLIC_API_BASE_PATH=/api/v2
```

That caused duplicated `/api/v2` proxy paths and a 400 error.

Do not recreate that duplication.

## Current visual status

The official Blockscout frontend is running locally and is showing real G8Chain blocks/transaction data.

The design has not yet undergone the major G8Chain redesign.

## Do not touch

Unless a concrete requirement appears:

- G8Chain production backend
- G8Chain indexer
- G8Chain database
- production RPC
- production explorer DNS
- production deployment

## Next intended task

Map the current frontend source tree and then begin the redesign with shared visual foundations and the homepage.
