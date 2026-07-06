import { Stack } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryCard } from '@/components/CategoryCard';
import { DEMO_CATEGORIES } from '@/constants/demo-categories';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: 'RN Playground' }} />
      <FlatList
        data={DEMO_CATEGORIES}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="mb-2">
            <Text className="text-2xl font-bold text-secondary-foreground">
              Explore React Native
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              Pick a topic to see it in action.
            </Text>
          </View>
        }
        renderItem={({ item }) => <CategoryCard category={item} />}
      />
    </SafeAreaView>
  );
}
