// SPDX-License-Identifier: LicenseRef-Blockscout

import { Box } from '@chakra-ui/react';
import React from 'react';

import type { NavGroupItem } from '../types';

import SpriteIcon from 'src/sprite/SpriteIcon';

import { Link } from 'src/toolkit/chakra/link';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from 'src/toolkit/chakra/popover';
import { useDisclosure } from 'src/toolkit/hooks/useDisclosure';

import NavLink from './NavLink';

interface Props {
  item: NavGroupItem;

  /** override link color (used by the G8Chain header over the dark hero) */
  textColor?: string;

  /** header is transparent over the homepage hero: active state is text-only, no chip */
  isOverHero?: boolean;
}

// G8Chain header dropdown: compact liquid-glass panel (design system §5.4) with mono
// uppercase items — no big icons or heavy chrome.
const NavLinkGroup = ({ item, textColor, isOverHero }: Props) => {
  const { open, onOpenChange } = useDisclosure();

  const handleOpenChange = React.useCallback(({ open }: { open: boolean }) => onOpenChange({ open }), [ onOpenChange ]);

  const monoStyle = {
    fontFamily: 'mono',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  };

  const triggerColor = (() => {
    if (isOverHero) {
      return item.isActive ? 'white' : 'rgba(242, 247, 251, 0.75)';
    }
    if (textColor) {
      return item.isActive ? 'g8primaryDeep' : 'text.primary';
    }
    return undefined;
  })();

  return (
    <PopoverRoot
      positioning={{ placement: 'bottom-start', offset: { mainAxis: 8 } }}
      open={ open }
      onOpenChange={ handleOpenChange }
    >
      <PopoverTrigger>
        <Link
          as="li"
          listStyleType="none"
          display="flex"
          alignItems="center"
          px={ 3 }
          py="6px"
          cursor="pointer"
          variant="plain"
          { ...(item.isActive ? { 'data-selected': true } : {}) }
          borderRadius="base"
          { ...monoStyle }
          color={ triggerColor }
          _hover={{ color: isOverHero ? 'g8highlight' : 'g8primary', textDecoration: 'none' }}
          _selected={{ color: isOverHero ? 'white' : 'g8primaryDeep', bg: 'transparent' }}
          _expanded={{ color: isOverHero ? 'white' : 'g8primaryDeep', bg: 'transparent' }}
        >
          { item.text }
          <SpriteIcon name="arrows/east-mini" boxSize={ 3.5 } transform="rotate(-90deg)" ml={ 2 }/>
        </Link>
      </PopoverTrigger>
      <PopoverContent
        w="auto"
        minW="176px"
        borderRadius="base"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.14)"
        // liquid glass (design system §1.2): translucent white + blur, same treatment
        // as the scrolled navbar — no solid white panel
        background="rgba(252, 253, 251, 0.72)"
        backdropFilter="blur(16px) saturate(1.5)"
        boxShadow="0 4px 20px rgba(7, 15, 24, 0.08)"
        overflow="hidden"
      >
        <PopoverBody px={ 1.5 } py={ 1.5 } display="flex" flexDir="column" rowGap={ 0.5 }>
          { item.subItems.map((subItem) => {
            if (Array.isArray(subItem)) {
              return null;
            }
            return (
              <Box key={ subItem.text } role="group">
                <NavLink
                  item={ subItem }
                  noIcon
                  w="full"
                  px={ 2.5 }
                  py={ 1.5 }
                  { ...monoStyle }
                  borderRadius="sm"
                  // on the glass panel hovering flips to brand blue, same as nav links
                  hoverColor="g8primary"
                  color={ isOverHero && open ? 'text.primary' : undefined }
                />
              </Box>
            );
          }) }
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default React.memo(NavLinkGroup);
