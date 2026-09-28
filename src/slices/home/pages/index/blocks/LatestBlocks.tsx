// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra, Box, Flex, Text, VStack } from '@chakra-ui/react';
import { upperFirst } from 'es-toolkit';
import { route } from 'nextjs-routes';
import React from 'react';

import type { schemas } from '@blockscout/api-types';

import getChainUtilizationParams from 'src/slices/chain/get-chain-utilization-params';
import useStatsQuery from 'src/slices/chain/stats/useStatsQuery';
import { useHomeDataContext } from 'src/slices/home/contexts/home-data-context';

import config from 'src/config';
import useIsMobile from 'src/shared/hooks/useIsMobile';
import useInitialList from 'src/shared/lists/useInitialList';

import { Link } from 'src/toolkit/chakra/link';
import { Skeleton } from 'src/toolkit/chakra/skeleton';
import { Tooltip } from 'src/toolkit/chakra/tooltip';
import { nbsp } from 'src/toolkit/utils/htmlEntities';

import LatestBlocksDegraded from './LatestBlocksDegraded';
import LatestBlocksItem from './LatestBlocksItem';

// G8Chain activity console — blocks column (design system §1.3): accent square +
// mono uppercase header with a right-aligned "View all" link, then borderless
// block rows separated by hairlines. The transactions column sits behind a
// vertical hairline divider to the right.
const LatestBlocks = () => {
  const isMobile = useIsMobile();
  // const blocksMaxCount = isMobile ? 2 : 3;
  let blocksMaxCount: number;
  if (config.features.rollup.isEnabled || config.slices.block.hiddenFields?.total_reward) {
    blocksMaxCount = isMobile ? 4 : 5;
  } else {
    blocksMaxCount = isMobile ? 2 : 4;
  }
  const { blocksQuery } = useHomeDataContext();
  const initialList = useInitialList<schemas['Block']>({
    data: blocksQuery?.data ?? [],
    idFn: (block) => block.height,
    enabled: Boolean(blocksQuery && !blocksQuery.isPlaceholderData),
  });

  const statsQueryResult = useStatsQuery();

  const content = (() => {
    if (blocksQuery?.isError) {
      return <LatestBlocksDegraded maxNum={ blocksMaxCount }/>;
    }
    if (blocksQuery?.data && blocksQuery.data.length > 0) {
      const dataToShow = blocksQuery.data.slice(0, blocksMaxCount);

      return (
        <VStack
          flex={ 1 }
          gap={ 0 }
          overflow="hidden"
          alignItems="stretch"
          css={{ '& > * + *': { borderTopWidth: '1px', borderTopColor: 'border.divider' } }}
        >
          { dataToShow.map(((block, index) => (
            <LatestBlocksItem
              key={ block.height + (blocksQuery.isPlaceholderData ? String(index) : '') }
              block={ block }
              isLoading={ blocksQuery.isPlaceholderData }
              animation={ initialList.getAnimationProp(block) }
            />
          ))) }
        </VStack>
      );
    }
    return <Box textStyle="sm" px={ 4 } pb={ 3 }>No latest blocks found.</Box>;
  })();

  const networkUtilization = getChainUtilizationParams(statsQueryResult.data?.network_utilization_percentage ?? 0);

  return (
    <Box
      width={{ base: '100%', lg: '300px' }}
      flexShrink={ 0 }
      display="flex"
      flexDir="column"
      borderRightWidth={{ base: 0, lg: '1px' }}
      borderBottomWidth={{ base: '1px', lg: 0 }}
      borderColor="border.divider"
    >
      <Flex px={ 4 } pt={ 4 } pb={ 2 } alignItems="center" columnGap={ 2 }>
        <Box w="6px" h="6px" bg="#0C90B8" flexShrink={ 0 } aria-hidden/>
        <Text
          fontFamily="mono"
          fontSize="12px"
          fontWeight={ 700 }
          letterSpacing="0.12em"
          textTransform="uppercase"
          lineHeight="20px"
        >
          Latest blocks
        </Text>
        <Link
          ml="auto"
          textStyle="xs"
          color="text.secondary"
          _hover={{ color: 'text.primary' }}
          href={ route({ pathname: '/blocks' }) }
          loading={ blocksQuery?.isPlaceholderData }
          display="inline-flex"
          alignItems="center"
          columnGap={ 1 }
        >
          <ViewAllArrow/>
          View all
        </Link>
      </Flex>
      { typeof statsQueryResult.data?.network_utilization_percentage === 'number' && (
        <Skeleton loading={ statsQueryResult.isPlaceholderData } px={ 4 } pb={ 2 } display="flex" textStyle="xs" color="text.secondary">
          <Text as="span">
            Network utilization:{ nbsp }
          </Text>
          <Tooltip content={ `${ upperFirst(networkUtilization.load) } load` }>
            <Text as="span" color={ networkUtilization.color } fontWeight={ 700 }>
              { statsQueryResult.data?.network_utilization_percentage.toFixed(2) }%
            </Text>
          </Tooltip>
        </Skeleton>
      ) }
      { statsQueryResult.data?.celo && (
        <Box whiteSpace="pre-wrap" textStyle="xs" color="text.secondary" px={ 4 } pb={ 2 }>
          <span>Current epoch: </span>
          <Box as="span" fontWeight={ 700 }>{ statsQueryResult.data.celo.epoch_number }</Box>
        </Box>
      ) }
      <Box pb={ 2 } flex={ 1 } display="flex" flexDir="column">
        { content }
      </Box>
    </Box>
  );
};

// small arrow leading the "View all" links in the console headers
const ViewAllArrow = () => (
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
);

export default React.memo(chakra(LatestBlocks));
