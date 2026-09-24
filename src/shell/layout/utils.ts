// SPDX-License-Identifier: LicenseRef-Blockscout

import config from 'src/config';

// G8Chain shell: centered rail capped at 1240px (design system §3.2, the website's own
// explorer-shell width). The env toggle can still disable the cap entirely.
const maxWidthVerticalNavigation = config.shell.layout.maxContentWidth ? 1_240 : 10_000;
const maxWidthHorizontalNavigation = config.shell.layout.maxContentWidth ? 1_240 : 10_000;

export const CONTENT_MAX_WIDTH = config.shell.navigation.layout === 'horizontal' ? maxWidthHorizontalNavigation : maxWidthVerticalNavigation;
