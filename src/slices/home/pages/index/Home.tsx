// SPDX-License-Identifier: LicenseRef-Blockscout

import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import { HomeDataContextProvider } from 'src/slices/home/contexts/home-data-context';
import { HomeRpcDataContextProvider } from 'src/slices/home/contexts/rpc-data-context';

import LatestArbitrumL2Batches from 'src/features/rollup/arbitrum/pages/home/LatestArbitrumL2Batches';

import config from 'src/config';

import LatestBlocks from './blocks/LatestBlocks';
import HeroBanner from './HeroBanner';
import HomeStats from './stats/HomeStats';
import Transactions from './txs/Transactions';

const rollupFeature = config.features.rollup;

const Home = () => {
  const leftWidget = (() => {
    if (rollupFeature.isEnabled && !rollupFeature.homepage.showLatestBlocks) {
      switch (rollupFeature.type) {
        case 'arbitrum':
          return <LatestArbitrumL2Batches/>;
      }
    }

    return <LatestBlocks/>;
  })();

  return (
    <HomeDataContextProvider>
      <HomeRpcDataContextProvider>
        { /* G8Chain homepage: dark hero band (title + glass search + network stats),
            then the latest blocks/transactions below on the light background */ }
        <Box as="main">
          <HeroBanner>
            <HomeStats/>
          </HeroBanner>
          <Flex mt={ 8 } direction={{ base: 'column', lg: 'row' }} columnGap={ 12 } rowGap={ 6 }>
            { leftWidget }
            <Box flexGrow={ 1 }>
              <Transactions/>
            </Box>
          </Flex>
        </Box>
      </HomeRpcDataContextProvider>
    </HomeDataContextProvider>
  );
};

export default Home;
