import type { Category } from '@/types/demo';

export const DEMO_CATEGORIES: Category[] = [
  {
    slug: 'core-components',
    title: 'Core Components',
    description: 'View, Text, Image, ScrollView, Pressable, Switch, ActivityIndicator, Modal',
    icon: 'cube-outline',
  },
  {
    slug: 'lists',
    title: 'Lists',
    description: 'FlatList with pull-to-refresh, SectionList grouping',
    icon: 'list-outline',
  },
  {
    slug: 'forms',
    title: 'Forms & Inputs',
    description: 'TextInput, Switch, validation, Alert, KeyboardAvoidingView',
    icon: 'create-outline',
  },
  {
    slug: 'animations',
    title: 'Animations',
    description: 'Animated API: fade, spring, LayoutAnimation',
    icon: 'sparkles-outline',
  },
  {
    slug: 'gestures',
    title: 'Gestures',
    description: 'PanResponder drag, press-state feedback',
    icon: 'hand-left-outline',
  },
  {
    slug: 'navigation',
    title: 'Navigation',
    description: 'expo-router: push, params, dynamic routes',
    icon: 'navigate-outline',
  },
  {
    slug: 'state-data',
    title: 'State & Data',
    description: 'Zustand client state + TanStack Query networking',
    icon: 'server-outline',
  },
];
