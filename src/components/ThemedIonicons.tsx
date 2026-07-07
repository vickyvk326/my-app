import { Feather } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';

export const ThemedIonicons = cssInterop(Feather , {
  className: {
    target: false,
    nativeStyleToProp: { color: true },
  },
});
