import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import KButton from '../../components/core/KButton';
import { AuthScreensEnum } from '../../enums/AuthScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { AuthScreenNavigatorProps } from '../../types/auth/AuthScreen';

const AwaitEmailVerification = (props: AuthScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons
        name='email-fast'
        color={theme.colors.primary}
        size={64}
      />
      <Text
        style={[
          theme.textVariants.title,
          {
            textAlign: 'center',
            color: theme.colors.white,
            paddingHorizontal: theme.spacing.md,
          },
        ]}
      >
        Email confirmation
      </Text>
      <Text
        style={{
          color: theme.colors.text['400'],
          fontSize: 16,
          marginTop: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        }}
      >
        A confirmation link has been sent to your email.
      </Text>
      <KButton
        loading={false}
        label={'Return to sign in'}
        onPress={() => props.navigator(AuthScreensEnum.SIGN_IN)}
      />
    </View>
  );
};

export default AwaitEmailVerification;
