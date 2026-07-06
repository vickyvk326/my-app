import { ScrollView, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ScreenContainer({ children, contentContainerStyle, ...rest }: ScrollViewProps) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={[{ padding: 16, gap: 16 }, contentContainerStyle]}
        {...rest}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
