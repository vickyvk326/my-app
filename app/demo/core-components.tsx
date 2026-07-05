import { Stack } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700">
      <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-50">{title}</Text>
      {children}
    </View>
  );
}

export default function CoreComponentsScreen() {
  const [switchOn, setSwitchOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressableDown, setPressableDown] = useState(false);

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: 'Core Components' }} />

      <Section title="Image">
        <Image
          source={{ uri: 'https://picsum.photos/seed/rn-playground/600/300' }}
          className="h-40 w-full rounded-xl"
          resizeMode="cover"
        />
      </Section>

      <Section title="Pressable vs TouchableOpacity">
        <View className="flex-row gap-3">
          <Pressable
            onPressIn={() => setPressableDown(true)}
            onPressOut={() => setPressableDown(false)}
            className={`flex-1 items-center rounded-xl p-3 ${pressableDown ? 'bg-indigo-800' : 'bg-indigo-600'}`}
          >
            <Text className="font-medium text-white">Pressable</Text>
          </Pressable>
          <TouchableOpacity
            activeOpacity={0.6}
            className="flex-1 items-center rounded-xl bg-emerald-600 p-3"
          >
            <Text className="font-medium text-white">TouchableOpacity</Text>
          </TouchableOpacity>
        </View>
      </Section>

      <Section title="Switch">
        <View className="flex-row items-center justify-between">
          <Text className="text-neutral-700 dark:text-neutral-300">
            Notifications: {switchOn ? 'on' : 'off'}
          </Text>
          <Switch value={switchOn} onValueChange={setSwitchOn} />
        </View>
      </Section>

      <Section title="ActivityIndicator">
        <View className="flex-row items-center gap-3">
          {loading ? <ActivityIndicator size="small" /> : <Text>Done loading.</Text>}
          <Pressable onPress={() => setLoading((v) => !v)}>
            <Text className="text-indigo-600 dark:text-indigo-400">Toggle</Text>
          </Pressable>
        </View>
      </Section>

      <Section title="Modal">
        <Pressable
          onPress={() => setModalVisible(true)}
          className="items-center rounded-xl bg-neutral-800 p-3"
        >
          <Text className="font-medium text-white">Open Modal</Text>
        </Pressable>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 items-center justify-center bg-black/50">
            <View className="w-4/5 gap-4 rounded-2xl bg-white p-6 dark:bg-neutral-800">
              <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                Hello from a Modal
              </Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                className="items-center rounded-xl bg-indigo-600 p-3"
              >
                <Text className="font-medium text-white">Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Section>
    </ScreenContainer>
  );
}
