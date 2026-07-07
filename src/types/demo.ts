import type { Feather } from '@expo/vector-icons';

export type DemoSlug =
  'core-components' | 'lists' | 'forms' | 'animations' | 'gestures' | 'navigation' | 'state-data';

export type Category = {
  slug: DemoSlug;
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
};
