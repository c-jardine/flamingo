import React from 'react';
import NewUserSetupLayout from '../../components/layouts/NewUserSetupLayout';
import { NewProfileScreenEnum } from '../../enums/NewProfileScreenEnum';
import { ThemeContext } from '../../provider/ThemeProvider';
import { signOut } from '../../services/auth.service';
import { NewProfileScreenNavigatorProps } from '../../types/auth/NewProfileScreenProps';

const NewProfileStart = (props: NewProfileScreenNavigatorProps) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <NewUserSetupLayout
      title='Set up your profile'
      description='Before using Flamingo, you need to finish setting up your profile. Click the next button to get started.'
      handleBack={() => signOut()}
      handleNext={() => props.navigator(NewProfileScreenEnum.PERSONAL_INFO)}
      nextDisabled={false}
    />
  );
};
export default NewProfileStart;
