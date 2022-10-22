import { FormikValues } from 'formik';
import { KToast } from '../../../components/utils/KToast';
import { signUp } from '../../../services/auth.service';

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
    KToast.error(error?.message);
  }
};
