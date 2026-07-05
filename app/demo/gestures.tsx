import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, PanResponder, Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700">
      <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-50">{title}</Text>
      {children}
    </View>
  );
}

export default function GesturesScreen() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [pressState, setPressState] = useState('idle');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      },
    }),
  ).current;

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: 'Gestures' }} />

      <Section title="PanResponder — drag me">
        <View className="h-40 items-center justify-center">
          <Animated.View
            {...panResponder.panHandlers}
            style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
            className="h-20 w-20 rounded-2xl bg-indigo-600"
          />
        </View>
      </Section>

      <Section title="Pressable press states">
        <Pressable
          onPressIn={() => setPressState('pressed')}
          onPressOut={() => setPressState('idle')}
          onLongPress={() => setPressState('long-pressed')}
          className="items-center rounded-xl bg-neutral-800 p-4"
        >
          <Text className="font-medium text-white">Press, hold, or long-press</Text>
        </Pressable>
        <Text className="text-center text-neutral-600 dark:text-neutral-400">
          State: {pressState}
        </Text>
      </Section>
    </ScreenContainer>
  );
}
