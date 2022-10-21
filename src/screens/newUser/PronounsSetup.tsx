import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import ToggleList from '../../components/core/ToggleList';
import NewUserSetupLayout from '../../components/layouts/NewUserSetupLayout';
import { Pronouns } from '../../constants/gender';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';
import { NewUserProps } from './NewUserSetup';

const PronounsSetup = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  const { values, errors, setFieldValue } = useFormikContext<NewUserProps>();

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
    <NewUserSetupLayout
      title='Declare your pronouns'
      description="It's optional, but helps keep the community more inclusive to our transgender and nonbinary friends."
      handleBack={() => props.navigator(NewProfileScreenEnum.GENDER)}
      handleNext={() =>
        props.navigator(NewProfileScreenEnum.SEXUAL_ORIENTATION)
      }
      nextDisabled={!values.gender?.gender}
    >
      <View style={{ flex: 1 }}>
        <ToggleList
          data={Pronouns}
          handleToggle={handleToggle}
          contentContainerStyle={{ marginTop: theme.spacing.md }}
        />
      </View>
    </NewUserSetupLayout>
  );
};

export default PronounsSetup;
