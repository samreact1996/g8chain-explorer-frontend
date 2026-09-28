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
            then the live activity console — one bordered white panel holding the
            latest blocks and transactions side by side (design system §1.3). */ }
        <Box as="main">
          <HeroBanner>
            <HomeStats/>
          </HeroBanner>
          <Box px={{ base: 3, lg: 6 }} maxW="1240px" mx="auto">
            <Box
              mt={ 8 }
              mb={ 10 }
              borderRadius="md"
              border="1px solid"
              borderColor="border.divider"
              overflow="hidden"
            >
              <Flex direction={{ base: 'column', lg: 'row' }} alignItems="stretch">
                { leftWidget }
                <Box flexGrow={ 1 } minW={ 0 } display="flex" flexDir="column">
                  <Transactions/>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </HomeRpcDataContextProvider>
    </HomeDataContextProvider>
  );
};

export default Home;
