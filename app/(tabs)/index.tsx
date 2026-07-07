import { Link, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: 'RN Playground' }} />
      <View className="flex-1 justify-center gap-4 p-6">
        <Text className="text-2xl font-bold text-secondary-foreground">RN Playground</Text>
        <Text className="text-sm text-muted-foreground">
          A collection of React Native concepts, from core components to navigation and state
          management.
        </Text>
        <Link href="/demos" asChild>
          <Pressable className="items-center rounded-xl bg-indigo-600 p-3">
            <Text className="font-medium text-white">Browse demos</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
