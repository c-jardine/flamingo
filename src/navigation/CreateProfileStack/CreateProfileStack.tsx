import { Formik } from 'formik';
import React from 'react';
import { ProfileProps } from '../../shared/types';
import CreateProfileNavigator from './CreateProfileStack.navigator';
import { CreateProfileStackSchema } from './CreateProfileStack.schema';

const CreateProfileStack = () => {
  const _createProfile = async () => {};

  return (
    <Formik
      validationSchema={CreateProfileStackSchema}
      initialValues={
        {
          firstName: '',
          lastName: '',
          dob: new Date(),
          gender: {
            gender: null,
            identities: [],
          },
          pronouns: [],
          sexualOrientation: [],
          personalityType: '',
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
