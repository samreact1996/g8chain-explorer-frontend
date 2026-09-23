// SPDX-License-Identifier: LicenseRef-Blockscout

'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import * as React from 'react';

import config from 'src/config';

export interface ColorModeProviderProps extends ThemeProviderProps {}

export type ColorMode = 'light' | 'dark';

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      scriptProps={{ 'data-cfasync': 'false' }}
      defaultTheme={ config.shell.topBar.colorTheme.default?.colorMode ?? 'light' }
      // G8Chain design system rule 1: light theme is pinned. forcedTheme (not just defaultTheme)
      // overrides any previously stored user preference, so the `dark` class never applies.
      forcedTheme="light"
      disableTransitionOnChange
      { ...props }
    />
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}
