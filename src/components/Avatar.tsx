import React from 'react';

import { Text, View } from 'react-native';

type Props = {
  name: string;
  size: number;
  color?: string;
  maxChars?: number;
  borderRadiusLevel?: number;
};

const Avatar = ({ name, size, color = '#DCEFE6', maxChars = 2, borderRadiusLevel = 2 }: Props) => {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .filter((char) => /[a-zA-Z]/.test(char))
    .slice(0, maxChars)
    .join('')
    .toUpperCase();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / borderRadiusLevel,
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
