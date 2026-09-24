// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

// G8Chain branding: square mark used where the full wordmark does not fit
// (mobile header, collapsed sidebar, chain menu) — typeset, no image asset.
type Props = {
  className?: string;
};

const NetworkIcon = ({ className }: Props) => {
  return (
    <chakra.a
      className={ className }
      href={ route({ pathname: '/' }) }
      aria-label="G8Chain — link to main page"
      display="inline-flex"
      flexShrink={ 0 }
    >
      <chakra.span
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="30px"
        h="30px"
        bg="g8primary"
        color="white"
        fontWeight={ 700 }
        fontSize="15px"
        fontFamily="heading"
        lineHeight={ 1 }
        userSelect="none"
      >
        G8
      </chakra.span>
    </chakra.a>
  );
};

export default React.memo(chakra(NetworkIcon));
