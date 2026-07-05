import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700">
      <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-50">{title}</Text>
      {children}
    </View>
  );
}

export default function AnimationsScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, [fade]);

  function press() {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.85, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  }

  function toggleExpanded() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((v) => !v);
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: 'Animations' }} />

      <Section title="Fade in on mount (Animated.timing)">
        <Animated.View
          style={{ opacity: fade }}
          className="h-16 items-center justify-center rounded-xl bg-indigo-600"
        >
          <Text className="font-medium text-white">Hello 👋</Text>
        </Animated.View>
      </Section>

      <Section title="Spring scale on press">
        <Pressable onPress={press} className="items-center">
          <Animated.View
            style={{ transform: [{ scale }] }}
            className="h-16 w-16 rounded-full bg-emerald-600"
          />
        </Pressable>
      </Section>

      <Section title="LayoutAnimation expand/collapse">
        <Pressable onPress={toggleExpanded} className="items-center rounded-xl bg-neutral-800 p-3">
          <Text className="font-medium text-white">{expanded ? 'Collapse' : 'Expand'}</Text>
        </Pressable>
        {expanded && (
          <View className="rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
            <Text className="text-neutral-700 dark:text-neutral-300">
              This block animates in/out of layout using the LayoutAnimation API — no explicit
              Animated.Value needed for the height transition.
            </Text>
          </View>
        )}
      </Section>
    </ScreenContainer>
  );
}
