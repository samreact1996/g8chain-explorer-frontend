// SPDX-License-Identifier: LicenseRef-Blockscout

import type { ThemingConfig } from '@chakra-ui/react';

import type { ExcludeUndefined } from 'src/shared/types/utils';

// G8Chain design system rule 4: no shadows or glows. Overlays separate with a scrim,
// hover feedback is color/border change + slight lift. Tokens neutralized to none.
const shadows: ExcludeUndefined<ThemingConfig['tokens']>['shadows'] = {
  action_bar: { value: 'none' },
  size: {
    xs: { value: 'none' },
    sm: { value: 'none' },
    base: { value: 'none' },
    md: { value: 'none' },
    lg: { value: 'none' },
    xl: { value: 'none' },
    '2xl': { value: 'none' },
  },
  'dark-lg': { value: 'none' },
};

export default shadows;
