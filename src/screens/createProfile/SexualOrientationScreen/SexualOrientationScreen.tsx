import { useFormikContext } from 'formik';
import React from 'react';
import { ArrowNavigator } from '../../../components/common';
import Selector from '../../../components/form/Selector/Selector';
import { FormPageLayout } from '../../../components/layouts';
import { SexualOrientation } from '../../../constants/sexualOrientation';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { ProfileProps } from '../../../types/profile';
import { SexualOrientationScreenNavigationProp } from './SexualOrientationScreen.type';

const SexualOrientationScreen = (props: {
  navigation: SexualOrientationScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, errors, setFieldValue } = useFormikContext<ProfileProps>();

  const _handleSelectSexualOrientation = (values: string[]) => {
    setFieldValue('sexualOrientation', values);
  };

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Sexual orientation'
        description='You can choose up to three that describe you.'
      />

      <FormPageLayout.PageContent
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
      >
        <Selector
          items={SexualOrientation}
          value={values.sexualOrientation}
          multiselect
          onSelect={_handleSelectSexualOrientation}
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
