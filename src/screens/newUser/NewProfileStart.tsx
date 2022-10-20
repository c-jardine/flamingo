import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Header from '../../components/core/Header';
import IconButton from '../../components/core/IconButton';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';

const NewProfileStart = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <Animated.View
        entering={FadeIn.duration(200).delay(200)}
        exiting={FadeOut.duration(200)}
      >
        <Header>
          <Header.Title>Set up your profile</Header.Title>
          <Header.Description>
            Before using Flamingo, you need to finish setting up your profile.
            Click the next button to get started.
          </Header.Description>
        </Header>
      </Animated.View>

      <View style={{ alignItems: 'flex-end' }}>
        <IconButton
          name='arrow-right'
          onPress={() => props.navigator(NewProfileScreenEnum.PERSONAL_INFO)}
        />
      </View>
    </View>
  );
};
export default NewProfileStart;
