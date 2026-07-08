import PageView from '@/components/PageView';
import { ThemedIonicons } from '@/components/ThemedIonicons';
import TransactionRowView from '@/components/TransactionRowView';
import { Input } from '@/components/ui/input';
import { currencyCodeMap } from '@/constants';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useTransactionsStore } from '@/store/useTransactionsStore';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const quickFilters = ['All', 'Income', 'Expense', 'This month'] as const;

export default function SearchScreen() {
  const { transactions } = useTransactionsStore();
  const { settings } = useSettingsStore();
  const { currency } = settings.systemSettings;
  const currencySymbol = currencyCodeMap[currency];

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<(typeof quickFilters)[number]>('All');
  const today = new Date();
  const lowerCaseQuery = query.toLowerCase();
  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === 'Expense' && t.amount > 0) return false;
    if (activeTab === 'Income' && t.amount < 0) return false;
    if (activeTab === 'This month' && new Date(t.date).getMonth() !== today.getMonth())
      return false;
    if (
      query &&
      !t.category.toLowerCase().includes(lowerCaseQuery) &&
      !t.title.toLowerCase().includes(lowerCaseQuery)
    )
      return false;
    return true;
  });
  return (
    <PageView title="Search">
      <View className="p-5 flex-1">
        {/* Searchbar */}
        <View className="mb-5">
          <Text className="text-2xl font-bold text-secondary-foreground mb-3">Search</Text>
          <View className="mt-2.5 border border-secondary-foreground/20 rounded-2xl flex flex-row items-center px-2.5 gap-2 bg-background">
            <ThemedIonicons name="search" size={20} className="text-muted-foreground" />
            <Input
              className="border-0 flex-1 px-0 text-secondary-foreground"
              style={{ backgroundColor: 'transparent' }}
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
        <View className="flex flex-row gap-2">
          {quickFilters.map((qf) => (
            <Pressable
              key={qf}
              className={`${qf === activeTab ? 'bg-accent' : 'bg-white'} py-1.5 px-3 rounded-xl mb-1`}
              onPress={() => setActiveTab(qf)}
            >
              <Text
                className={`${qf === activeTab ? 'text-white' : 'text-black/70'} font-semibold`}
              >
                {qf}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Results */}
        {filteredTransactions.length ? (
          <ScrollView
            className="bg-background rounded-2xl p-3 mt-5"
            contentContainerClassName="flex flex-col gap-3"
          >
            {filteredTransactions.map((activity, i) => (
              <React.Fragment key={activity.id}>
                {i > 0 && <View className="h-[1px] bg-secondary-foreground/10" />}
                <TransactionRowView activity={activity} currencySymbol={currencySymbol} />
              </React.Fragment>
            ))}
          </ScrollView>
        ) : (
          <View className="flex flex-row items-center justify-center mt-5 bg-background rounded-2xl py-5">
            <Text className="text-secondary-foreground text-2xl">No results</Text>
          </View>
        )}
      </View>
    </PageView>
  );
}
