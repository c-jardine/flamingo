import { useFormikContext } from 'formik';
import React from 'react';
import { ArrowNavigator } from '../../../components/common';
import { Selector } from '../../../components/form';
import { FormPageLayout } from '../../../components/layouts';
import { Pronouns } from '../../../constants/gender';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { ProfileProps } from '../../../types/profile';
import { PronounsScreenNavigationProp } from './PronounsScreen.type';

const PronounsScreen = (props: {
  navigation: PronounsScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, errors, setFieldValue } = useFormikContext<ProfileProps>();

  const _handleSelectPronouns = (values: string[]) => {
    setFieldValue('pronouns', values);
  };

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Declare your pronouns'
        description="It's optional, but helps keep the community more inclusive to our transgender and nonbinary friends."
      />

      <FormPageLayout.PageContent
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
      >
        <Selector
          items={Pronouns}
          value={values.pronouns}
          multiselect
          onSelect={_handleSelectPronouns}
        />
      </FormPageLayout.PageContent>

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            // disabled: false,
            onPress: () => props.navigation.goBack(),
          }}
          nextComponent={{
            onPress: () => props.navigation.navigate('SexualOrientation'),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default PronounsScreen;
