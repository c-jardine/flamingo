import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../provider/ThemeProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CameraSettingsButton = (props) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={props.handleAction}
      style={{
        padding: theme.spacing.sm,
        margin: 4,
        borderRadius: 32,
        backgroundColor: props.isEnabled
          ? theme.colors.white
          : theme.colors.text['100'],
      }}
    >
      <MaterialCommunityIcons
        name={props.name}
        size={18}
        color={props.isEnabled ? theme.colors.black : theme.colors.text['900']}
      />
    </TouchableOpacity>
  );
};

export default CameraSettingsButton;
