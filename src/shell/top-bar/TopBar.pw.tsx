import React from 'react';

import { test, expect } from 'playwright/lib';

import TopBar from './TopBar';

// G8Chain header: the gas-stats strip, DeFi dropdown, and CSV downloads were removed from
// the header (design brief §Recommended global shell) — the remaining interactive surface
// is the settings popover. The upstream stats/DeFi/CSV tests no longer apply.
test('default view +@dark-mode', async({ render, page }) => {
  const component = await render(<TopBar/>);

  await component.getByLabel('User settings').click();
  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1500, height: 450 } });
});

test('default view +@mobile -@default', async({ render, page }) => {
  const component = await render(<TopBar/>);

  await component.getByLabel('User settings').click();
  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1500, height: 450 } });
});
