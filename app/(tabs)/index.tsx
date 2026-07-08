import Avatar from '@/components/Avatar';
import PageView from '@/components/PageView';
import { ThemedIonicons } from '@/components/ThemedIonicons';
import TransactionRowView from '@/components/TransactionRowView';
import { currencyCodeMap } from '@/constants';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useTransactionsStore } from '@/store/useTransactionsStore';
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  const { settings } = useSettingsStore();

  const { accounts } = settings.accountsSettings;
  const availableTotalbalance = accounts.reduce((acc, a) => acc + a.balance, 0);

  const { currency } = settings.systemSettings;
  const currencySymbol = currencyCodeMap[currency];

  const { firstName, lastName } = settings.personalSettings;
  const fullName = `${firstName}${lastName ? ' ' + lastName : ''}`;

  const { monthlyBudget } = settings.financeSettings;

  const { transactions } = useTransactionsStore();

  const today = useMemo(() => new Date(), []);
  const monthName = today.toLocaleString('default', { month: 'long' });

  const currentMonthTransactions = useMemo(
    () => transactions.filter((t) => new Date(t.date).getMonth() === today.getMonth()),
    [transactions, today],
  );

  const currentMonthTotalIncome = currentMonthTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const currentMonthTotalExpense = currentMonthTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const budgetPercentage = Math.min((currentMonthTotalExpense / monthlyBudget) * 100, 100);

  const recentActivities = transactions.slice(0, 5);

  return (
    <PageView title="Home">
      {/* Top greetings */}
      <View className="flex flex-row justify-between items-center px-5 py-4">
        <View>
          <Text className="font-medium text-muted-foreground text-base">Good morning</Text>
          <Text className="font-bold text-lg text-secondary-foreground/90">{firstName}</Text>
        </View>
        <Avatar name={fullName} size={45} color="#DCEFE6" />
      </View>

      {/* Dashboard */}
      <ScrollView contentContainerClassName="px-5">
        {/* Quick overview */}
        <View className="flex flex-col gap-3 bg-accent rounded-2xl p-5">
          <Text className="text-accent-foreground/80 text-base font-medium">Total balance</Text>
          <Text className="text-2xl font-bold text-white tracking-wider">
            {currencySymbol}
            {availableTotalbalance.toLocaleString()}
          </Text>
          <View className="flex flex-row gap-5">
            <View className="flex-1 flex-col gap-1 bg-accent-foreground/20 p-3 pt-1.5 rounded-2xl">
              <Text className="text-xs font-medium text-accent-foreground/90">Income</Text>
              <Text className="text-md font-bold text-white tracking-wider">
                +{currencySymbol}
                {currentMonthTotalIncome.toLocaleString()}
              </Text>
            </View>
            <View className="flex-1 flex-col gap-1 bg-accent-foreground/20 p-3 pt-1.5 rounded-2xl">
              <Text className="text-xs font-medium text-accent-foreground/90">Spent</Text>
              <Text className="text-md font-bold text-white tracking-wider">
                -{currencySymbol}
                {currentMonthTotalExpense.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Month budget */}
        <View className="p-4 flex flex-col gap-2 bg-background rounded-2xl mt-5">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-secondary-foreground/90 text-base font-semibold">
              {monthName} budget
            </Text>
            <Text className="text-secondary-foreground/70 text-sm font-medium tracking-wider">
              {currencySymbol}
              {currentMonthTotalExpense.toLocaleString()} / {currencySymbol}
              {monthlyBudget.toLocaleString()}
            </Text>
          </View>

          <View className="h-2 w-full bg-secondary-foreground/10 rounded-full mt-2">
            <View
              className="h-2 bg-accent rounded-full"
              style={{ width: `${budgetPercentage}%` }}
            />
          </View>
        </View>

        {/* Recent activity */}
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-secondary-foreground/90 text-md font-semibold">
            Recent activity
          </Text>
          <Link href={'/'}>
            <Text className="text-accent text-md font-semibold">See all</Text>
          </Link>
        </View>

        {/* Recent transactions */}
        <View className="flex flex-col gap-3 mt-3 bg-background rounded-2xl p-3 mb-5">
          {recentActivities.map((activity, i) => (
            <React.Fragment key={activity.id}>
              {i > 0 && <View className="h-[1px] bg-secondary-foreground/10" />}
              <TransactionRowView activity={activity} currencySymbol={currencySymbol} />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* Add transaction button */}
      <Link href="/new-expense" asChild className="absolute bottom-3 right-3" prefetch>
        <Pressable className="bg-accent h-12 w-12 rounded-2xl items-center justify-center">
          <ThemedIonicons name="plus" size={20} className="text-accent-foreground" />
        </Pressable>
      </Link>
    </PageView>
  );
}
