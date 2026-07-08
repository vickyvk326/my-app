import { Transaction } from '@/store/useTransactionsStore';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';
import Avatar from './Avatar';

interface TransactionRowViewProps {
  activity: Transaction;
  currencySymbol: string;
}
export default function TransactionRowView({ activity, currencySymbol }: TransactionRowViewProps) {
  const relativeTimeAgo = formatDistanceToNow(new Date(activity.date), { addSuffix: true });
  return (
    <View className="flex flex-row gap-4 justify-between items-center rounded-2xl">
      <Avatar name={activity.title} size={40} color="#DCEFE6" />
      <View className="flex-1">
        <Text className="text-secondary-foreground/90 text-md font-semibold">{activity.title}</Text>
        <View className="flex flex-col">
          <Text
            className="text-secondary-foreground/70 text-sm font-medium max-w-20"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {activity.category}
          </Text>
          <Text className="text-secondary-foreground/70 text-xs font-medium">
            {relativeTimeAgo}
          </Text>
        </View>
      </View>
      <Text
        className="text-md font-bold"
        style={{
          color: activity.amount < 0 ? '#EF4444' : activity.amount > 0 ? '#10B981' : '#3B82F6',
        }}
      >
        {activity.amount < 0 ? '- ' : activity.amount > 0 ? '+ ' : ''}
        {currencySymbol}
        {activity.amount.toLocaleString()}
      </Text>
    </View>
  );
}
