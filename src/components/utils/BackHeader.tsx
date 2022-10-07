import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Color } from '../../styles/Color';

const BackHeader = ({ handleBack }: { handleBack: any }) => {
  return (
    <View
      style={{
        backgroundColor: Color.base,
        paddingHorizontal: 8,
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          padding: 8,
          maxWidth: 56,
          borderRadius: 28,
        }}
        onPress={handleBack}
      >
        <MaterialCommunityIcons
          name='arrow-left'
          size={40}
          color={Color.text.body}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
