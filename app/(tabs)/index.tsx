import Avatar from '@/components/Avatar';
import PageView from '@/components/PageView';
import { currencyCodeMap } from '@/constants';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useTransactionsStore } from '@/store/useTransactionsStore';
import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

  const today = new Date();
  const monthName = today.toLocaleString('default', { month: 'long' });

  const currentMonthTransactions = useMemo(
    () => transactions.filter((t) => new Date(t.date).getMonth() === today.getMonth()),
    [transactions],
  );

  const currentMonthTotalIncome = currentMonthTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const currentMonthTotalExpense = currentMonthTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const recentActivities = transactions.slice(0, 5);

  return (
    <PageView title="Home">
      {/* Top greetings */}
      <View className="flex flex-row justify-between items-center p-5">
        <View>
          <Text className="font-medium text-secondary-foreground/80">Good morning</Text>
          <Text className="font-bold text-base text-secondary-foreground">{fullName}</Text>
        </View>
        <Avatar name={fullName} size={45} color="#DCEFE6" />
      </View>

      {/* Dashboard */}
      <ScrollView contentContainerClassName="px-5">
        {/* Quick overview */}
        <View className="flex flex-col gap-3 bg-accent rounded-2xl p-5">
          <Text className="text-accent-foreground/90 text-md font-medium">Total balance</Text>
          <Text className="text-2xl font-bold text-white">
            {currencySymbol}
            {availableTotalbalance.toLocaleString()}
          </Text>
          <View className="flex flex-row gap-5">
            <View className="flex-1 flex-col gap-1 bg-accent-foreground/10 p-3 pt-1.5 rounded-2xl">
              <Text className="text-xs font-medium text-accent-foreground/90">Income</Text>
              <Text className="text-md font-bold text-white">
                +{currencySymbol}
                {currentMonthTotalIncome.toLocaleString()}
              </Text>
            </View>
            <View className="flex-1 flex-col gap-1 bg-accent-foreground/10 p-3 pt-1.5 rounded-2xl">
              <Text className="text-xs font-medium text-accent-foreground/90">Spent</Text>
              <Text className="text-md font-bold text-white">
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
            <Text className="text-secondary-foreground/70 text-md font-medium">
              {currencySymbol}
              {currentMonthTotalExpense.toLocaleString()} / {currencySymbol}
              {monthlyBudget.toLocaleString()}
            </Text>
          </View>

          <View className="h-2.5 w-full bg-secondary-foreground/10 rounded-full">
            <View className="h-2.5 w-[77%] bg-accent rounded-full" />
          </View>
        </View>

        {/* Recent activity */}
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-secondary-foreground/90 text-md font-semibold">
            Recent activity
          </Text>
          <TouchableOpacity>
            <Text className="text-accent text-md font-semibold">See all</Text>
          </TouchableOpacity>
        </View>

        {/* Recent transactions */}
        <View className="flex flex-col gap-3 mt-3 bg-background rounded-2xl p-3 mb-5">
          {recentActivities.map((activity, i) => (
            <React.Fragment key={activity.id}>
              {i > 0 && <View className="h-[1px] bg-secondary-foreground/10" />}
              <View className="flex flex-row gap-4 justify-between items-center rounded-2xl">
                <Avatar name={activity.title} size={40} color="#DCEFE6" />
                <View className="flex-1">
                  <Text className="text-secondary-foreground/90 text-md font-semibold">
                    {activity.title}
                  </Text>
                  <View className="flex flex-col">
                    <Text
                      className="text-secondary-foreground/70 text-sm font-medium max-w-20"
                      numberOfLines={1}
                      ellipsizeMode="tail" // 'head' | 'middle' | 'tail' | 'clip'
                    >
                      {activity.category}
                    </Text>
                    <Text className="text-secondary-foreground/70 text-xs font-medium">
                      {activity.date}
                    </Text>
                  </View>
                </View>
                <Text
                  className="text-md font-bold"
                  style={{
                    color:
                      activity.amount < 0 ? '#EF4444' : activity.amount > 0 ? '#10B981' : '#3B82F6',
                  }}
                >
                  {activity.amount < 0 ? '-' : activity.amount > 0 ? '+' : ''}
                  {currencySymbol}
                  {activity.amount.toLocaleString()}
                </Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* Add transaction button */}
      <TouchableOpacity className="absolute bottom-3 right-3 bg-accent h-14 w-14 rounded-2xl flex flex-row items-center justify-center">
        <Text className="text-accent-foreground text-4xl">+</Text>
      </TouchableOpacity>
    </PageView>
  );
}
