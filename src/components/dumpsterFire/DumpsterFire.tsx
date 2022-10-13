import React from 'react';
import { Text, View } from 'react-native';
import { Color } from '../../styles/Color';

const DumpsterFire = () => {
  return (
    <View
      style={{
        backgroundColor: Color.accent[50],
        flex: 1,
        borderRadius: 16,
        marginTop: 16,
        padding: 16,
      }}
    >
      <Text style={{ color: Color.text.primary }}>Chat placeholder</Text>
    </View>
  );
};
export default DumpsterFire;
