import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';

const BackHeader = ({ handleBack }: { handleBack: any }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
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
          color={theme.colors.text['400']}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
