// SPDX-License-Identifier: LicenseRef-Blockscout

import { Box, Text, VStack } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import useApiQuery from 'src/api/hooks/useApiQuery';
import SocketNewItemsNotice from 'src/api/socket/SocketNewItemsNotice';

import { AddressHighlightProvider } from 'src/slices/address/contexts/address-highlight';
import useNewTxsSocket from 'src/slices/tx/hooks/useTxsSocketTypeAll';
import { TX } from 'src/slices/tx/stubs/tx';

import config from 'src/config';

import LatestTxsDegraded from './LatestTxsDegraded';
import LatestTxsItem, { LATEST_TXS_TABLE_MIN_WIDTH } from './LatestTxsItem';

const zetachainFeature = config.features.zetachain;

// G8Chain activity console — transactions feed (design system §1.3): borderless rows
// separated by hairlines inside the console panel.
const LatestTxs = () => {
  const txsCount = 5;
  const { data, isPlaceholderData, isError } = useApiQuery('core:homepage_txs', {
    queryOptions: {
      placeholderData: Array(txsCount).fill(TX),
    },
  });

  const { num, showErrorAlert } = useNewTxsSocket({ type: 'txs_home', isLoading: isPlaceholderData });

  if (isError) {
    return <LatestTxsDegraded maxNum={ txsCount }/>;
  }

  if (data) {
    const txsUrl = route({ pathname: `/txs`, query: zetachainFeature.isEnabled ? { tab: 'evm' } : undefined });
    return (
      <AddressHighlightProvider>
        <Box textStyle="sm" display="flex" flexDir="column" flex={ 1 }>
          <Box overflowX={{ base: 'auto', lg: 'unset' }} px={{ base: 3, lg: 0 }} flex={ 1 } display="flex" flexDir="column">
            <Box minW={ LATEST_TXS_TABLE_MIN_WIDTH } flex={ 1 } display="flex" flexDir="column">
              <SocketNewItemsNotice
                borderBottomRadius={ 0 }
                minW={ LATEST_TXS_TABLE_MIN_WIDTH }
                url={ txsUrl }
                num={ num }
                showErrorAlert={ showErrorAlert }
                isLoading={ isPlaceholderData }
              />
              <VStack
                flex={ 1 }
                gap={ 0 }
                overflow="hidden"
                alignItems="stretch"
                mt={ 2 }
                css={{ '& > * + *': { borderTopWidth: '1px', borderTopColor: 'border.divider' } }}
              >
                { data.slice(0, txsCount).map(((tx, index) => (
                  <LatestTxsItem
                    key={ tx.hash + (isPlaceholderData ? index : '') }
                    tx={ tx }
                    isLoading={ isPlaceholderData }
                  />
                ))) }
              </VStack>
            </Box>
          </Box>
        </Box>
      </AddressHighlightProvider>
    );
  }

  return <Text>No latest transactions found.</Text>;
};

export default LatestTxs;
