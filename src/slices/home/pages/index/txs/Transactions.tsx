// SPDX-License-Identifier: LicenseRef-Blockscout

import { Box, Flex, Text } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import { SocketProvider } from 'src/api/socket/context';

import useAuth from 'src/features/account/hooks/useIsAuth';
import LatestWatchlistTxs from 'src/features/account/pages/home/LatestWatchlistTxs';
import LatestZetaChainCCTXs from 'src/features/chain-variants/zeta-chain/pages/home/LatestZetaChainCCTXs';
import LatestCrossChainTxs from 'src/features/cross-chain-txs/pages/home/LatestCrossChainTxs';
import LatestArbitrumDeposits from 'src/features/rollup/arbitrum/pages/home/LatestArbitrumDeposits';
import { layerLabels } from 'src/features/rollup/common/utils/layer';
import LatestOptimisticDeposits from 'src/features/rollup/optimism/pages/home/LatestOptimisticDeposits';

import config from 'src/config';

import { Link } from 'src/toolkit/chakra/link';
import AdaptiveTabs from 'src/toolkit/components/AdaptiveTabs/AdaptiveTabs';

import LatestTxs from './LatestTxs';

const rollupFeature = config.features.rollup;
const zetachainFeature = config.features.zetachain;
const crossChainTxsFeature = config.features.crossChainTxs;

// G8Chain activity console — transactions column (design system §1.3): accent square +
// mono uppercase header with a right-aligned "View all" link; when only one tab exists
// (the G8Chain setup) the tab bar is skipped and the feed renders directly.
const Transactions = () => {

  const isAuth = useAuth();

  const txsUrl = route({ pathname: `/txs`, query: zetachainFeature.isEnabled ? { tab: 'evm' } : undefined });

  const tabs = [
    zetachainFeature.isEnabled && {
      id: 'cctx',
      title: 'Cross-chain',
      component: (
        <SocketProvider url={ config.apis.zetachain?.socketEndpoint } name="zetachain">
          <LatestZetaChainCCTXs/>
        </SocketProvider>
      ),
    },
    {
      id: 'txn',
      title: (() => {
        if (zetachainFeature.isEnabled) {
          return 'ZetaChain EVM';
        }
        if (crossChainTxsFeature.isEnabled) {
          return 'Txns';
        }
        return 'Latest txn';
      })(),
      component: <LatestTxs/>,
    },
    rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && {
      id: 'deposits',
      title: `Deposits (${ layerLabels.parent }→${ layerLabels.current } txn)`,
      component: <LatestOptimisticDeposits/>,
    },
    rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && {
      id: 'deposits',
      title: `Deposits (${ layerLabels.parent }→${ layerLabels.current } txn)`,
      component: <LatestArbitrumDeposits/>,
    },
    crossChainTxsFeature.isEnabled && {
      id: 'cross_chain_txs',
      title: 'Cross-chain txns',
      component: <LatestCrossChainTxs/>,
    },
    isAuth && {
      id: 'watchlist',
      title: 'Watch list',
      component: <LatestWatchlistTxs/>,
    },
  ].filter(Boolean);

  const singleTab = tabs.length === 1 ? tabs[0] : undefined;

  return (
    <Box flexGrow={ 1 } minW={ 0 }>
      <Flex px={ 4 } pt={ 4 } pb={ 2 } alignItems="center" columnGap={ 2 }>
        <Box w="6px" h="6px" bg="#1F4DD8" flexShrink={ 0 } aria-hidden/>
        <Text
          fontFamily="mono"
          fontSize="12px"
          fontWeight={ 700 }
          letterSpacing="0.12em"
          textTransform="uppercase"
          lineHeight="20px"
        >
          Latest transactions
        </Text>
        <Link
          ml="auto"
          textStyle="xs"
          color="text.secondary"
          _hover={{ color: 'text.primary' }}
          href={ txsUrl }
          display="inline-flex"
          alignItems="center"
          columnGap={ 1 }
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden

          >
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
          View all
        </Link>
      </Flex>
      { singleTab ? singleTab.component : (
        <AdaptiveTabs tabs={ tabs } unmountOnExit={ false } listProps={{ px: 4, mb: 2 }}/>
      ) }
    </Box>
  );
};

export default Transactions;
