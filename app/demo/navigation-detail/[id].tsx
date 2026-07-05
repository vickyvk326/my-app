import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';

export default function NavigationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: `Detail #${id}` }} />

      <View className="gap-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700">
        <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
          You navigated here with param: {id}
        </Text>
        <Text className="text-neutral-600 dark:text-neutral-400">
          This screen is `app/demo/navigation-detail/[id].tsx` — a dynamic expo-router route,
          reading its segment via `useLocalSearchParams`.
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="items-center rounded-xl bg-neutral-800 p-3"
        >
          <Text className="font-medium text-white">router.back()</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
