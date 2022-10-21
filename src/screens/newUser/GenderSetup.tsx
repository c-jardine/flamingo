import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
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

  const { values, setFieldValue } = useFormikContext<NewUserProps>();

  // Set Formik gender field - passed to gender Selector
  const handleSelectGender = (value: string) => {
    setFieldValue('gender.gender', value);
  };

  // Set Formik gender identities field - passed to identities selector
  const handleToggle = (value: string) => {
    let arr = values.gender.identities || [];
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      arr.push(value);
    }
    setFieldValue('gender.identities', arr);
  };

  React.useEffect(() => {
    setFieldValue('gender.identities', []);
  }, [values.gender.gender]);

  return (
    <NewUserSetupLayout
      title='Choose your gender'
      description='This will help with the matchmaking process.'
      handleBack={() => props.navigator(NewProfileScreenEnum.DATE_OF_BIRTH)}
      handleNext={() => props.navigator(NewProfileScreenEnum.PRONOUNS)}
      nextDisabled={!values.gender.gender}
    >
      <View style={{ flex: 1 }}>
        <Selector
          items={Genders}
          onSelect={handleSelectGender}
          initialSelected={values.gender.gender}
          horizontal
        />
        {values.gender.gender && (
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
                <Header.Description>(optional)</Header.Description>
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
