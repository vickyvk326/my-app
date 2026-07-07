import PageView from '@/components/PageView';
import { ThemedIonicons } from '@/components/ThemedIonicons';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const quickFilters = ['All', 'Income', 'Expense', 'This month'] as const;

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<(typeof quickFilters)[number]>('All');
  return (
    <PageView title="Search">
      <View className="p-5">
        {/* Searchbar */}
        <View className="mb-2">
          <Text className="text-2xl font-bold text-secondary-foreground">Search</Text>
          <View className="mt-2.5 border border-secondary-foreground/20 rounded-2xl flex flex-row items-center px-2.5 gap-2 bg-background">
            <ThemedIonicons name="search" size={20} className="text-muted-foreground" />
            <Input
              className="border-0 bg-transparent flex-1 px-0"
              value={query}
              onChangeText={setQuery}
              placeholder="Search"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')} hitSlop={8}>
                <ThemedIonicons name="x" size={20} className="text-muted-foreground" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Quick filters */}
        <View className="flex flex-row gap-2 mt-2">
          {quickFilters.map((qf) => (
            <Pressable
              key={qf}
              className={`${qf === activeTab ? 'bg-accent' : 'bg-white'} p-2 px-3 rounded-xl`}
              onPress={() => setActiveTab(qf)}
            >
              <Text
                className={`${qf === activeTab ? 'text-white' : 'text-secondary-foreground/70'} font-semibold`}
              >
                {qf}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Results */}
        <ScrollView></ScrollView>
      </View>
    </PageView>
  );
}
