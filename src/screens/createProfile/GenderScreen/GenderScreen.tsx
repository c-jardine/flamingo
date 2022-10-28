import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ArrowNavigator, Header } from '../../../components/common';
import { Selector } from '../../../components/form';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { GenderIdentities, Genders } from '../../../shared/constants';
import { ProfileProps } from '../../../shared/types';
import { GenderScreenNavigationProp } from './GenderScreen.type';

const GenderScreen = (props: { navigation: GenderScreenNavigationProp }) => {
  const { theme } = React.useContext(ThemeContext);
  const [selectedGender, setSelectedGender] = React.useState<string[]>([]);
  const [selectedIdentities, setSelectedIdentities] = React.useState<string[]>(
    []
  );

  const { values, setFieldValue, errors } = useFormikContext<ProfileProps>();

  // Load initial values from context.
  React.useEffect(() => {
    setSelectedGender(values.gender.gender);
    setSelectedIdentities(values.gender.identities);
  }, []);

  // Set Formik gender field - passed to gender Selector.
  const _handleSelectGender = (value: string) => {
    const arr = [value];
    setSelectedGender(arr);
    setSelectedIdentities([]);
    setFieldValue('gender.gender', arr);
    setFieldValue('gender.identities', []);
  };

  // Set Formik gender identities field - passed to gender identity Selector.
  const _handleSelectIdentity = (value: string) => {
    const arr = [...selectedIdentities];
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      arr.push(value);
    }
    setSelectedIdentities(arr);
    setFieldValue('gender.identities', arr);
  };

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
            selectedValues={selectedGender}
            horizontal
          />
        </View>
        {!!values.gender.gender.length && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={{
              flex: 1,
              paddingHorizontal: theme.spacing.md,
              marginTop: theme.spacing.md,
            }}
          >
            <Header>
              <Header.Title>Want to be more specific?</Header.Title>
              <Header.Description>
                We strive to be inclusive. Please reach out if you feel we're
                missing something.
              </Header.Description>
              <Header.Description>(optional)</Header.Description>
            </Header>
            <View style={{ height: theme.spacing.md }} />
            <Selector
              items={
                Object.entries(GenderIdentities)
                  .filter(([key]) => key === values.gender.gender.toString())
                  .map((v) => v[1])[0]
              }
              onSelect={_handleSelectIdentity}
              selectedValues={selectedIdentities}
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
            disabled:
              !!errors.gender?.gender || !!errors.gender?.identities || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default GenderScreen;
