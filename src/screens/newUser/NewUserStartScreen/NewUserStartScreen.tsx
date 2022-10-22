import React from 'react';
import ArrowNavigator from '../../../components/core/ArrowNavigator/ArrowNavigator';
import FormPageLayout from '../../../components/layouts/FormPageLayout';
import { NewProfileScreenEnum } from '../../../enums/NewProfileScreenEnum';
import { signOut } from '../../../services/auth.service';
import { NewProfileScreenNavigatorProps } from '../../../types/auth/NewProfileScreenProps';

const NewUserStartScreen = (props: NewProfileScreenNavigatorProps) => {
  return (
    <FormPageLayout>
      <FormPageLayout.PageHeader
        title='Set up your profile'
        description='Before using Flamingo, you need to finish setting up your profile. Click the next button to get started.'
      />

      <FormPageLayout.PageContent />

      {/* Footer */}
      <FormPageLayout.PageFooter>
        <ArrowNavigator
          backComponent={{
            disabled: false,
            onPress: () => signOut(),
          }}
          nextComponent={{
            onPress: () => props.navigator(NewProfileScreenEnum.PERSONAL_INFO),
            // disabled: !!errors?.email || !!errors?.password || false,
          }}
        />
      </FormPageLayout.PageFooter>
    </FormPageLayout>
  );
};
export default NewUserStartScreen;
