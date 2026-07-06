import '../global.css';

import { ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { DarkTheme, LightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { queryClient } from '@/lib/queryClient';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={theme}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: theme.colors.background } }} />
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
