import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { ArrowNavigator } from '../../../components/common';
import TextInput from '../../../components/form/TextInput';
import TextInputError from '../../../components/form/TextInputError';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { ProfileProps } from '../../../types/profile';
import { PersonalInfoScreenNavigationProp } from './PersonalInfoScreen.type';

const PersonalInfoScreen = (props: {
  navigation: PersonalInfoScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, handleChange, errors, touched } =
    useFormikContext<ProfileProps>();

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title="What's your name?"
        description='Your first name is required, but feel free to add your last name as well.'
      />

      <FormPageLayout.PageContent
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
      >
        <TextInput
          placeholder='First name'
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          autoCorrect={false}
        />
        {errors.firstName && touched.firstName ? (
          <TextInputError>{errors.firstName}</TextInputError>
        ) : null}
        <View style={{ height: 16 }} />

        <TextInput
          placeholder='Last name'
          value={values.lastName}
          onChangeText={handleChange('lastName')}
          autoCorrect={false}
        />
        {errors.lastName && touched.lastName ? (
          <TextInputError>{errors.lastName}</TextInputError>
        ) : null}
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => props.navigation.goBack(),
          }}
          nextComponent={{
            onPress: () => props.navigation.navigate('Birthdate'),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default PersonalInfoScreen;
