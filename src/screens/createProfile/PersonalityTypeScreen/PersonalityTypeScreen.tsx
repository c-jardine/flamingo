import { useFormikContext } from 'formik';
import React from 'react';
import { ArrowNavigator } from '../../../components/common';
import { Selector } from '../../../components/form';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { PersonalityType } from '../../../shared/constants';
import { ProfileProps } from '../../../shared/types';
import { PersonalityTypeScreenNavigationProp } from './PersonalityTypeScreen.type';

const PersonalityTypeScreen = (props: {
  navigation: PersonalityTypeScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [selectedPersonality, setSelectedPersonality] = React.useState<
    string[]
  >([]);

  const { values, errors, setFieldValue } = useFormikContext<ProfileProps>();

  // Load initial values from context.
  React.useEffect(() => {
    setSelectedPersonality(values.personalityType as string[]);
  }, []);

  const _handleSelectPersonalityType = (value: string) => {
    const arr = [value];
    setSelectedPersonality(arr);
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
          onSelect={_handleSelectPersonalityType}
          selectedValues={selectedPersonality}
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
            onPress: () => props.navigation.navigate('PhotoUpload'),
            disabled: !!errors.personalityType || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default PersonalityTypeScreen;
