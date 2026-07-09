import PageView from '@/components/PageView';
import { ThemedIonicons } from '@/components/ThemedIonicons';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { currencyCodeMap, TRANSACTION_CATEGORIES } from '@/constants';
import { useSettingsStore } from '@/store/useSettingsStore';
import { TriggerRef } from '@rn-primitives/select';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NewExpense = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>(TRANSACTION_CATEGORIES[0]);
  const [note, setNote] = useState('');
  function handleAmountChange(text: string) {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    const normalized = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;
    const [whole, decimal] = normalized.split('.');
    const capped = decimal !== undefined ? `${whole}.${decimal.slice(0, 2)}` : whole;
    setAmount(capped);
  }
  const { settings } = useSettingsStore();
  const { currency } = settings.systemSettings;
  const selectedCategoryOption = {
    label: category,
    value: category,
  };
  const ref = React.useRef<TriggerRef>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };
  return (
    <PageView title="New Expense">
      <View className="flex-1">
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
          <Text className="text-muted-foreground font-medium">Amount</Text>
          <View className="flex flex-row items-center justify-center">
            <Text className="text-4xl font-bold text-secondary-foreground mt-1">
              {currencyCodeMap[currency]}
            </Text>
            <Input
              keyboardType="decimal-pad"
              className="border-0 w-min text-4xl font-bold h-min p-0"
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

        <ScrollView className="flex-1" contentContainerClassName="flex-1">
          {/* Category */}
          <View className="flex-row items-center bg-background mt-5 py-3 px-5">
            <Text className="text-muted-foreground text-base font-medium flex-1 px-3">
              Category
            </Text>
            <Select
              defaultValue={selectedCategoryOption}
              value={selectedCategoryOption}
              onValueChange={(option) => setCategory(option?.value as string)}
            >
              <SelectTrigger ref={ref} className="w-min border-0 text-base">
                <SelectValue className="text-base font-medium" placeholder="USD $" />
              </SelectTrigger>
              <SelectContent insets={contentInsets} className="w-[180px] text-base">
                <ScrollView style={{ maxHeight: 500 }}>
                  <SelectGroup className="text-base">
                    <SelectLabel>Currency</SelectLabel>
                    {TRANSACTION_CATEGORIES.map((category) => (
                      <SelectItem
                        key={category}
                        label={`${category[0].toUpperCase()}${category.slice(1)}`}
                        value={category}
                        className="text-base font-medium"
                      >
                        {category[0].toUpperCase()}
                        {category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </ScrollView>
              </SelectContent>
            </Select>
          </View>

          {/* Details */}
          <View className="flex-1 bg-background px-5">
            <View className="flex flex-col">
              <View className="h-[1px] bg-secondary-foreground/10" />
              <View className="p-3 flex flex-row items-center justify-between gap-5">
                <Text className="flex-1 text-muted-foreground text-base font-medium">Date</Text>
                <Text className="text-secondary-foreground text-base font-medium">
                  Today, Jul 7
                </Text>
              </View>

              <View className="h-[1px] bg-secondary-foreground/10" />
              <View className="p-3 flex flex-row items-center justify-between gap-5">
                <Text className="flex-1 text-muted-foreground text-base font-medium">Account</Text>
                <Text className="text-secondary-foreground text-base font-medium">
                  Debit ••4821
                </Text>
              </View>

              <View className="h-[1px] bg-secondary-foreground/10" />
              <Text className="p-3 text-muted-foreground text-base font-medium">Note</Text>
              <View className="px-3 flex flex-col gap-2">
                <Input
                  className="text-secondary-foreground text-base font-medium"
                  value={note}
                  onChangeText={(t) => setNote(t)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </PageView>
  );
};

export default NewExpense;
