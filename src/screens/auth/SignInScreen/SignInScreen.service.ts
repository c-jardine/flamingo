import { FormikValues } from 'formik';
import { signIn } from '../../../shared/services';

export const handleSignIn = async (values: FormikValues) => {
  await signIn(values);
};
