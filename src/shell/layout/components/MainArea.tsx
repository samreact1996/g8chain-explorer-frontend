// SPDX-License-Identifier: LicenseRef-Blockscout

import { Flex, chakra } from '@chakra-ui/react';
import React from 'react';

import config from 'src/config';

import { CONTENT_MAX_WIDTH } from '../utils';

interface Props {
  children: React.ReactNode;
  className?: string;

  /** no top margin — the homepage hero band slides under the fixed header */
  isFullBleed?: boolean;
}

const TOP_BAR_HEIGHT = 36;
const HORIZONTAL_NAV_BAR_HEIGHT = config.shell.navigation.layout === 'horizontal' ? 49 : 0;
// G8Chain fixed header total height — inner-page content must start below it, never slide under it.
const FIXED_HEADER_HEIGHT = TOP_BAR_HEIGHT + HORIZONTAL_NAV_BAR_HEIGHT;

const MainArea = ({ children, className, isFullBleed }: Props) => {
  return (
    <Flex
      className={ className }
      w="100%"
      maxW={ `${ CONTENT_MAX_WIDTH }px` }
      m="0 auto"
      mt={ isFullBleed ? 0 : `${ FIXED_HEADER_HEIGHT }px` }
      minH={{
        base: `calc(100vh - ${ FIXED_HEADER_HEIGHT }px)`,
        lg: `calc(100vh - ${ FIXED_HEADER_HEIGHT }px)`,
      }}
      alignItems="stretch"
    >
      { children }
    </Flex>
  );
};

export default React.memo(chakra(MainArea));
