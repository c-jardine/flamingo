import { useFormikContext } from 'formik';
import React from 'react';
import ArrowNavigator from '../../../components/core/ArrowNavigator/ArrowNavigator';
import ToggleList from '../../../components/core/ToggleList';
import FormPageLayout from '../../../components/layouts/FormPageLayout';
import { PersonalityType } from '../../../constants/personalityType';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { PersonalityTypeScreenNavigationProp } from './PersonalityTypeScreen.type';

const PersonalityTypeScreen = (props: {
  navigation: PersonalityTypeScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, errors, setFieldValue } = useFormikContext<any>();

  const handleToggle = (value: string) => {
    let arr = values.gender.identities || [];
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      if (arr.length < 3) {
        arr.push(value);
      }
    }
    setFieldValue('gender.identities', arr);
  };

  React.useEffect(() => {
    setFieldValue('gender.identities', []);
    console.log(errors.gender);
  }, [values.gender.gender]);

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Personality type'
        description='Which best describes you?'
      />

      <FormPageLayout.PageContent
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
      >
        <ToggleList
          data={PersonalityType}
          handleToggle={handleToggle}
          contentContainerStyle={{ marginTop: theme.spacing.md }}
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
