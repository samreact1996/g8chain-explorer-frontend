// SPDX-License-Identifier: LicenseRef-Blockscout

import { Box, Portal } from '@chakra-ui/react';
import React from 'react';

interface Props {
  isOpen: boolean;
}

// Portaled to <body>: the homepage hero uses a transform (full-bleed trick), which would
// otherwise trap this fixed backdrop inside the hero's stacking context and let content
// further down the page (console panel, notice bars) paint above the dim.
const SearchBarBackdrop = ({ isOpen }: Props) => {
  return (
    <Portal>
      <Box
        position="fixed"
        top={ 0 }
        left={ 0 }
        w="100vw"
        h="100vh"
        bgColor={{ _light: 'blackAlpha.400', _dark: 'blackAlpha.600' }}
        zIndex="overlay"
        display={{ base: 'none', lg: isOpen ? 'block' : 'none' }}
      />
    </Portal>
  );
};

export default React.memo(SearchBarBackdrop);
