import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import ArrowNavigator from '../../../components/core/ArrowNavigator/ArrowNavigator';
import Header from '../../../components/core/Header';
import Selector from '../../../components/forms/Selector';
import FormPageLayout from '../../../components/layouts/FormPageLayout';
import { GenderIdentities, Genders } from '../../../constants/gender';
import { NewProfileScreenEnum } from '../../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../../types/auth/NewProfileScreenProps';
import { NewUserProps } from '../NewUserSetupScreen/NewUserSetupScreen';

const GenderScreen = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const { values: formikValues, setFieldValue } =
    useFormikContext<NewUserProps>();

  // Set Formik gender field - passed to gender Selector
  const handleSelectGender = (value: string) => {
    setFieldValue('gender.gender', value);
  };

  // Set Formik gender identities field - passed to gender identity Selector
  const handleSelectIdentity = (values: string[]) => {
    setFieldValue('gender.identities', values);
  };

  React.useEffect(() => {
    setFieldValue('gender.identities', []);
  }, [formikValues.gender.gender]);

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Choose your gender'
        description='This will help with the matchmaking process.'
      />

      <FormPageLayout.PageContent>
        <View style={{ width: '100%' }}>
          <Selector
            items={Genders}
            onSelect={handleSelectGender}
            value={formikValues.gender.gender}
            horizontal
          />
        </View>
        {formikValues.gender.gender && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={{ flex: 1, paddingHorizontal: theme.spacing.md }}
          >
            <Header style={{ marginTop: theme.spacing.xxl }}>
              <Header.Title>Want to be more specific?</Header.Title>
              <Header.Description>
                We strive to be inclusive. Please reach out if you feel we're
                missing something.
              </Header.Description>
              <Header.Description>(optional)</Header.Description>
            </Header>
            <View style={{ height: theme.spacing.md }} />
            <Selector
              items={GenderIdentities[formikValues.gender.gender]}
              value={formikValues.gender.identities}
              multiselect
              onSelect={handleSelectIdentity}
            />
          </Animated.View>
        )}
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => props.navigator(NewProfileScreenEnum.DATE_OF_BIRTH),
          }}
          nextComponent={{
            onPress: () => props.navigator(NewProfileScreenEnum.PRONOUNS),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default GenderScreen;
