import { Tabs } from 'expo-router';

import { ThemedIonicons } from '@/components/ThemedIonicons';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

const tabs: { icon: keyof typeof Feather.glyphMap; name: string; title: string }[] = [
  {
    name: 'index',
    title: 'Home',
    icon: 'home',
  },
  {
    name: 'search',
    title: 'Search',
    icon: 'search',
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: 'user',
  },
  {
    name: 'demo',
    title: 'Demo',
    icon: 'code',
  },
] as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'rgb(10, 94, 70)',
        animation: 'shift',
        freezeOnBlur: true,
        lazy: true,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  backgroundColor: focused ? '#CDEEE0' : 'transparent',
                  width: 60,
                  height: 30,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ThemedIonicons name={tab.icon} size={size} color={color} className="p-10" />
              </View>
            ),
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: {
              height: 60,
              paddingTop: 5,
            },
          }}
        />
      ))}
    </Tabs>
  );
}
