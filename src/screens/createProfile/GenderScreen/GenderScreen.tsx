import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ArrowNavigator } from '../../../components/common';
import Header from '../../../components/common/Header/Header';
import Selector from '../../../components/forms/Selector';
import { FormPageLayout } from '../../../components/layouts';
import { GenderIdentities, Genders } from '../../../constants/Gender';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { ProfileProps } from '../../../types/profile';
import { GenderScreenNavigationProp } from './GenderScreen.type';

const GenderScreen = (props: { navigation: GenderScreenNavigationProp }) => {
  const { theme } = React.useContext(ThemeContext);

  const { values: formikValues, setFieldValue } =
    useFormikContext<ProfileProps>();

  // Set Formik gender field - passed to gender Selector.
  const _handleSelectGender = (value: string) => {
    setFieldValue('gender.gender', value);
  };

  // Set Formik gender identities field - passed to gender identity Selector.
  const _handleSelectIdentity = (values: string[]) => {
    setFieldValue('gender.identities', values);
  };

  // Reset identities when new gender is selected.
  React.useEffect(() => {
    setFieldValue('gender.identities', []);
  }, [formikValues.gender.gender]);

  React.useEffect(() => {
    console.log(formikValues.gender);
  }, []);

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
            onSelect={_handleSelectGender}
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
              items={GenderIdentities[formikValues.gender?.gender]}
              value={formikValues.gender.identities}
              multiselect
              onSelect={_handleSelectIdentity}
            />
          </Animated.View>
        )}
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => props.navigation.goBack(),
          }}
          nextComponent={{
            onPress: () => props.navigation.navigate('Pronouns'),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default GenderScreen;
