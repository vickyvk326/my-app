import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager, QueryClient } from '@tanstack/react-query';
import { AppState, type AppStateStatus } from 'react-native';

export const queryClient = new QueryClient();

// TanStack Query assumes a browser by default. On React Native we drive
// "online" state from NetInfo and "focus" state from AppState instead.
// https://tanstack.com/query/latest/docs/framework/react/react-native
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active');
}

AppState.addEventListener('change', onAppStateChange);
