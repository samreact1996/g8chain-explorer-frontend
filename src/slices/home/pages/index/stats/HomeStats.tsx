// SPDX-License-Identifier: LicenseRef-Blockscout

import { Grid } from '@chakra-ui/react';
import React from 'react';

import { isHomeStatsItemEnabled, sortHomeStatsItems } from 'src/slices/home/utils/stats';

import type { Props as HomeStatsWidgetProps } from './HomeStatsWidget';
import HomeStatsAverageBlockTime from './widgets/HomeStatsAverageBlockTime';
import HomeStatsBtcLocked from './widgets/HomeStatsBtcLocked';
import HomeStatsCurrentEpoch from './widgets/HomeStatsCurrentEpoch';
import HomeStatsGasTracker from './widgets/HomeStatsGasTracker';
import HomeStatsLatestBatch from './widgets/HomeStatsLatestBatch';
import HomeStatsLatestBlock from './widgets/HomeStatsLatestBlock';
import HomeStatsLatestL1StateBatch from './widgets/HomeStatsLatestL1StateBatch';
import HomeStatsTotalAddresses from './widgets/HomeStatsTotalAddresses';
import HomeStatsTotalOperationalTxs from './widgets/HomeStatsTotalOperationalTxs';
import HomeStatsTotalTxs from './widgets/HomeStatsTotalTxs';

// G8Chain stat cell accents (brand + partner palette, design system §1.6)
const CELL_ACCENTS: Record<string, string> = {
  latest_batch: '#1F4DD8',
  total_blocks: '#0C90B8',
  average_block_time: '#38B3D4',
  total_txs: '#0a7495',
  total_operational_txs: '#1F4DD8',
  wallet_addresses: '#298E69',
  gas_tracker: '#0a7495',
  latest_l1_state_batch: '#1F4DD8',
  btc_locked: '#f59e0b',
  current_epoch: '#38B3D4',
};

const HomeStats = () => {
  const items = React.useMemo(() => {
    return [
      {
        id: 'latest_batch' as const,
        component: <HomeStatsLatestBatch/>,
      },
      {
        id: 'total_blocks' as const,
        component: <HomeStatsLatestBlock/>,
      },
      {
        id: 'average_block_time' as const,
        component: <HomeStatsAverageBlockTime/>,
      },
      {
        id: 'total_txs' as const,
        component: <HomeStatsTotalTxs/>,
      },
      {
        id: 'total_operational_txs' as const,
        component: <HomeStatsTotalOperationalTxs/>,
      },
      {
        id: 'wallet_addresses' as const,
        component: <HomeStatsTotalAddresses/>,
      },
      {
        id: 'gas_tracker' as const,
        component: <HomeStatsGasTracker/>,
      },
      {
        id: 'latest_l1_state_batch' as const,
        component: <HomeStatsLatestL1StateBatch/>,
      },
      {
        id: 'btc_locked' as const,
        component: <HomeStatsBtcLocked/>,
      },
      {
        id: 'current_epoch' as const,
        component: <HomeStatsCurrentEpoch/>,
      },
    ]
      .filter(Boolean)
      .filter(isHomeStatsItemEnabled)
      .sort(sortHomeStatsItems);
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <Grid
      gridTemplateColumns={{ base: '1fr 1fr', lg: 'repeat(5, 1fr)' }}
      gridGap={{ base: 2, lg: 0 }}
    >
      { items.map(({ id, component }, index) => {
        const isLastOdd = items.length % 2 === 1 && index === items.length - 1;
        const accent = CELL_ACCENTS[id] || '#0C90B8';
        return (
          <React.Fragment key={ id }>
            { React.isValidElement(component) ? (
              React.cloneElement(
                component as React.ReactElement<HomeStatsWidgetProps>,
                {
                  accent,
                  ...(
                    isLastOdd ?
                      { gridColumn: { base: 'span 2', lg: 'auto' } as HomeStatsWidgetProps['gridColumn'] } :
                      {}
                  ),
                },
              )
            ) : component }
          </React.Fragment>
        );
      }) }
    </Grid>
  );
};

export default React.memo(HomeStats);
