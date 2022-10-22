import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid format').required('Required'),
  password: Yup.string().min(8, 'Too short'),
});
