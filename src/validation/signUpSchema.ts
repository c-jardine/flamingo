import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid format').required('Required'),
  password: Yup.string().min(8, 'Too short'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    "Passwords don't match"
  ),
});
