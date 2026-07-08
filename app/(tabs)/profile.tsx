import Avatar from '@/components/Avatar';
import PageView from '@/components/PageView';
import { ThemedIonicons } from '@/components/ThemedIonicons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { currencyCodeMap, currencyCodes, CurrencyCodeType } from '@/constants';
import { useSettingsStore } from '@/store/useSettingsStore';
import { TriggerRef } from '@rn-primitives/select';
import React, { useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const accountSettingsList = [
  { name: 'Personal info', route: '/' },
  { name: 'Cards & accounts', route: '/' },
  { name: 'Categories', route: '/' },
];
export default function DemosScreen() {
  const [checked, setChecked] = useState(true);
  const ref = React.useRef<TriggerRef>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };
  const { settings, updateSystemSettings } = useSettingsStore();
  const { currency } = settings.systemSettings;
  const selectedCurrencyOption = {
    label: `${currency} ${currencyCodeMap[currency]}`,
    value: currency,
  };
  const handleCurrencyChange = (currencyToChange: CurrencyCodeType) =>
    updateSystemSettings({ currency: currencyToChange });
  return (
    <PageView title="Profile">
      <View className="p-5 flex-1">
        <ScrollView className="mb-5">
          <Text className="text-2xl font-bold text-secondary-foreground mb-3">Profile</Text>

          {/* Name card */}
          <View className="bg-background p-5 rounded-xl flex flex-row items-center justify-between gap-5">
            <Avatar name="Aanya" size={50} color="#DCEFE6" />
            <View className="flex-1 flex flex-col gap-1">
              <Text className="text-secondary-foreground text-lg font-semibold">Aanya kapoor</Text>
              <Text className="text-muted-foreground/80 font-medium">aanya.k@email.com</Text>
            </View>
            <ThemedIonicons
              name="chevron-right"
              className="text-muted-foreground font-semibold"
              size={16}
            />
          </View>

          {/* Account Settings */}
          <View className="mt-5">
            <Text className="text-muted-foreground font-medium">Account</Text>
            <View className="flex flex-col bg-background rounded-2xl mt-3">
              {accountSettingsList.map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <View className="h-[1px] bg-secondary-foreground/10" />}
                  <View className="p-3 flex flex-row items-center justify-between gap-5">
                    <Avatar
                      name={s.name}
                      size={40}
                      color="#DCEFE6"
                      maxChars={1}
                      borderRadiusLevel={3}
                    />
                    <Text className="flex-1 text-secondary-foreground text-base font-medium">
                      {s.name}
                    </Text>
                    <ThemedIonicons
                      name="chevron-right"
                      className="text-muted-foreground font-semibold"
                      size={16}
                    />
                  </View>
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Preferences */}
          <View className="mt-5">
            <Text className="text-muted-foreground font-medium">Preferences</Text>
            <View className="flex flex-col bg-background rounded-2xl mt-3">
              <React.Fragment>
                <View className="p-3 flex flex-row items-center justify-between gap-5">
                  <Text className="flex-1 text-secondary-foreground text-base font-medium">
                    Notifications
                  </Text>
                  <Switch
                    checked={checked}
                    onCheckedChange={(val) => setChecked(val)}
                    className={checked ? 'bg-accent' : 'bg-muted-foreground'}
                  />
                </View>
              </React.Fragment>

              <View className="h-[1px] bg-secondary-foreground/10" />

              <React.Fragment>
                <View className="p-3 flex flex-row items-center justify-between gap-5">
                  <Text className="flex-1 text-secondary-foreground text-base font-medium">
                    Biometric unlock
                  </Text>
                  <Switch
                    checked={checked}
                    onCheckedChange={(val) => setChecked(val)}
                    className={checked ? 'bg-accent' : 'bg-muted-foreground'}
                  />
                </View>
              </React.Fragment>

              <View className="h-[1px] bg-secondary-foreground/10" />

              <React.Fragment>
                <View className="p-3 flex flex-row items-center justify-between gap-5">
                  <Text className="flex-1 text-secondary-foreground text-base font-medium">
                    Currency
                  </Text>
                  <Select
                    defaultValue={selectedCurrencyOption}
                    value={selectedCurrencyOption}
                    onValueChange={(option) =>
                      handleCurrencyChange(option?.value as CurrencyCodeType)
                    }
                  >
                    <SelectTrigger ref={ref} className="w-min border-0">
                      <SelectValue placeholder="USD $" />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-[180px]">
                      <SelectGroup>
                        <SelectLabel>Currency</SelectLabel>
                        {currencyCodes.map((cc) => (
                          <SelectItem key={cc} label={`${cc} ${currencyCodeMap[cc]}`} value={cc}>
                            {`${cc} ${currencyCodeMap[cc]}`}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </View>
              </React.Fragment>
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity className="flex-1 flex-row items-center mt-5 justify-center">
            <Text className="text-red-800 dark:text-red-600 active:bg-red-100">Log out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </PageView>
  );
}
