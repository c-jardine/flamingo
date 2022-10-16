import React from 'react';
import { View } from 'react-native';
import Camera from '../../components/core/Camera';
import Header from '../../components/core/Header';
import { ThemeContext } from '../../provider/ThemeProvider';

const IDVerification = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: 64,
      }}
    >
      <Header>
        <Header.Title>Verify your identity</Header.Title>
        <Header.Description>
          To keep Flamingo users safe, we require users to verify their identity
          with a state ID or driver's license. Don't worry, it won't be stored.
        </Header.Description>
      </Header>
      <Camera />
    </View>
  );
};

export default IDVerification;
