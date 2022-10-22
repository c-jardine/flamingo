import { useFormikContext } from 'formik';
import React from 'react';
import { ArrowNavigator } from '../../../components/common';
import Selector from '../../../components/forms/Selector';
import { FormPageLayout } from '../../../components/layouts';
import { PersonalityType } from '../../../constants/PersonalityType';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { ProfileProps } from '../../../types/profile';
import { PersonalityTypeScreenNavigationProp } from './PersonalityTypeScreen.type';

const PersonalityTypeScreen = (props: {
  navigation: PersonalityTypeScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, errors, setFieldValue } = useFormikContext<ProfileProps>();

  const _handleSelectPersonalityType = (value: string) => {
    setFieldValue('personalityType', value);
  };

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Personality type'
        description='Which best describes you?'
      />

      <FormPageLayout.PageContent
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
      >
        <Selector
          items={PersonalityType}
          value={values.personalityType}
          multiselect
          onSelect={_handleSelectPersonalityType}
        />
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => props.navigation.goBack(),
          }}
          nextComponent={{
            onPress: () =>
              props.navigation.navigate('AuthNavigator', {
                screen: 'AuthScreen',
              }),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default PersonalityTypeScreen;