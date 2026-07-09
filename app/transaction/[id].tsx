import Avatar from '@/components/Avatar';
import PageView from '@/components/PageView';
import { ThemedIonicons } from '@/components/ThemedIonicons';
import { currencyCodeMap } from '@/constants';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useTransactionsStore } from '@/store/useTransactionsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

const Transaction = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { transactions } = useTransactionsStore();
  const { accountsSettings, systemSettings } = useSettingsStore().settings;
  const transaction = useMemo(() => transactions.find((t) => t.id === id), [transactions, id]);
  if (!transaction || !id) return router.back();
  const { accountId, title, category, amount, date, note } = transaction;
  const { accounts } = accountsSettings;
  const account = accounts.find((a) => a.id === accountId);
  const { name, type } = account || {};
  const { currency } = systemSettings;
  const currencySymbol = currencyCodeMap[currency];
  return (
    <PageView title="Transaction">
      {/* Header */}
      <View className="flex flex-row items-center gap-3">
        <ThemedIonicons name="chevron-left" size={24} className="text-secondary-foreground" />
        <Text className="flex-1 text-lg font-semibold">Transaction</Text>
        <ThemedIonicons name="edit" size={24} className="text-secondary-foreground" />
      </View>

      {/* Transaction details */}
      <View className="py-10 flex flex-col gap-5 items-center">
        <Avatar name={title} size={50} />
        <Text>{title}</Text>
        <Text>
          {currencySymbol}
          {amount}
        </Text>
        <Text>{date}</Text>
      </View>

      {/* Description */}
      <View className="flex flex-col bg-background rounded-2xl mt-3">
        <React.Fragment>
          <View className="p-3 flex flex-row items-center justify-between gap-5">
            <Text className="flex-1 text-secondary-foreground text-base font-medium">Category</Text>
            <Text className="flex-1 text-secondary-foreground text-base font-medium">
              {category}
            </Text>
          </View>
        </React.Fragment>

        <View className="h-[1px] bg-secondary-foreground/10" />
        <React.Fragment>
          <View className="p-3 flex flex-row items-center justify-between gap-5">
            <Text className="flex-1 text-secondary-foreground text-base font-medium">Account</Text>
            <Text className="flex-1 text-secondary-foreground text-base font-medium">
              {name} {type}
            </Text>
          </View>
        </React.Fragment>

        <View className="h-[1px] bg-secondary-foreground/10" />
        <React.Fragment>
          <View className="p-3 flex flex-row items-center justify-between gap-5">
            <Text className="flex-1 text-secondary-foreground text-base font-medium">Note</Text>
            <Text className="flex-1 text-secondary-foreground text-base font-medium">{note}</Text>
          </View>
        </React.Fragment>
      </View>
    </PageView>
  );
};

export default Transaction;
