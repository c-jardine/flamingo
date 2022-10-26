import { Formik } from 'formik';
import React from 'react';
import { ProfileSchema } from '../../shared/schemas';
import { ProfileProps } from '../../shared/types';
import CreateProfileNavigator from './CreateProfileStack.navigator';

const CreateProfileStack = () => {
  const _createProfile = async () => {};

  return (
    <Formik
      validationSchema={ProfileSchema}
      initialValues={
        {
          firstName: '',
          lastName: '',
          dob: new Date(),
          gender: {
            gender: [],
            identities: [],
          },
          pronouns: [],
          sexualOrientation: [],
          personalityType: [],
          photos: [],
        } as ProfileProps
      }
      validateOnMount
      onSubmit={_createProfile}
    >
      <CreateProfileNavigator />
    </Formik>
  );
};

export default CreateProfileStack;
