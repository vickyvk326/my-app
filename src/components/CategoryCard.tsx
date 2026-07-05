import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { Category } from '@/types/demo';

export function CategoryCard({ category }: { category: Category }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Link href={`/demo/${category.slug}`} asChild>
      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        className={`flex-row items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800 ${pressed ? 'opacity-70' : ''}`}
      >
        <View className="h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950">
          <Ionicons name={category.icon} size={24} color="#6366f1" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
            {category.title}
          </Text>
          <Text className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
            {category.description}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#a3a3a3" />
      </Pressable>
    </Link>
  );
}
