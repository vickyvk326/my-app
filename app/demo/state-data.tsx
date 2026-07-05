import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';
import { useCounterStore } from '@/store/useCounterStore';

type Todo = { id: number; title: string; completed: boolean };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700">
      <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-50">{title}</Text>
      {children}
    </View>
  );
}

function CounterDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <Section title="Zustand — global client state">
      <Text className="text-center text-3xl font-bold text-neutral-900 dark:text-neutral-50">
        {count}
      </Text>
      <View className="flex-row gap-3">
        <Pressable
          onPress={decrement}
          className="flex-1 items-center rounded-xl bg-neutral-800 p-3"
        >
          <Text className="font-medium text-white">-1</Text>
        </Pressable>
        <Pressable onPress={reset} className="flex-1 items-center rounded-xl bg-neutral-500 p-3">
          <Text className="font-medium text-white">Reset</Text>
        </Pressable>
        <Pressable onPress={increment} className="flex-1 items-center rounded-xl bg-indigo-600 p-3">
          <Text className="font-medium text-white">+1</Text>
        </Pressable>
      </View>
      <Text className="text-xs text-neutral-500 dark:text-neutral-400">
        Navigate away to another screen and back — the count persists, because it lives in a Zustand
        store, not component state.
      </Text>
    </Section>
  );
}

function TodosQueryDemo() {
  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['todos'],
    queryFn: async (): Promise<Todo[]> => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    },
  });

  return (
    <Section title="TanStack Query — networking & caching">
      {isPending && <ActivityIndicator />}
      {isError && (
        <Text className="text-red-500">{error instanceof Error ? error.message : 'Error'}</Text>
      )}
      {data?.map((todo) => (
        <Text key={todo.id} className="text-neutral-700 dark:text-neutral-300">
          {todo.completed ? '✅' : '⬜️'} {todo.title}
        </Text>
      ))}
      <Pressable
        onPress={() => refetch()}
        disabled={isRefetching}
        className="items-center rounded-xl bg-indigo-600 p-3"
      >
        <Text className="font-medium text-white">{isRefetching ? 'Refetching…' : 'Refetch'}</Text>
      </Pressable>
    </Section>
  );
}

export default function StateDataScreen() {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: 'State & Data' }} />
      <CounterDemo />
      <TodosQueryDemo />
    </ScreenContainer>
  );
}
