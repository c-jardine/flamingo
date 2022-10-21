import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import ToggleList from '../../components/core/ToggleList';
import NewUserSetupLayout from '../../components/layouts/NewUserSetupLayout';
import { SexualOrientation } from '../../constants/sexualOrientation';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';
import { NewUserProps } from './NewUserSetup';

const SexualOrientationSetup = (props: NewProfileScreenNavigatorProps) => {
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
    <NewUserSetupLayout
      title='Sexual orientation'
      description='You can choose up to three that describe you.'
      handleBack={() => props.navigator(NewProfileScreenEnum.PRONOUNS)}
      handleNext={() => props.navigator(NewProfileScreenEnum.PERSONALITY_TYPE)}
      nextDisabled={!values.gender?.gender}
    >
      <View style={{ flex: 1 }}>
        <ToggleList
          data={SexualOrientation}
          handleToggle={handleToggle}
          contentContainerStyle={{ marginTop: theme.spacing.md }}
        />
      </View>
    </NewUserSetupLayout>
  );
};

export default SexualOrientationSetup;
