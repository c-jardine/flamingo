import { useFormikContext } from 'formik';
import React from 'react';
import { ArrowNavigator } from '../../../components/common';
import { Selector } from '../../../components/form';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { Pronouns } from '../../../shared/constants';
import { ProfileProps } from '../../../shared/types';
import { PronounsScreenNavigationProp } from './PronounsScreen.type';

const PronounsScreen = (props: {
  navigation: PronounsScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [selectedPronouns, setSelectedPronouns] = React.useState<string[]>([]);

  const { values, errors, setFieldValue } = useFormikContext<ProfileProps>();

  // Load initial values from context.
  React.useEffect(() => {
    setSelectedPronouns(values.pronouns as string[]);
  }, []);

  const _handleSelectPronouns = (value: string) => {
    const arr = [...selectedPronouns];
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      arr.push(value);
    }

    setSelectedPronouns(arr);
    setFieldValue('pronouns', arr);
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
          onSelect={_handleSelectPronouns}
          selectedValues={selectedPronouns}
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
            disabled: !!errors?.pronouns || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};

export default PronounsScreen;
