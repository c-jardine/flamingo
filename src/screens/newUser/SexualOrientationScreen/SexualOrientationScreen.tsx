import { useFormikContext } from 'formik';
import React from 'react';
import ArrowNavigator from '../../../components/core/ArrowNavigator/ArrowNavigator';
import ToggleList from '../../../components/core/ToggleList';
import FormPageLayout from '../../../components/layouts/FormPageLayout';
import { SexualOrientation } from '../../../constants/sexualOrientation';
import { NewProfileScreenEnum } from '../../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../../types/auth/NewProfileScreenProps';
import { NewUserProps } from '../NewUserSetupScreen/NewUserSetupScreen';

const SexualOrientationScreen = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, errors, setFieldValue } = useFormikContext<NewUserProps>();

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
            onPress: () => props.navigator(NewProfileScreenEnum.PRONOUNS),
          }}
          nextComponent={{
            onPress: () =>
              props.navigator(NewProfileScreenEnum.PERSONALITY_TYPE),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default SexualOrientationScreen;
