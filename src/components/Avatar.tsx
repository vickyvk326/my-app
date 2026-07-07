import React from 'react';

import { Text, View } from 'react-native';

type Props = { name: string; size: number; color: string };

const Avatar = ({ name, size, color }: Props) => {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .filter(char => /[a-zA-Z]/.test(char))
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text className="font-semibold" style={{ fontSize: size / 3 }}>
        {initials}
      </Text>
    </View>
  );
};

export default Avatar;
