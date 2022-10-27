import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../../components/common';
import { ThemeContext } from '../../../providers';
import { ConfirmEmailScreenNavigationProp } from './ConfirmEmailScreen.type';

const ConfirmEmailScreen = (props: {
  navigation: ConfirmEmailScreenNavigationProp;
}) => {
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
      <Button
        label={'Return to sign in'}
        onPress={() => props.navigation.navigate('SignIn')}
        contentContainerStyle={{ marginTop: theme.spacing.xxl }}
      />
    </View>
  );
};

export default ConfirmEmailScreen;
