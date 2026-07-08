import PageView from '@/components/PageView';
import { ThemedIonicons } from '@/components/ThemedIonicons';
import { Input } from '@/components/ui/input';
import { currencyCodeMap, TRANSACTION_CATEGORIES } from '@/constants';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const NewExpense = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('0');
  const [category, setCategory] = useState<string>(TRANSACTION_CATEGORIES[0]);
  function handleAmountChange(text: string) {
    // allow only digits and a single decimal point, max 2 decimal places
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    const normalized = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;
    const [whole, decimal] = normalized.split('.');
    const capped = decimal !== undefined ? `${whole}.${decimal.slice(0, 2)}` : whole;
    setAmount(capped);
  }
  const { settings } = useSettingsStore();
  const { currency } = settings.systemSettings;
  return (
    <PageView title="New Expense">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex flex-row items-center gap-5 bg-background p-5 mb-5">
          <Pressable onPress={() => router.back()}>
            <ThemedIonicons name="x" className="text-secondary-foreground font-medium" size={20} />
          </Pressable>
          <Text className="text-lg text-secondary-foreground flex-1 font-semibold">
            New expense
          </Text>
          <Pressable>
            <Text className="text-accent text-md font-semibold">Save</Text>
          </Pressable>
        </View>

        {/* Amount */}
        <View className="flex flex-col gap-1 items-center justify-center py-5">
          <Text className="text-muted-foreground">Amount</Text>
          <View className="flex flex-row items-center justify-center">
            <Text className="text-4xl font-bold text-secondary-foreground mt-1">
              {currencyCodeMap[currency]}
            </Text>
            <Input
              keyboardType="decimal-pad"
              className="border-0 w-min text-4xl font-bold h-min"
              placeholder="0"
              style={{
                backgroundColor: 'transparent',
                lineHeight: 44, // ~1.1x your text-4xl font size, same for both states
                textAlignVertical: 'center',
                includeFontPadding: false, // Android-only: strips extra font padding causing baseline drift
              }}
              value={amount}
              onChangeText={handleAmountChange}
            />
          </View>
        </View>

        <View className="flex-1 bg-background mt-5 p-5">
          <Text className="text-muted text-md font-medium">Category</Text>
          <View className="flex flex-row items-center gap-3 mt-3" style={{ flexWrap: 'wrap' }}>
            {TRANSACTION_CATEGORIES.map((c) => (
              <Pressable
                key={c}
                className={`rounded-xl px-2 py-1.5 ${c === category ? 'bg-accent' : 'bg-muted'}`}
                onPress={() => setCategory(c)}
              >
                <Text
                  className={`text-secondary-foreground text-sm font-medium ${c === category ? 'text-white' : 'text-muted-foreground'}`}
                >
                  {c[0].toUpperCase()}
                  {c.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="bg-background py-4 px-5">
          <View className="flex flex-col">
            <React.Fragment>
              <View className="p-3 flex flex-row items-center justify-between gap-5">
                <Text className="flex-1 text-secondary-foreground text-base font-medium">Date</Text>
                <Text>Today, Jul 7</Text>
              </View>
            </React.Fragment>

            <View className="h-[1px] bg-secondary-foreground/10" />

            <React.Fragment>
              <View className="p-3 flex flex-row items-center justify-between gap-5">
                <Text className="flex-1 text-secondary-foreground text-base font-medium">
                  Account
                </Text>
                <Text>Debit ••4821</Text>
              </View>
            </React.Fragment>

            <View className="h-[1px] bg-secondary-foreground/10" />

            <React.Fragment>
              <View className="p-3 flex flex-col gap-2">
                <Text className="flex-1 text-secondary-foreground text-base font-medium">Note</Text>
                <Text>Lunch with team</Text>
              </View>
            </React.Fragment>
          </View>
        </View>
      </ScrollView>
    </PageView>
  );
};

export default NewExpense;
