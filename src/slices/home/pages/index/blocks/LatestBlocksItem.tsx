// SPDX-License-Identifier: LicenseRef-Blockscout

import { Box, Flex } from '@chakra-ui/react';
import { capitalize } from 'es-toolkit';
import React from 'react';

import type { schemas } from '@blockscout/api-types';

import AddressEntity from 'src/slices/address/components/entity/AddressEntity';
import BlockEntity from 'src/slices/block/components/entity/BlockEntity';
import getBlockTotalReward from 'src/slices/block/utils/get-block-total-reward';
import { currencyUnits } from 'src/slices/chain/units';
import getChainValidatorTitle from 'src/slices/chain/verification-type/utils/get-chain-validator-title';

import config from 'src/config';
import TimeWithTooltip from 'src/shared/date-and-time/TimeWithTooltip';
import SimpleValue from 'src/shared/values/entity/SimpleValue';
import SpriteIcon from 'src/sprite/SpriteIcon';

import { Skeleton } from 'src/toolkit/chakra/skeleton';
import { Tooltip } from 'src/toolkit/chakra/tooltip';
import { thinsp } from 'src/toolkit/utils/htmlEntities';

type Props = {
  block: schemas['Block'];
  isLoading?: boolean;
  animation?: string;
};

// G8Chain activity console — block row (design system §1.3): borderless row inside the
// console panel; the block height is the hero (accent square + big mono number) with the
// time right-aligned, then stacked label/value lines: txn, reward, miner (plain mono
// address — no gradient square here, that motif belongs to the transaction rows).
// Rows stretch to fill the column height (flex 1) so both console columns end together.
const LatestBlocksItem = ({ block, isLoading, animation }: Props) => {
  const totalReward = getBlockTotalReward(block);
  const showCeloFlag = typeof block.celo?.l1_era_finalized_epoch_number === 'number';

  return (
    <Box
      animation={ animation }
      flex={ 1 }
      display="flex"
      flexDir="column"
      justifyContent="center"
      px={ 4 }
      py={ 3 }
      _hover={{ bg: 'rgba(12, 144, 184, 0.04)' }}
      transition="background-color .15s ease"
    >
      <Flex alignItems="center" overflow="hidden" w="100%" columnGap={ 2 }>
        <Box w="6px" h="6px" bg="#0C90B8" flexShrink={ 0 } aria-hidden/>
        <BlockEntity
          isLoading={ isLoading }
          number={ block.height }
          tailLength={ 2 }
          fontSize="18px"
          lineHeight="24px"
          fontWeight={ 700 }
          fontFamily="mono"
        />
        { showCeloFlag && (
          <Tooltip content={ `Finalized epoch #${ block.celo?.l1_era_finalized_epoch_number }` }>
            <SpriteIcon name="checkered_flag" boxSize={ 5 } p="1px" ml={ 1 } isLoading={ isLoading } flexShrink={ 0 }/>
          </Tooltip>
        ) }
        <TimeWithTooltip
          timestamp={ block.timestamp }
          enableIncrement={ !isLoading }
          timeFormat="relative"
          isLoading={ isLoading }
          color="text.secondary"
          display="inline-block"
          textStyle="xs"
          flexShrink={ 0 }
          ml="auto"
        />
      </Flex>
      <Flex
        mt={ 1.5 }
        ml={ 3 }
        flexDir="column"
        rowGap={ 0.5 }
        textStyle="xs"
      >
        { !config.features.rollup.isEnabled && (
          <Flex alignItems="center" columnGap={ 1.5 } flexShrink={ 0 }>
            <Skeleton loading={ isLoading } color="text.secondary">Txn</Skeleton>
            <Skeleton loading={ isLoading } fontFamily="mono">{ block.transactions_count }</Skeleton>
          </Flex>
        ) }
        { !config.features.rollup.isEnabled && !config.slices.block.hiddenFields?.total_reward && (
          <Flex alignItems="center" columnGap={ 1.5 } flexShrink={ 0 }>
            <Skeleton loading={ isLoading } color="text.secondary">Reward</Skeleton>
            <SimpleValue
              value={ totalReward }
              loading={ isLoading }
              color="text.primary"
              fontFamily="mono"
              endElement={ `${ thinsp }${ currencyUnits.ether }` }
            />
          </Flex>
        ) }
        { !config.features.rollup.isEnabled && !config.slices.block.hiddenFields?.miner && (
          <Flex alignItems="center" columnGap={ 1.5 } minW={ 0 }>
            <Skeleton loading={ isLoading } color="text.secondary" flexShrink={ 0 }>
              { capitalize(getChainValidatorTitle()) }
            </Skeleton>
            <AddressEntity
              address={ block.miner }
              isLoading={ isLoading }
              noIcon
              noCopy
              truncation="constant"
              fontFamily="mono"
            />
          </Flex>
        ) }
      </Flex>
    </Box>
  );
};

export default React.memo(LatestBlocksItem);
