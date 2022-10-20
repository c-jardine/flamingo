import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated';
import Header from '../../components/core/Header';
import ToggleList from '../../components/core/ToggleList';
import Selector from '../../components/forms/Selector';
import NewUserSetupLayout from '../../components/layouts/NewUserSetupLayout';
import { GenderIdentities, Genders } from '../../constants/gender';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';
import { NewUserProps } from './NewUserSetup';

const GenderSetup = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, errors, setFieldValue } = useFormikContext<NewUserProps>();

  const handleToggle = (value: string) => {
    let arr = values.gender.identities || [];
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      arr.push(value);
    }
    setFieldValue('identities', arr);
  };

  React.useEffect(() => {
    console.log(values.gender);
  }, []);

  return (
    <NewUserSetupLayout
      title='Choose your gender'
      description='This will help with the matchmaking process.'
      handleNext={() => props.navigator(NewProfileScreenEnum.START)}
      nextDisabled={!!errors.gender?.gender}
    >
      <View style={{ flex: 1 }}>
        <Selector items={Genders} field='gender.gender' />
        {!errors.gender?.gender && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1 }}>
              <Header style={{ marginTop: theme.spacing.xxl }}>
                <Header.Title>Want to be more specific?</Header.Title>
                <Header.Description>
                  We strive to be inclusive. Please reach out if you feel we're
                  missing something.
                </Header.Description>
              </Header>
              <ToggleList
                data={GenderIdentities[values.gender.gender]}
                handleToggle={handleToggle}
                contentContainerStyle={{ marginTop: theme.spacing.md }}
              />
            </View>
          </Animated.View>
        )}
      </View>
    </NewUserSetupLayout>
  );
};

export default GenderSetup;
