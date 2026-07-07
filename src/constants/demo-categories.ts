import type { Category } from '@/types/demo';

export const DEMO_CATEGORIES: Category[] = [
  {
    slug: 'core-components',
    title: '1. Core Components',
    description: 'View, Text, Image, ScrollView, Pressable, Switch, ActivityIndicator, Modal',
    icon: 'layout',
  },
  {
    slug: 'lists',
    title: 'Lists',
    description: 'FlatList with pull-to-refresh, SectionList grouping',
    icon: 'list',
  },
  {
    slug: 'forms',
    title: 'Forms & Inputs',
    description: 'TextInput, Switch, validation, Alert, KeyboardAvoidingView',
    icon: 'edit-3',
  },
  {
    slug: 'animations',
    title: 'Animations',
    description: 'Animated API: fade, spring, LayoutAnimation',
    icon: 'zap',
  },
  {
    slug: 'gestures',
    title: 'Gestures',
    description: 'PanResponder drag, press-state feedback',
    icon: 'move',
  },
  {
    slug: 'navigation',
    title: 'Navigation',
    description: 'expo-router: push, params, dynamic routes',
    icon: 'navigation',
  },
  {
    slug: 'state-data',
    title: 'State & Data',
    description: 'Zustand client state + TanStack Query networking',
    icon: 'database',
  },
];
