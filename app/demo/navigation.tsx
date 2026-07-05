import { Link, Stack, useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import { ScreenContainer } from '@/components/ScreenContainer';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700">
      <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-50">{title}</Text>
      {children}
    </View>
  );
}

export default function NavigationScreen() {
  const router = useRouter();
  const [id, setId] = useState('42');

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: 'Navigation' }} />

      <Section title="Link with a param">
        <Link href={`/demo/navigation-detail/${id || '1'}`} asChild>
          <Pressable className="items-center rounded-xl bg-indigo-600 p-3">
            <Text className="font-medium text-white">Push detail via &lt;Link&gt;</Text>
          </Pressable>
        </Link>
      </Section>

      <Section title="router.push with a custom id">
        <TextInput
          value={id}
          onChangeText={setId}
          keyboardType="number-pad"
          placeholder="Enter an id"
          placeholderTextColor="#9ca3af"
          className="rounded-xl border border-neutral-300 p-3 text-neutral-900 dark:border-neutral-600 dark:text-neutral-50"
        />
        <Pressable
          onPress={() => router.push(`/demo/navigation-detail/${id || '1'}`)}
          className="items-center rounded-xl bg-emerald-600 p-3"
        >
          <Text className="font-medium text-white">
            router.push(`/demo/navigation-detail/{id}`)
          </Text>
        </Pressable>
      </Section>
    </ScreenContainer>
  );
}
