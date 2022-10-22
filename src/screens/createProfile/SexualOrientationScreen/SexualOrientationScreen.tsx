import { useFormikContext } from 'formik';
import React from 'react';
import ArrowNavigator from '../../../components/core/ArrowNavigator/ArrowNavigator';
import ToggleList from '../../../components/core/ToggleList';
import FormPageLayout from '../../../components/layouts/FormPageLayout';
import { SexualOrientation } from '../../../constants/sexualOrientation';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { SexualOrientationScreenNavigationProp } from './SexualOrientationScreen.type';

const SexualOrientationScreen = (props: {
  navigation: SexualOrientationScreenNavigationProp;
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
        title='Sexual orientation'
        description='You can choose up to three that describe you.'
      />

      <FormPageLayout.PageContent
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
      >
        <ToggleList
          data={SexualOrientation}
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
            onPress: () => props.navigation.navigate('PersonalityType'),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default SexualOrientationScreen;
