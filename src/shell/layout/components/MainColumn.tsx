// SPDX-License-Identifier: LicenseRef-Blockscout

import { Flex, chakra } from '@chakra-ui/react';
import React from 'react';

import config from 'src/config';

interface Props {
  className?: string;
  children: React.ReactNode;

  /** remove the default content paddings — used by the homepage, whose hero band is full-bleed */
  isFullBleed?: boolean;
}

const MainColumn = ({ children, className, isFullBleed }: Props) => {
  return (
    <Flex
      className={ className }
      flexDir="column"
      flexGrow={ 1 }
      w={{ base: '100%', lg: config.shell.navigation.layout === 'horizontal' ? '100%' : 'auto' }}
      paddingX={ isFullBleed ? 0 : { base: 3, lg: config.shell.navigation.layout === 'horizontal' ? 6 : 12 } }
      paddingRight={{ '2xl': 6 }}
      paddingTop={ isFullBleed ? 0 : { base: '12px', lg: 6 } } // 12px is top padding of content area
      paddingBottom={ isFullBleed ? 0 : 8 }
    >
      { children }
    </Flex>
  );
};

export default React.memo(chakra(MainColumn));
