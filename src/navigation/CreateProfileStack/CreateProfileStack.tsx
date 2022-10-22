import { Formik } from 'formik';
import React from 'react';
import CreateProfileNavigator from './CreateProfileStack.navigator';
import { CreateProfileStackSchema } from './CreateProfileStack.schema';
import { CreateProfileProps } from './CreateProfileStack.type';

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
        } as CreateProfileProps
      }
      validateOnMount
      onSubmit={_createProfile}
    >
      <CreateProfileNavigator />
    </Formik>
  );
};

export default CreateProfileStack;
