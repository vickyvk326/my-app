import { Tabs } from 'expo-router';

import { ThemedIonicons } from '@/components/ThemedIonicons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <ThemedIonicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="demos"
        options={{
          title: 'Demos',
          tabBarIcon: ({ color, size }) => (
            <ThemedIonicons name="apps-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
