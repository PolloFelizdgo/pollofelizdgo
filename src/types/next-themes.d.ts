declare module 'next-themes' {
  import * as React from 'react';

  export type Theme = 'light' | 'dark' | 'system' | string;

  export interface ThemeProviderProps {
    attribute?: string;
    defaultTheme?: Theme;
    enableSystem?: boolean;
    storageKey?: string;
    enableColorScheme?: boolean;
    themes?: Theme[];
    children?: React.ReactNode;
    [k: string]: any;
  }

  export const ThemeProvider: React.ComponentType<ThemeProviderProps>;

  export function useTheme(): {
    theme?: Theme | undefined;
    themes?: Theme[] | undefined;
    systemTheme?: Theme | undefined;
    setTheme: (t: Theme) => void;
    resolvedTheme?: Theme | undefined;
  };

  const _default: React.ComponentType<ThemeProviderProps>;
  export default _default;
}
