import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Header from '../../components/core/Header';
import IconButton from '../../components/core/IconButton';
import NewUserSetupLayout from '../../components/layouts/NewUserSetupLayout';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';

const NewProfileStart = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <NewUserSetupLayout
      title='Set up your profile'
      description='Before using Flamingo, you need to finish setting up your profile. Click the next button to get started.'
      handleNext={() => props.navigator(NewProfileScreenEnum.GENDER)}
      nextDisabled={false}
    />
  );
};
export default NewProfileStart;
