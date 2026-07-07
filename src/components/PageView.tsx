import { Stack } from 'expo-router';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = { title: string; children: ReactNode };

const PageView = ({ title, children }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-accent/10 relative">
      <Stack.Screen options={{ title }} />
      {children}
    </SafeAreaView>
  );
};

export default PageView;
