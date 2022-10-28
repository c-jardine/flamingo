import { format, intervalToDuration } from 'date-fns';
import { parse } from 'date-fns/esm';
import { useFormikContext } from 'formik';
import React from 'react';
import { MaskedTextInput } from 'react-native-mask-text';
import { ArrowNavigator } from '../../../components/common';
import { FormPageLayout } from '../../../components/layouts';
import { ThemeContext } from '../../../providers';
import { ProfileProps } from '../../../shared/types';
import { BirthdateScreenNavigationProp } from './BirthdateScreen.type';

const BirthdateScreen = (props: {
  navigation: BirthdateScreenNavigationProp;
}) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, errors, touched, handleSubmit, setFieldValue } =
    useFormikContext<ProfileProps>();

  const [dob, setDob] = React.useState<string>('');

  const _handleSetDate = () => {
    try {
      if (dob.length === 10) {
        const birthDate = parse(dob, 'MM/dd/yyyy', new Date());
        const { years } = intervalToDuration({
          start: birthDate,
          end: new Date(),
        });

        const isValid = years && years >= 18 && years <= 100;
        if (isValid) {
          const date = parse(dob, 'MM/dd/yyyy', new Date());
          setFieldValue('dob', date);
        } else {
          // Reset to null when invalid
          setFieldValue('dob', null);
        }
      } else {
        // Reset to null when invalid
        setFieldValue('dob', null);
      }
    } catch (error) {
      console.log(error);
      setFieldValue('dob', null);
    }
  };

  React.useEffect(() => {
    _handleSetDate();
  }, [dob]);

  React.useEffect(() => {
    values.dob && setDob(format(values.dob, 'MM/dd/yyyy'));
  }, []);

  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='When were you born?'
        description="Make sure it's right, you won't be able to change it later."
      />

      <FormPageLayout.PageContent
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
      >
        <MaskedTextInput
          placeholder='MM / DD / YYYY'
          type='date'
          options={{
            dateFormat: 'MM/DD/YYYY',
          }}
          mask='MM/DD/YYYY'
          value={dob}
          onChangeText={setDob}
          style={{
            backgroundColor: theme.colors.text['50'],
            borderRadius: 16,
            overflow: 'hidden',
            color: theme.colors.text['800'],
            padding: 16,
            paddingLeft: 16,
          }}
          keyboardType='number-pad'
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
            onPress: () => props.navigation.navigate('Gender'),
            disabled: !!errors?.dob || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};
export default BirthdateScreen;
