import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { ArrowNavigator, IconButton } from '../../../components/common';
import { TextInput, TextInputError } from '../../../components/form';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { signOut } from '../../../shared/services';
import { ProfileProps } from '../../../shared/types';
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
            render: (
              <View
                style={{
                  transform: [{ rotate: '180deg' }],
                }}
              >
                <IconButton
                  iconProps={{
                    name: 'logout-variant',
                    onPress: () => signOut(),
                  }}
                  contentContainerStyle={{
                    backgroundColor: theme.colors.text[50],
                  }}
                />
              </View>
            ),
          }}
          nextComponent={{
            onPress: () => props.navigation.navigate('Birthdate'),
            disabled: !!errors?.firstName || !!errors?.lastName || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default PersonalInfoScreen;
