import { useFormikContext } from 'formik';
import React from 'react';
import ArrowNavigator from '../../../components/core/ArrowNavigator/ArrowNavigator';
import ToggleList from '../../../components/core/ToggleList';
import FormPageLayout from '../../../components/layouts/FormPageLayout';
import { Pronouns } from '../../../constants/gender';
import { ThemeContext } from '../../../provider/ThemeProvider';
import { PronounsScreenNavigationProp } from './PronounsScreen.type';

const PronounsScreen = (props: {
  navigation: PronounsScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, errors, setFieldValue } = useFormikContext<any>();

  const handleToggle = (value: string) => {
    let arr = values.gender.identities || [];
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      arr.push(value);
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
        title='Declare your pronouns'
        description="It's optional, but helps keep the community more inclusive to our transgender and nonbinary friends."
      />

      <FormPageLayout.PageContent
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
      >
        <ToggleList
          data={Pronouns}
          handleToggle={handleToggle}
          contentContainerStyle={{ marginTop: theme.spacing.md }}
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
