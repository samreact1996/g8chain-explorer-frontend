// SPDX-License-Identifier: LicenseRef-Blockscout

// we use custom heading size for hero banner
// eslint-disable-next-line no-restricted-imports
import { Box, Flex, Heading, Text as ChakraText } from '@chakra-ui/react';
import React from 'react';

import SearchBar from 'src/slices/search/components/search-bar/SearchBarDesktop';
import SearchBarMobile from 'src/slices/search/components/search-bar/SearchBarMobile';

import config from 'src/config';

// G8Chain hero band (design system §1.3): dark navy gradient + cyan radial washes,
// full-bleed. Explicit design decision — not a theme state. The band slides under the
// transparent fixed header, so it carries generous top padding for header clearance.
export const BACKGROUND_DEFAULT =
  'radial-gradient(60% 120% at 15% 0%, rgba(12, 144, 184, 0.2) 0%, rgba(12, 144, 184, 0) 60%), ' +
  'radial-gradient(50% 100% at 85% 100%, rgba(12, 144, 184, 0.14) 0%, rgba(12, 144, 184, 0) 55%), ' +
  'linear-gradient(160deg, #0d1a29 0%, #0a1520 45%, #070f18 100%)';

interface Props {
  children?: React.ReactNode;
}

const HeroBanner = ({ children }: Props) => {
  const background = config.slices.home.heroBanner?.background?.[0] || BACKGROUND_DEFAULT;

  const text = (() => {
    if (config.slices.home.heroBanner?.text) {
      return config.slices.home.heroBanner.text;
    }

    return `${ config.chain.name } Explorer`;
  })();

  // "G8Chain Explorer" → "G8Chain" (line 1) + accent "Explorer" (line 2)
  const parts = text.split(' ');
  const titleStart = parts.slice(0, -1).join(' ');
  const titleAccent = parts.length > 1 ? parts.at(-1) : undefined;

  return (
    <Flex
      w="100vw"
      position="relative"
      left="50%"
      transform="translateX(-50%)"
      background={ background }
      color="#f2f7fb"
      pt={{ base: '96px', lg: '128px' }}
      pb={{ base: 12, lg: 20 }}
      flexDir="column"
    >
      { /* padding lives on the rail box (like the navbar/footer) so the hero text
          lines up with the page content edge below */ }
      <Box w="100%" maxW="1240px" mx="auto" px={{ base: 3, lg: 6 }}>
        <Flex
          flexDir={{ base: 'column', lg: 'row' }}
          columnGap={ 16 }
          rowGap={ 10 }
          alignItems={{ base: 'stretch', lg: 'flex-start' }}
        >
          { /* LEFT: kicker + two-line title + glass search */ }
          <Box flex="1" maxW="640px">
            <Flex mb={ 4 } alignItems="center" columnGap={ 2 }>
              <Box w="10px" h="10px" bg="g8highlight" flexShrink={ 0 }/>
              <Box
                fontFamily="mono"
                fontSize="11px"
                fontWeight={ 700 }
                letterSpacing="0.3em"
                textTransform="uppercase"
                color="#6cc4de"
              >
                Distributed ledger
              </Box>
            </Flex>
            <Heading
              as="h1"
              fontSize={{ base: '44px', lg: 'clamp(3.2rem, 6.4vw, 5.6rem)' }}
              lineHeight={{ base: '1.04', lg: '1.02' }}
              fontWeight={ 300 }
              letterSpacing="-0.02em"
              mb={{ base: 4, lg: 5 }}
            >
              { titleStart }
              <br/>
              { typeof titleAccent === 'string' && (
                <Box as="em" fontWeight={ 300 } fontStyle="normal" color="g8highlight">{ titleAccent }</Box>
              ) }
            </Heading>
            <ChakraText
              maxW="560px"
              mt={ 2 }
              fontSize={{ base: '15px', lg: '16px' }}
              lineHeight="1.6"
              color="rgba(242, 247, 251, 0.72)"
            >
              Inspect and analyze G8Chain Distributed Ledger Infrastructure. Search
              transactions, verify smart contracts, and explore addresses across the
              G8Chain ecosystem.
            </ChakraText>
            <Box display={{ base: 'flex', lg: 'none' }} mt={ 5 }>
              <SearchBarMobile isHeroBanner/>
            </Box>
            <Box display={{ base: 'none', lg: 'flex' }} mt={ 5 }>
              <SearchBar isHeroBanner/>
            </Box>
          </Box>
          { /* RIGHT: intentionally reserved for future visual (image/animation) */ }
          <Box flex="1" display={{ base: 'none', lg: 'block' }}/>
        </Flex>
        { children !== undefined && children !== null && (
          <Box w="100%" mt={{ base: 10, lg: 14 }}>
            { children }
          </Box>
        ) }
      </Box>
    </Flex>
  );
};

export default React.memo(HeroBanner);
