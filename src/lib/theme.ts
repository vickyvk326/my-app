import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  type Theme,
} from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(0 0% 9%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(0 0% 9%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(0 0% 9%)',
    border: 'hsl(0 0% 90%)',
    input: 'hsl(0 0% 90%)',
    ring: 'hsl(239 84% 67%)',
    muted: 'hsl(0 0% 96%)',
    mutedForeground: 'hsl(0 0% 45%)',
    primary: 'hsl(240 6% 10%)',
    primaryForeground: 'hsl(0 0% 98%)',
    secondary: 'hsl(240 5% 96%)',
    secondaryForeground: 'hsl(240 6% 10%)',
    accent: 'hsl(163 80% 30%)', // #0f8a68
    accentForeground: 'hsl(0 0% 98%)',
    destructive: 'hsl(0 74% 51%)',
    destructiveForeground: 'hsl(0 0% 98%)',
    radius: '0.625rem',
  },
  dark: {
    background: 'hsl(0 0% 9%)',
    foreground: 'hsl(0 0% 98%)',
    card: 'hsl(0 0% 15%)',
    cardForeground: 'hsl(0 0% 98%)',
    popover: 'hsl(0 0% 15%)',
    popoverForeground: 'hsl(0 0% 98%)',
    border: 'hsl(0 0% 25%)',
    input: 'hsl(0 0% 25%)',
    ring: 'hsl(234 90% 74%)',
    muted: 'hsl(0 0% 15%)',
    mutedForeground: 'hsl(0 0% 64%)',
    primary: 'hsl(0 0% 98%)',
    primaryForeground: 'hsl(0 0% 9%)',
    secondary: 'hsl(240 4% 16%)',
    secondaryForeground: 'hsl(0 0% 98%)',
    accent: 'hsl(163 80% 30%)', // #0f8a68, unchanged across modes
    accentForeground: 'hsl(0 0% 98%)',
    destructive: 'hsl(0 91% 71%)',
    destructiveForeground: 'hsl(0 0% 9%)',
    radius: '0.625rem',
  },
} as const;

// React Navigation's Theme is a plain JS object, not a className — it can't
// read the CSS custom properties in global.css, so this mirrors the THEME
// tokens above. `primary` maps to the ring color, matching the app's active
// tab/link tint rather than the near-black/white text "primary" token.
export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: THEME.light.background,
      card: THEME.light.card,
      text: THEME.light.foreground,
      border: THEME.light.border,
      primary: THEME.light.ring,
      notification: THEME.light.destructive,
    },
  },
  dark: {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: THEME.dark.background,
      card: THEME.dark.card,
      text: THEME.dark.foreground,
      border: THEME.dark.border,
      primary: THEME.dark.ring,
      notification: THEME.dark.destructive,
    },
  },
};
