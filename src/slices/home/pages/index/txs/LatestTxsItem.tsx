// SPDX-License-Identifier: LicenseRef-Blockscout

import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import type { schemas } from '@blockscout/api-types';

import useApiQuery from 'src/api/hooks/useApiQuery';

import AddressEntity from 'src/slices/address/components/entity/AddressEntity';
import AddressFromToIcon from 'src/slices/address/components/from-to/AddressFromToIcon';
import AddressGradientSquare from 'src/slices/address/components/icon/AddressGradientSquare';
import { getTxCourseType } from 'src/slices/address/utils/tx';
import TokenIconPlaceholder from 'src/slices/token/components/icon/TokenIconPlaceholder';
import TxEntity from 'src/slices/tx/components/entity/TxEntity';
import TxAdditionalInfo from 'src/slices/tx/components/TxAdditionalInfo';
import TxFee from 'src/slices/tx/components/TxFee';
import TxStatus from 'src/slices/tx/components/TxStatus';
import TxType from 'src/slices/tx/components/TxType';

import TxWatchListTags from 'src/features/account/components/TxWatchListTags';
import MetadataTag from 'src/features/address-metadata/components/tag/MetadataTag';

import config from 'src/config';
import TimeWithTooltip from 'src/shared/date-and-time/TimeWithTooltip';
import AssetValue from 'src/shared/values/entity/AssetValue';
import NativeCoinValue from 'src/shared/values/entity/NativeCoinValue';

import { Skeleton } from 'src/toolkit/chakra/skeleton';

const hasValueColumn = !(config.slices.tx.hiddenFields?.value && config.slices.tx.hiddenFields?.tx_fee);

export const LATEST_TXS_TABLE_MIN_WIDTH = hasValueColumn ? '750px' : '700px';

interface Props {
  tx: schemas['Transaction'];
  isLoading?: boolean;
};

// G8Chain activity console — transaction row (design system §1.3): borderless row inside
// the console panel (hairline divider between rows); three stacked rows on the left
// (type tags, mono hash, from → to addresses on one line with per-address gradient
// squares) and a right-aligned column with the time, the amount (token amount + symbol
// for token transfers, native value otherwise) and the fee.
const LatestTxsItem = ({ tx, isLoading }: Props) => {
  const dataTo = tx.to ? tx.to : tx.created_contract;

  const protocolTag = tx.to?.metadata?.tags?.find(tag => tag.tagType === 'protocol');

  const tagsCount = [
    1, // tx type
    1, // tx status
    ...(tx.from?.watchlist_names || []),
    ...(tx.to?.watchlist_names || []),
    protocolTag,
  ].filter(Boolean).length;

  // the main-page endpoint strips token_transfers, so fetch the tx details for
  // token transfers to render the token amount and symbol
  const needsTokenData = !isLoading && Boolean(tx.transaction_types?.includes('token_transfer')) && !tx.token_transfers;
  const txDetailsQuery = useApiQuery('core:tx', {
    pathParams: { hash: tx.hash },
    queryOptions: { enabled: needsTokenData },
  });

  const tokenTransfer = (tx.token_transfers ?? txDetailsQuery.data?.token_transfers ?? null)?.[0];
  const isAmountLoading = isLoading || Boolean(needsTokenData && txDetailsQuery.isLoading);

  const amount = (() => {
    const total = tokenTransfer?.total;
    if (tokenTransfer?.token && total && 'value' in total && total.value !== null && !('token_id' in total && total.token_id !== null)) {
      return (
        <AssetValue
          amount={ total.value }
          decimals={ total.decimals || '0' }
          accuracy={ 5 }
          asset={ tokenTransfer.token.symbol ?? undefined }
          fontWeight={ 700 }
          fontFamily="mono"
          loading={ isLoading }
        />
      );
    }

    if (tokenTransfer?.token) {
      // NFT (ERC-721/1155) or confidential transfer: no fungible amount to show
      return (
        <Text as="span" fontWeight={ 700 } fontFamily="mono">
          { tokenTransfer.token.symbol ?? tokenTransfer.token.name ?? 'Token' }
        </Text>
      );
    }

    return (
      <NativeCoinValue
        amount={ tx.value }
        accuracy={ 5 }
        loading={ isLoading }
        fontWeight={ 700 }
        fontFamily="mono"
      />
    );
  })();

  return (
    <Box
      w="100%"
      flex={ 1 }
      display="flex"
      flexDir="column"
      justifyContent="center"
      px={ 4 }
      py={ 3 }
      _hover={{ bg: 'rgba(12, 144, 184, 0.04)' }}
      transition="background-color .15s ease"
    >
      <Flex w="100%" alignItems="flex-start" columnGap={ 3 }>
        <Box flexShrink={ 0 } pt="2px">
          <TxAdditionalInfo tx={ tx } isLoading={ isLoading }/>
        </Box>
        { /* no overflow-hidden here: the address highlight box (dashed ::before) extends
            a few px below the address line and must not be clipped by this stack */ }
        <VStack flex="auto" minW="0" alignItems="flex-start" gap={ 2 }>
          <HStack flexWrap={ tagsCount <= 3 ? 'nowrap' : 'wrap' } w="100%">
            <TxType types={ tx.transaction_types } isLoading={ isLoading }/>
            { tx.status !== 'ok' && <TxStatus status={ tx.status } errorText={ tx.status === 'error' ? tx.result : undefined } isLoading={ isLoading }/> }
            <TxWatchListTags tx={ tx } isLoading={ isLoading }/>
            { protocolTag && <MetadataTag data={ protocolTag } isLoading={ isLoading } minW="0" noColors/> }
          </HStack>
          <TxEntity
            isLoading={ isLoading }
            hash={ tx.hash }
            fontWeight="700"
            fontFamily="mono"
          />
          <HStack w="100%" columnGap={ 1.5 }>
            <AddressGradientSquare hash={ tx.from.hash } size={ 12 }/>
            <AddressEntity
              address={ tx.from }
              isLoading={ isLoading }
              noIcon
              noCopy
              truncation="dynamic"
              minW={ 0 }
              fontSize="13px"
            />
            <AddressFromToIcon
              type={ getTxCourseType(tx.from.hash, dataTo?.hash) }
              isLoading={ isLoading }
            />
            { dataTo && (
              <>
                { /* token recipient: show the token/contract icon instead of the
                    gradient square (Usdt and other tokens); plain addresses keep it */ }
                { tokenTransfer?.token || dataTo.is_contract ? (
                  <TokenIconPlaceholder boxSize="12px"/>
                ) : (
                  <AddressGradientSquare hash={ dataTo.hash } size={ 12 }/>
                ) }
                <AddressEntity
                  address={ dataTo }
                  isLoading={ isLoading }
                  noIcon
                  noCopy
                  truncation="dynamic"
                  minW={ 0 }
                  fontSize="13px"
                />
              </>
            ) }
          </HStack>
        </VStack>
        <VStack flexShrink={ 0 } alignItems="flex-end" gap={ 2 } textStyle="sm" ml="auto">
          <TimeWithTooltip
            timestamp={ tx.timestamp }
            enableIncrement
            timeFormat="relative"
            isLoading={ isLoading }
            color="text.secondary"
          />
          { !config.slices.tx.hiddenFields?.value && (
            <Skeleton loading={ isAmountLoading } whiteSpace="pre">
              { amount }
            </Skeleton>
          ) }
          { !config.slices.tx.hiddenFields?.tx_fee && (
            <Skeleton loading={ isLoading } display="flex" whiteSpace="pre">
              <Text as="span">Fee </Text>
              <TxFee tx={ tx } accuracy={ 5 } color="text.secondary" noUsd/>
            </Skeleton>
          ) }
        </VStack>
      </Flex>
    </Box>
  );
};

export default React.memo(LatestTxsItem);
