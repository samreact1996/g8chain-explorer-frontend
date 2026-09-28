// SPDX-License-Identifier: LicenseRef-Blockscout

import { defineSlotRecipe } from '@chakra-ui/react';

export const recipe = defineSlotRecipe({
  slots: [ 'root', 'list', 'trigger', 'content', 'indicator' ],
  base: {
    root: {
      '--tabs-trigger-radius': 'radii.l2',
      position: 'relative',
      _horizontal: {
        display: 'block',
      },
      _vertical: {
        display: 'flex',
      },
    },
    list: {
      display: 'inline-flex',
      width: '100%',
      position: 'relative',
      isolation: 'isolate',
      '--tabs-indicator-shadow': 'shadows.none',
      '--tabs-indicator-bg': 'colors.bg',
      minH: 'var(--tabs-height)',
      _horizontal: {
        flexDirection: 'row',
      },
      _vertical: {
        flexDirection: 'column',
      },
    },
    trigger: {
      outline: '0',
      minW: 'var(--tabs-height)',
      height: 'var(--tabs-height)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      cursor: 'button',
      gap: '2',
      _focusVisible: {
        zIndex: 1,
        outline: '2px solid',
        outlineColor: 'colorPalette.focusRing',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    content: {
      focusVisibleRing: 'inside',
      _horizontal: {
        width: '100%',
        pt: 'var(--tabs-content-padding)',
      },
      _vertical: {
        height: '100%',
        ps: 'var(--tabs-content-padding)',
      },
    },
    indicator: {
      width: 'var(--width)',
      height: 'var(--height)',
      borderRadius: 'var(--tabs-indicator-radius)',
      bg: 'var(--tabs-indicator-bg)',
      shadow: 'var(--tabs-indicator-shadow)',
      zIndex: -1,
    },
  },

  variants: {
    fitted: {
      'true': {
        list: {
          display: 'flex',
        },
        trigger: {
          flex: 1,
          textAlign: 'center',
          justifyContent: 'center',
        },
      },
    },

    justify: {
      start: {
        list: {
          justifyContent: 'flex-start',
        },
      },
      center: {
        list: {
          justifyContent: 'center',
        },
      },
      end: {
        list: {
          justifyContent: 'flex-end',
        },
      },
    },

    size: {
      sm: {
        root: {
          '--tabs-height': 'sizes.8',
          '--tabs-content-padding': 'spacing.6',
        },
        trigger: {
          py: '1',
          px: '3',
          textStyle: 'sm',
        },
      },
      md: {
        root: {
          '--tabs-height': 'sizes.10',
          '--tabs-content-padding': 'spacing.6',
        },
        trigger: {
          py: '2',
          px: '4',
          textStyle: 'md',
        },
      },
      free: {},
    },

    variant: {
      // G8Chain tab buttons (G8CHAIN website filter-button look): small mono uppercase
      // bordered buttons — idle transparent/gray, selected light-cyan fill with brand blue
      solid: {
        list: {
          '--tabs-indicator-bg': 'transparent',
          gap: 1.5,
        },
        trigger: {
          fontWeight: '600',
          gap: '1',
          height: 'auto',
          minH: '28px',
          minW: 0,
          px: '9px',
          py: '7px',
          fontFamily: 'mono',
          fontSize: '11px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          borderRadius: 'none',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#dce3e9',
          color: '#89929d',
          bg: 'transparent',
          transition: 'background .25s ease, border-color .25s ease, color .25s ease',
          _selected: {
            bg: '#edf8fb',
            color: '#0c90b8',
            borderColor: '#a3cede',
            _hover: {
              color: '#0c90b8',
              borderColor: '#a3cede',
            },
          },
          _hover: {
            color: '#0c90b8',
            borderColor: '#a3cede',
          },
        },
      },
      secondary: {
        list: {
          border: 'none',
          columnGap: 1.5,
          _horizontal: {
            _before: {
              display: 'none',
            },
          },
        },
        trigger: {
          fontWeight: '600',
          height: 'auto',
          minH: '28px',
          minW: 0,
          px: '9px',
          py: '7px',
          fontFamily: 'mono',
          fontSize: '11px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#89929d',
          bg: 'transparent',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#dce3e9',
          borderRadius: 'none',
          transition: 'background .25s ease, border-color .25s ease, color .25s ease',
          _selected: {
            bg: '#edf8fb',
            color: '#0c90b8',
            borderColor: '#a3cede',
            _hover: {
              borderColor: '#a3cede',
            },
          },
          _hover: {
            color: '#0c90b8',
            borderColor: '#a3cede',
          },
        },
      },
      segmented: {
        trigger: {
          fontFamily: 'mono',
          fontSize: '11px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#89929d',
          bg: 'transparent',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#dce3e9',
          _hover: {
            color: '#0c90b8',
            borderColor: '#a3cede',
          },
          _selected: {
            color: '#0c90b8',
            bg: '#edf8fb',
            borderColor: '#a3cede',
            _hover: {
              color: '#0c90b8',
            },
            '& + *': {
              borderLeftWidth: '1px',
            },
          },
          _notLast: {
            borderRightWidth: '1px',
            _selected: {
              borderRightWidth: '1px',
            },
          },
          _first: {
            borderTopLeftRadius: 'base',
            borderBottomLeftRadius: 'base',
          },
          _last: {
            borderTopRightRadius: 'base',
            borderBottomRightRadius: 'base',
          },
        },
      },
      unstyled: {},
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
});
