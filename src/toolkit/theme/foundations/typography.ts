// SPDX-License-Identifier: LicenseRef-Blockscout

import type { ThemingConfig } from '@chakra-ui/react';

import type { ExcludeUndefined } from 'src/shared/types/utils';

import config from 'src/config';

// G8Chain design system: DM Sans for body copy and headings, Space Mono for machine data
// (addresses, hashes, numerics). The _document.tsx "body" stylesheet slot loads Space Mono.
export const BODY_TYPEFACE = config.misc.fonts.body?.name ?? 'DM Sans';
export const HEADING_TYPEFACE = config.misc.fonts.heading?.name ?? 'DM Sans';
export const MONO_TYPEFACE = 'Space Mono';

export const fonts: ExcludeUndefined<ThemingConfig['tokens']>['fonts'] = {
  heading: { value: `${ HEADING_TYPEFACE }, sans-serif` },
  body: { value: `${ BODY_TYPEFACE }, sans-serif` },
  mono: { value: `${ MONO_TYPEFACE }, monospace` },
};

export const textStyles: ThemingConfig['textStyles'] = {
  heading: {
    display: {
      value: {
        fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
        lineHeight: '1.06',
        fontWeight: '300',
        letterSpacing: '-0.04em',
        fontFamily: 'heading',
      },
    },
    xl: {
      value: {
        fontSize: '32px',
        lineHeight: '40px',
        fontWeight: '500',
        letterSpacing: '-0.5px',
        fontFamily: 'heading',
      },
    },
    lg: {
      value: {
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '500',
        fontFamily: 'heading',
      },
    },
    md: {
      value: {
        fontSize: '18px',
        lineHeight: '24px',
        fontWeight: '500',
        fontFamily: 'heading',
      },
    },
    sm: {
      value: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '500',
        fontFamily: 'heading',
      },
    },
    xs: {
      value: {
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '600',
        fontFamily: 'heading',
      },
    },
  },
  text: {
    xl: {
      value: {
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: '400',
        fontFamily: 'body',
      },
    },
    md: {
      value: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '400',
        fontFamily: 'body',
      },
    },
    sm: {
      value: {
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '400',
        fontFamily: 'body',
      },
    },
    xs: {
      value: {
        fontSize: '12px',
        lineHeight: '16px',
        fontWeight: '400',
        fontFamily: 'body',
      },
    },
  },
  kicker: {
    value: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      fontFamily: 'mono',
    },
  },
  mono: {
    lg: {
      value: {
        fontSize: '13px',
        lineHeight: '20px',
        fontWeight: '400',
        fontFamily: 'mono',
      },
    },
    sm: {
      value: {
        fontSize: '12px',
        lineHeight: '18px',
        fontWeight: '400',
        fontFamily: 'mono',
      },
    },
    xs: {
      value: {
        fontSize: '11px',
        lineHeight: '16px',
        fontWeight: '400',
        fontFamily: 'mono',
      },
    },
  },
};
