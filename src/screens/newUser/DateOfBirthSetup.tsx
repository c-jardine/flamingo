import { intervalToDuration } from 'date-fns';
import { parse } from 'date-fns/esm';
import { useFormikContext } from 'formik';
import React from 'react';
import { MaskedTextInput } from 'react-native-mask-text';
import NewUserSetupLayout from '../../components/layouts/NewUserSetupLayout';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';
import { ProfileProps } from '../../types/core/profileProps';

const DateOfBirthSetup = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const [dob, setDob] = React.useState<string>('');
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const { setFieldValue } = useFormikContext();

  const handleSetDate = () => {
    if (dob.length === 10) {
      const birthDate = parse(dob, 'MM/dd/yyyy', new Date());
      const { years } = intervalToDuration({
        start: birthDate,
        end: new Date(),
      });

      years && years >= 18 && years <= 100
        ? setIsValid(true)
        : setIsValid(false);

      if (isValid) {
      }
    } else {
      setIsValid(false);
    }
  };

  React.useEffect(() => {
    handleSetDate();
  }, [dob]);

  React.useEffect(() => {
    const date = parse(dob, 'MM/dd/yyyy', new Date());
    setFieldValue('dob', date);
  }, [isValid]);

  const { values, errors, touched, handleSubmit } =
    useFormikContext<ProfileProps>();

  return (
    <NewUserSetupLayout
      title='When were you born?'
      description="Make sure it's right, you won't be able to change it later."
      handleNext={() => props.navigator(NewProfileScreenEnum.GENDER)}
      nextDisabled={!isValid}
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
    </NewUserSetupLayout>
  );
};
export default DateOfBirthSetup;
