// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import type { NavItem } from '../types';

import { Link } from 'src/toolkit/chakra/link';

import LightningLabel from '../LightningLabel';
import NavLinkIcon from '../NavLinkIcon';
import { isInternalItem } from '../useNavItems';
import { checkRouteHighlight } from '../utils';

interface Props {
  className?: string;
  item: NavItem;
  noIcon?: boolean;

  /** override link color (used by the G8Chain header over the dark hero) */
  textColor?: string;

  /** override hover color (dropdown sub-options hover brand blue on their glass panel) */
  hoverColor?: string;

  /** header is transparent over the homepage hero: active state is text-only, no chip */
  isOverHero?: boolean;
}

const NavLink = ({ className, item, noIcon, textColor, hoverColor, isOverHero }: Props) => {
  const isInternalLink = isInternalItem(item);

  const isActive = 'isActive' in item && item.isActive;

  const isHighlighted = checkRouteHighlight(item);

  // G8Chain header: Space Mono 12px uppercase with wide tracking (design system §2.3).
  // Active state = brand color text (dark navy when scrolled), no background chip.
  const monoStyle = {
    fontFamily: 'mono',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  };

  if (isOverHero) {
    return (
      <chakra.li listStyleType="none">
        <Link
          className={ className }
          href={ isInternalLink ? route(item.nextRoute) : item.url }
          external={ !isInternalLink }
          display="flex"
          alignItems="center"
          variant="plain"
          { ...(isActive ? { 'data-selected': true } : {}) }
          w="auto"
          px={ 3 }
          py="9px"
          { ...monoStyle }
          color={ isActive ? 'white' : 'rgba(242, 247, 251, 0.75)' }
          _hover={{ color: hoverColor ?? 'g8highlight', textDecoration: 'none' }}
          _selected={{ color: 'white' }}
        >
          { !noIcon && <NavLinkIcon item={ item } mr={ 3 }/> }
          <chakra.span>{ item.text }</chakra.span>
        </Link>
      </chakra.li>
    );
  }

  return (
    <chakra.li
      listStyleType="none"
    >
      <Link
        className={ className }
        href={ isInternalLink ? route(item.nextRoute) : item.url }
        external={ !isInternalLink }
        display="flex"
        alignItems="center"
        variant="navigation"
        { ...(isActive ? { 'data-selected': true } : {}) }
        w="224px"
        px={ 2 }
        py="9px"
        textStyle="sm"
        fontWeight={ 500 }
        borderRadius="base"
        { ...(textColor ? {
          ...monoStyle,
          color: isActive ? 'g8primaryDeep' : 'text.primary',
          _hover: { color: hoverColor ?? 'g8primary', textDecoration: 'none' },
          _selected: { color: 'g8primaryDeep', bg: 'transparent' },
        } : {}) }
        { ...(hoverColor && !textColor ? {
          ...monoStyle,
          _hover: { color: hoverColor, textDecoration: 'none' },
        } : {}) }
      >
        { !noIcon && <NavLinkIcon item={ item } mr={ 3 }/> }
        <chakra.span>{ item.text }</chakra.span>
        { isHighlighted && (
          <LightningLabel
            iconColor={ isActive ? 'link.navigation.bg.selected' : 'link.navigation.bg.group' }
            position={{ lg: 'static' }}
            ml={{ lg: '2px' }}
            isCollapsed={ false }
          />
        ) }
      </Link>
    </chakra.li>
  );
};

export default React.memo(chakra(NavLink));
