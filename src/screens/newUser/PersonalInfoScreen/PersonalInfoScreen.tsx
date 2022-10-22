import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import ArrowNavigator from '../../../components/core/ArrowNavigator/ArrowNavigator';
import TextInput from '../../../components/forms/TextInput';
import TextInputError from '../../../components/forms/TextInputError';
import FormPageLayout from '../../../components/layouts/FormPageLayout';
import { NewProfileScreenEnum } from '../../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../../types/auth/NewProfileScreenProps';

const PersonalInfoScreen = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, handleChange, errors, touched } = useFormikContext<{
    firstName: string;
    lastName: string;
  }>();
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
            onPress: () => props.navigator(NewProfileScreenEnum.START),
          }}
          nextComponent={{
            onPress: () => props.navigator(NewProfileScreenEnum.DATE_OF_BIRTH),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default PersonalInfoScreen;
