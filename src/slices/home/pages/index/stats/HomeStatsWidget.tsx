// SPDX-License-Identifier: LicenseRef-Blockscout

import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { Route } from 'nextjs-routes';
import { route } from 'nextjs-routes';
import React from 'react';

import { Link } from 'src/toolkit/chakra/link';
import { Skeleton } from 'src/toolkit/chakra/skeleton';
import { Truncate } from 'src/toolkit/components/truncation/Truncate';

export interface Props {
  label: string;
  value: string | React.ReactNode;

  /** accepted for upstream StatsWidget compatibility; the ds-statcell look uses the accent square instead */
  icon?: unknown;

  /** accepted for upstream StatsWidget compatibility; rendered by the cell when provided as a node */
  hint?: string | React.ReactNode;
  isLoading?: boolean;
  href?: Route;
  isFallback?: boolean;

  /** grid-column override for the mobile 2-col grid (odd-count last item spans both) */
  gridColumn?: BoxProps['gridColumn'];

  /** accent square color in the cell head; cycles through the G8Chain brand/partner palette */
  accent?: string;
}

// G8Chain stat cell (ds-statcell pattern from the G8CHAIN website): a colored square
// marker + mono uppercase label on top, then the big value. Transparent background —
// the cells sit directly on the dark hero band, separated by hairline dividers.
const HomeStatsWidget = React.forwardRef<HTMLDivElement, Props>(({
  label,
  value,
  isLoading,
  href,
  isFallback,
  gridColumn,
  accent = '#0C90B8',
}, ref) => {
  const cell = (
    <Box
      p={{ base: 3, lg: 4 }}
      borderLeft="1px solid"
      borderColor="rgba(255, 255, 255, 0.12)"
      h="100%"
      w="100%"
      _hover={{ transform: 'translateY(-2px)', transition: '0.2s ease' }}
    >
      <Box
        display="flex"
        alignItems="center"
        columnGap={ 2 }
        mb={ 2 }
      >
        <Box w="8px" h="8px" bg={ accent } flexShrink={ 0 } aria-hidden/>
        <Skeleton
          loading={ isLoading }
          color="#4fc3e0"
          fontFamily="mono"
          fontSize="11px"
          fontWeight={ 700 }
          letterSpacing="0.12em"
          textTransform="uppercase"
          w="fit-content"
        >
          <h2>{ label }</h2>
        </Skeleton>
      </Box>
      <Skeleton
        loading={ isLoading }
        display="block"
        color="#f2f7fb"
        fontWeight={ 500 }
        fontSize={{ base: '22px', lg: '28px' }}
        lineHeight={{ base: '30px', lg: '36px' }}
        letterSpacing="-0.02em"
        fontFamily="heading"
        opacity={ isFallback && !isLoading ? 'control.disabled' : 1 }
      >
        { typeof value === 'string' ? (
          <Truncate value={ value } type="end" loading={ isLoading }/>
        ) : (
          value
        ) }
      </Skeleton>
    </Box>
  );

  const content = href && !isLoading ? (
    <Link href={ route(href) } variant="plain" w="full" h="full" display="flex">
      { cell }
    </Link>
  ) : cell;

  return (
    <Box ref={ ref } display="flex" h="100%" w="100%" gridColumn={ gridColumn }>
      { content }
    </Box>
  );
});

export default React.memo(HomeStatsWidget);
