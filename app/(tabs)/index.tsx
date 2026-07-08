import Avatar from '@/components/Avatar';
import PageView from '@/components/PageView';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  // mock recent activities
  const recentActivities = [
    {
      id: 1,
      title: 'Whole Foods Market',
      category: 'Groceries',
      amount: '-$64.20',
      date: '2024-07-01 12:30 PM',
    },
    {
      id: 2,
      title: 'Starbucks',
      category: 'Coffee',
      amount: '-$5.50',
      date: '2024-07-01 10:15 AM',
    },
    {
      id: 3,
      title: 'Salary — Acme Inc.',
      category: 'Income',
      amount: '$3,200.00',
      date: '2024-07-01 09:00 AM',
    },
    {
      id: 4,
      title: 'Netflix',
      category: 'Entertainment',
      amount: '-$15.99',
      date: '2024-06-30 08:00 PM',
    },
    {
      id: 5,
      title: 'Amazon',
      category: 'Shopping',
      amount: '-$120.00',
      date: '2024-06-30 07:30 PM',
    },
  ];
  return (
    <PageView title="Home">
      
      {/* Top greetings */}
      <View className="flex flex-row justify-between items-center p-5">
        <View>
          <Text className="font-medium text-secondary-foreground/80">Good morning</Text>
          <Text className="font-bold text-base text-secondary-foreground">Aanya</Text>
        </View>
        <Avatar name="Aanya K" size={45} color="#DCEFE6" />
      </View>

      <ScrollView contentContainerClassName="px-5">
        {/* Quick overview */}
        <View className="flex flex-col gap-3 bg-accent rounded-2xl p-5">
          <Text className="text-accent-foreground/90 text-md font-medium">Total balance</Text>
          <Text className="text-2xl font-bold text-white">$4,820.50</Text>
          <View className="flex flex-row gap-5">
            <View className="flex-1 flex-col gap-1 bg-accent-foreground/10 p-3 pt-1.5 rounded-2xl">
              <Text className="text-xs font-medium text-accent-foreground/90">Income</Text>
              <Text className="text-md font-bold text-white">+$3,200</Text>
            </View>
            <View className="flex-1 flex-col gap-1 bg-accent-foreground/10 p-3 pt-1.5 rounded-2xl">
              <Text className="text-xs font-medium text-accent-foreground/90">Spent</Text>
              <Text className="text-md font-bold text-white">-$1,540</Text>
            </View>
          </View>
        </View>

        {/* Month budget */}
        <View className="p-4 flex flex-col gap-2 bg-background rounded-2xl mt-5">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-secondary-foreground/90 text-base font-semibold">
              July budget
            </Text>
            <Text className="text-secondary-foreground/70 text-md font-medium">
              $1,540 / $2,000
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
                  style={{ color: activity.amount.startsWith('-') ? '#EF4444' : '#10B981' }}
                >
                  {activity.amount}
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
