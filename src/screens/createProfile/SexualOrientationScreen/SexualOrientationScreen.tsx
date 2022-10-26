import { useFormikContext } from 'formik';
import React from 'react';
import { ArrowNavigator } from '../../../components/common';
import { Selector } from '../../../components/form';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { SexualOrientation } from '../../../shared/constants';
import { ProfileProps } from '../../../shared/types';
import { SexualOrientationScreenNavigationProp } from './SexualOrientationScreen.type';

const SexualOrientationScreen = (props: {
  navigation: SexualOrientationScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [selectedOrientation, setSelectedOrientation] = React.useState<
    string[]
  >([]);

  const { values, errors, setFieldValue } = useFormikContext<ProfileProps>();

  // Load initial values from context.
  React.useEffect(() => {
    setSelectedOrientation(values.sexualOrientation as string[]);
  }, []);

  const _handleSelectSexualOrientation = (value: string) => {
    const arr = [...selectedOrientation];
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      arr.push(value);
    }
    setSelectedOrientation(arr);
    setFieldValue('sexualOrientation', arr);
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
          onSelect={_handleSelectSexualOrientation}
          selectedValues={selectedOrientation}
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
            disabled: !!errors?.sexualOrientation || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default SexualOrientationScreen;
