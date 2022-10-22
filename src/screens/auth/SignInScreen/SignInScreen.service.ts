import { FormikValues } from 'formik';
import { signIn } from '../../../services/auth.service';
export const handleSignIn = async (values: FormikValues) => {
  await signIn(values);
};
