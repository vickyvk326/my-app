import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center gap-4 bg-white p-5 dark:bg-neutral-900">
        <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
          This screen doesn&apos;t exist.
        </Text>
        <Link href="/" className="py-4">
          <Text className="text-sm text-indigo-600 dark:text-indigo-400">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
