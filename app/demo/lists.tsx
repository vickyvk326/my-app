import { Stack } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, SectionList, Text, View } from 'react-native';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
const VEGGIES = ['Asparagus', 'Broccoli', 'Carrot', 'Daikon', 'Eggplant'];

const SECTIONS = [
  { title: 'Fruits', data: FRUITS },
  { title: 'Vegetables', data: VEGGIES },
];

function Row({ label }: { label: string }) {
  return (
    <View className="p-3">
      <Text className="text-neutral-800 dark:text-neutral-200">{label}</Text>
    </View>
  );
}

function Separator() {
  return <View className="h-px bg-neutral-200 dark:bg-neutral-700" />;
}

export default function ListsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulated network delay — a real app would refetch data here.
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <Stack.Screen options={{ title: 'Lists' }} />

      <Text className="px-4 pt-4 text-base font-semibold text-neutral-900 dark:text-neutral-50">
        FlatList (pull to refresh)
      </Text>
      <FlatList
        data={FRUITS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Row label={item} />}
        ItemSeparatorComponent={Separator}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ maxHeight: 260 }}
      />

      <Text className="px-4 pt-4 text-base font-semibold text-neutral-900 dark:text-neutral-50">
        SectionList
      </Text>
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Row label={item} />}
        renderSectionHeader={({ section }) => (
          <View className="bg-neutral-100 px-3 py-1.5 dark:bg-neutral-800">
            <Text className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
              {section.title}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={Separator}
        style={{ flex: 1 }}
      />
    </View>
  );
}
