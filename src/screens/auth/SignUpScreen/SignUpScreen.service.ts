import { FormikValues } from 'formik';
import { Toast } from '../../../components/common';
import { signUp } from '../../../shared/services';

export const sendVerificationEmail = async (
  values: FormikValues,
  cb: () => void
) => {
  try {
    const res = await signUp(values);

    if (res) {
      return cb();
    }
  } catch (error) {
    Toast.error(error?.message);
  }
};
