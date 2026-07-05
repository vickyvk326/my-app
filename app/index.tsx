import { Stack } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryCard } from '@/components/CategoryCard';
import { DEMO_CATEGORIES } from '@/constants/demo-categories';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <Stack.Screen options={{ title: 'RN Playground' }} />
      <FlatList
        data={DEMO_CATEGORIES}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="mb-2">
            <Text className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              Explore React Native
            </Text>
            <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Pick a topic to see it in action.
            </Text>
          </View>
        }
        renderItem={({ item }) => <CategoryCard category={item} />}
      />
    </SafeAreaView>
  );
}
