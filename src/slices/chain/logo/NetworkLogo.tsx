// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

// G8Chain branding: typeset wordmark (DM Sans, tight tracking, design system §8).
// No image asset — the mark is the text itself, colored with the brand family.
// `forceLight` renders the light variant for use over the dark hero band.
type Props = {
  className?: string;
  forceLight?: boolean;
};

const NetworkLogo = ({ className, forceLight }: Props) => {
  const markBg = forceLight ? 'rgba(255, 255, 255, 0.12)' : 'g8primary';
  const wordColor = forceLight ? '#f2f7fb' : 'text.primary';

  return (
    <chakra.a
      className={ className }
      href={ route({ pathname: '/' }) }
      aria-label="G8Chain — link to main page"
      display="inline-flex"
      alignItems="center"
      flexShrink={ 0 }
    >
      <chakra.span
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="24px"
        h="24px"
        mr={ 2 }
        bg={ markBg }
        color="white"
        fontWeight={ 700 }
        fontSize="13px"
        fontFamily="heading"
        lineHeight={ 1 }
        userSelect="none"
        aria-hidden
      >
        G8
      </chakra.span>
      <chakra.span
        fontFamily="heading"
        fontWeight={ 700 }
        fontSize="17px"
        letterSpacing="-0.02em"
        color={ wordColor }
        lineHeight={ 1 }
        userSelect="none"
      >
        G8CHAIN
      </chakra.span>
    </chakra.a>
  );
};

export default React.memo(chakra(NetworkLogo));
