import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { ThemedIonicons } from '@/components/ThemedIonicons';
import type { Category } from '@/types/demo';

export function CategoryCard({ category }: { category: Category }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Link href={`/demo/${category.slug}`} asChild>
      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        className={`flex-row items-center gap-4 rounded-2xl border border-border bg-card p-4 ${pressed ? 'opacity-70' : ''}`}
      >
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-accent">
          <ThemedIonicons name={category.icon} size={24} className="text-accent-foreground" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-card-foreground">{category.title}</Text>
          <Text className="mt-0.5 text-sm text-muted-foreground">{category.description}</Text>
        </View>
        <ThemedIonicons name="chevron-right" size={20} className="text-muted-foreground" />
      </Pressable>
    </Link>
  );
}
