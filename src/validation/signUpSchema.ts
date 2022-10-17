import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid format').required('Required'),
  password: Yup.string().required('Required').min(8, 'Too short'),
  confirmPassword: Yup.string().required('Required').oneOf(
    [Yup.ref('password'), null],
    "Passwords don't match"
  ),
});
