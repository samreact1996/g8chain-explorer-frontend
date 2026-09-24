// SPDX-License-Identifier: LicenseRef-Blockscout

import { useRouter } from 'next/router';
import React from 'react';

import type { NavItemInternal, NavItem, NavGroupItem } from './types';

import config from 'src/config';
import { getFeaturePayload } from 'src/config/utils/features';

interface ReturnType {
  mainNavItems: Array<NavItem | NavGroupItem>;
  accountNavItems: Array<NavItem>;
}

export function isGroupItem(item: NavItem | NavGroupItem): item is NavGroupItem {
  return 'subItems' in item;
}

export function isInternalItem(item: NavItem): item is NavItemInternal {
  return 'nextRoute' in item;
}

export default function useNavItems(): ReturnType {
  const router = useRouter();
  const pathname = router.pathname;

  return React.useMemo(() => {
    // G8Chain navigation: five fixed main items (per the G8Chain design brief), keeping
    // every useful route reachable through practical sub-items. All routes remain valid
    // regardless of what the nav lists.
    const explorer: NavItem = {
      text: 'Explorer',
      nextRoute: { pathname: '/' as const },
      icon: 'navigation/blockchain',
      isActive: pathname === '/',
    };

    const blocks: NavItem = {
      text: 'Blocks',
      nextRoute: { pathname: '/blocks' as const },
      icon: 'navigation/block',
      isActive: pathname === '/blocks' || pathname === '/block/[height_or_hash]' || pathname.startsWith('/block/countdown'),
    };

    const txs: NavItem = {
      text: 'Transactions',
      nextRoute: { pathname: '/txs' as const },
      icon: 'navigation/transactions',
      isActive: pathname === '/txs' || pathname === '/tx/[hash]' || pathname === '/internal-txs' || pathname === '/token-transfers',
    };

    const tokens: NavItem = {
      text: 'Tokens',
      nextRoute: { pathname: '/tokens' as const },
      icon: 'navigation/tokens',
      isActive: pathname.startsWith('/token'),
    };

    const contracts: NavItem = {
      text: 'Contracts',
      nextRoute: { pathname: '/verified-contracts' as const },
      icon: 'navigation/verified_contracts',
      isActive: pathname.startsWith('/verified-contracts') || pathname.startsWith('/contract-verification') || pathname.startsWith('/address/'),
    };

    const mainNavItems: ReturnType['mainNavItems'] = [
      explorer,
      blocks,
      txs,
      {
        text: 'Tokens',
        icon: 'navigation/tokens',
        isActive: tokens.isActive,
        subItems: [
          {
            text: 'Tokens',
            nextRoute: { pathname: '/tokens' as const },
            icon: 'navigation/tokens',
            isActive: pathname === '/tokens',
          },
          {
            text: 'Token transfers',
            nextRoute: { pathname: '/token-transfers' as const },
            icon: 'navigation/token_transfers',
            isActive: pathname === '/token-transfers',
          },
        ],
      },
      {
        text: 'Contracts',
        icon: 'navigation/verified_contracts',
        isActive: contracts.isActive,
        subItems: [
          {
            text: 'Verified contracts',
            nextRoute: { pathname: '/verified-contracts' as const },
            icon: 'navigation/verified_contracts',
            isActive: pathname === '/verified-contracts',
          },
          {
            text: 'Verify contract',
            nextRoute: { pathname: '/contract-verification' as const },
            isActive: pathname.startsWith('/contract-verification'),
          },
        ],
      },
    ];

    const accountNavItems: ReturnType['accountNavItems'] = [
      {
        text: 'Watch list',
        nextRoute: { pathname: '/account/watchlist' as const },
        icon: 'navigation/watchlist',
        isActive: pathname === '/account/watchlist',
      },
      {
        text: 'Private tags',
        nextRoute: { pathname: '/account/tag-address' as const },
        icon: 'navigation/private_tags',
        isActive: pathname === '/account/tag-address',
      },
      {
        text: 'API keys',
        nextRoute: { pathname: '/account/api-key' as const },
        icon: 'navigation/api_keys',
        isActive: pathname === '/account/api-key',
      },
      {
        text: 'Custom ABI',
        nextRoute: { pathname: '/account/custom-abi' as const },
        icon: 'navigation/custom_abi',
        isActive: pathname === '/account/custom-abi',
      },
      getFeaturePayload(config.features.account)?.verifiedAddresses?.isEnabled && {
        text: 'Verified addrs',
        nextRoute: { pathname: '/account/verified-addresses' as const },
        icon: 'navigation/verified_contracts',
        isActive: pathname === '/account/verified-addresses',
      },
    ].filter(Boolean);

    return { mainNavItems, accountNavItems };
  }, [ pathname ]);
}
