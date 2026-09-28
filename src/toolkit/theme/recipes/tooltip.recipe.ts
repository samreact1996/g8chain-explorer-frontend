// SPDX-License-Identifier: LicenseRef-Blockscout

import { defineSlotRecipe } from '@chakra-ui/react';

export const recipe = defineSlotRecipe({
  slots: [ 'content', 'arrow', 'arrowTip' ],
  base: {
    content: {
      px: '2',
      py: '1',
      borderRadius: 'none',
      fontWeight: '500',
      textStyle: 'sm',
      textAlign: 'center',
      border: '0.2px solid',
      borderColor: 'g8hairline',
      zIndex: 'tooltip',
      maxW: { base: 'calc(100vw - 8px)', lg: '320px' },
      transformOrigin: 'var(--transform-origin)',
      _open: {
        animationStyle: 'scale-fade-in',
        animationDuration: 'fast',
      },
      _closed: {
        animationStyle: 'scale-fade-out',
        animationDuration: 'fast',
      },
    },
    arrow: {
      '--arrow-size': 'sizes.2',
      '--arrow-background': 'var(--tooltip-bg)',
    },
    arrowTip: {
      borderTopWidth: '1px',
      borderInlineStartWidth: '1px',
      borderColor: 'var(--tooltip-bg)',
    },
  },
  variants: {
    variant: {
      regular: {
        content: {
          // G8Chain liquid glass (design system §1.2): frosted translucent white with
          // dark text — keeps the light hierarchy instead of a black tooltip
          '--tooltip-bg': 'rgba(252, 253, 251, 0.72)',
          bg: 'var(--tooltip-bg)',
          backdropFilter: 'blur(16px) saturate(1.5)',
          color: 'text.secondary',
        },
      },
      popover: {
        content: {
          maxW: 'none',
          bg: 'popover.bg',
          color: 'text.primary',
          p: '4',
          border: '1px solid',
          borderColor: 'g8hairline',
          borderRadius: 'none',
          textAlign: 'left',
          fontWeight: 'normal',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'regular',
  },
});
