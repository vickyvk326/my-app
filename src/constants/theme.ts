import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  type Theme,
} from '@react-navigation/native';

// React Navigation's Theme is a plain JS object, not a className — it can't
// read the CSS custom properties in global.css, so these values are a manual
// mirror of the --color-* tokens there. Keep them in sync by hand.
export const LightTheme: Theme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: 'rgb(255, 255, 255)', // --color-background
    card: 'rgb(255, 255, 255)', // --color-card
    text: 'rgb(23, 23, 23)', // --color-foreground
    border: 'rgb(229, 229, 229)', // --color-border
    primary: 'rgb(99, 102, 241)', // --color-ring
  },
};

export const DarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: 'rgb(23, 23, 23)', // --color-background
    card: 'rgb(38, 38, 38)', // --color-card
    text: 'rgb(250, 250, 250)', // --color-foreground
    border: 'rgb(64, 64, 64)', // --color-border
    primary: 'rgb(129, 140, 248)', // --color-ring
  },
};
