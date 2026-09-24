// SPDX-License-Identifier: LicenseRef-Blockscout

import { Flex, Box, HStack, chakra } from '@chakra-ui/react';
import React from 'react';

import { useAppContext } from 'src/shell/app/context';
import NavLink from 'src/shell/navigation/horizontal/NavLink';
import NavLinkGroup from 'src/shell/navigation/horizontal/NavLinkGroup';
import useNavItems, { isGroupItem } from 'src/shell/navigation/useNavItems';

import NetworkLogo from 'src/slices/chain/logo/NetworkLogo';

import NetworkAddToWallet from 'src/features/web3-wallet/components/NetworkAddToWallet';
import useProvider from 'src/features/web3-wallet/hooks/useProvider';

import config from 'src/config';
import * as cookies from 'src/shared/storage/cookies';

import Settings from './settings/Settings';

// G8Chain site header (design system §1.2): full-width, fixed to the top. Over the homepage
// hero it is transparent; once the user scrolls, the light glass treatment
// (`rgba(252,253,251,.72)` + hairline border) fades in. On inner pages it is always glass.
const TopBar = () => {
  const [ isScrolled, setIsScrolled ] = React.useState(false);
  const [ isHomeRoute, setIsHomeRoute ] = React.useState(true);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // transparent-over-hero only applies to the homepage; popstate covers back/forward navigation
  React.useEffect(() => {
    const update = () => setIsHomeRoute(window.location.pathname === '/');
    update();
    window.addEventListener('popstate', update);
    const interval = window.setInterval(update, 1000);
    return () => {
      window.removeEventListener('popstate', update);
      window.clearInterval(interval);
    };
  }, []);

  const isOverHero = isHomeRoute && !isScrolled;

  const hideAddToWalletButtonCookie = cookies.get(cookies.NAMES.HIDE_ADD_TO_WALLET_BUTTON, useAppContext().cookies);
  const [ isAddChainButtonVisible, setIsAddChainButtonVisible ] = React.useState(hideAddToWalletButtonCookie !== 'topbar');

  const web3 = useProvider();

  const hasAddChainButton = Boolean(
    isAddChainButtonVisible &&
    web3.data?.provider &&
    web3.data?.wallet &&
    config.chain.rpcUrls.length &&
    config.features.web3Wallet.isEnabled &&
    !config.features.multichain.isEnabled,
  );

  const handleAddSuccess = React.useCallback(() => {
    cookies.set(cookies.NAMES.HIDE_ADD_TO_WALLET_BUTTON, 'topbar', { expires: 3 * 365 });
    setIsAddChainButtonVisible(false);
  }, [ ]);

  const { mainNavItems } = useNavItems();

  const fg = isOverHero ? '#f2f7fb' : 'text.primary';

  return (
    <Box
      position="fixed"
      top={ 0 }
      left={ 0 }
      right={ 0 }
      zIndex="sticky"
      transition="background-color .25s ease, border-color .25s ease"
      bgColor={ isOverHero ? 'transparent' : 'rgba(252, 253, 251, 0.72)' }
      backdropFilter={ isOverHero ? undefined : 'blur(10px) saturate(1.5)' }
      borderBottom={ isOverHero ? 'none' : '1px solid' }
      borderBottomColor={ isOverHero ? 'transparent' : 'rgba(29, 37, 46, 0.08)' }
    >
      <Flex
        py={ 3 }
        px={{ base: 4, lg: 10 }}
        m="0 auto"
        justifyContent="space-between"
        alignItems="center"
        columnGap={ 4 }
        maxW="1280px"
      >
        <HStack gap={ 0 } flex="1" minW={ 0 } alignItems="center">
          <Box display={{ base: 'none', lg: 'block' }} flexShrink={ 0 }>
            <NetworkLogo forceLight={ isOverHero }/>
          </Box>
          <chakra.nav
            display={{ base: 'none', lg: 'block' }}
            ml={ 8 }
            overflowX="auto"
            css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
          >
            <Flex as="ul" columnGap={ 0 } alignItems="center" flexWrap="nowrap" css={{ '& a': { w: 'auto', px: 3 } }}>
              { mainNavItems.map((item) => {
                if (isGroupItem(item)) {
                  return <NavLinkGroup key={ item.text } item={ item } textColor={ typeof fg === 'string' ? fg : undefined }/>;
                } else {
                  return <NavLink key={ item.text } item={ item } noIcon py={ 1.5 } w="fit-content" textColor={ fg }/>;
                }
              }) }
            </Flex>
          </chakra.nav>
        </HStack>
        <HStack alignItems="center" gap={ 0 } flexShrink={ 0 } color={ fg }>
          { hasAddChainButton && <NetworkAddToWallet source="Top bar" onAddSuccess={ handleAddSuccess }/> }
          <Settings color={ typeof fg === 'string' ? fg : undefined }/>
        </HStack>
      </Flex>
    </Box>
  );
};

export default React.memo(TopBar);
