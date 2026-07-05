import { Stack } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FormsScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscribe, setSubscribe] = useState(true);

  const emailError = email.length > 0 && !EMAIL_RE.test(email);
  const canSubmit = name.trim().length > 0 && EMAIL_RE.test(email) && password.length >= 6;

  function handleSubmit() {
    Alert.alert(
      'Submitted',
      `Name: ${name}\nEmail: ${email}\nSubscribed: ${subscribe ? 'yes' : 'no'}`,
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenContainer>
        <Stack.Screen options={{ title: 'Forms & Inputs' }} />

        <View className="gap-1">
          <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ada Lovelace"
            placeholderTextColor="#9ca3af"
            className="rounded-xl border border-neutral-300 p-3 text-neutral-900 dark:border-neutral-600 dark:text-neutral-50"
          />
        </View>

        <View className="gap-1">
          <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="ada@example.com"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            keyboardType="email-address"
            className={`rounded-xl border p-3 text-neutral-900 dark:text-neutral-50 ${
              emailError ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
            }`}
          />
          {emailError && <Text className="text-xs text-red-500">Enter a valid email.</Text>}
        </View>

        <View className="gap-1">
          <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="At least 6 characters"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            className="rounded-xl border border-neutral-300 p-3 text-neutral-900 dark:border-neutral-600 dark:text-neutral-50"
          />
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-neutral-700 dark:text-neutral-300">Subscribe to updates</Text>
          <Switch value={subscribe} onValueChange={setSubscribe} />
        </View>

        <Pressable
          disabled={!canSubmit}
          onPress={handleSubmit}
          className={`items-center rounded-xl p-3 ${canSubmit ? 'bg-indigo-600' : 'bg-neutral-300 dark:bg-neutral-700'}`}
        >
          <Text className="font-medium text-white">Submit</Text>
        </Pressable>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
