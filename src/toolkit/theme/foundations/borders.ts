// SPDX-License-Identifier: LicenseRef-Blockscout

import type { ThemingConfig } from '@chakra-ui/react';

import type { ExcludeUndefined } from 'src/shared/types/utils';

// G8Chain design system §3.1: radius 0 everywhere. The only sanctioned circles are
// functional (status dots, spinners) — they use `full`.
export const radii: ExcludeUndefined<ThemingConfig['tokens']>['radii'] = {
  none: { value: '0' },
  sm: { value: '0' },
  base: { value: '0' },
  md: { value: '0' },
  lg: { value: '0' },
  xl: { value: '0' },
  full: { value: '9999px' },
};
