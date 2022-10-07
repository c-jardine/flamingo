import * as Yup from 'yup';

export const ProfileGeneralSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too short').required('Required'),
  lastName: Yup.string().min(1, 'Too short'),
  dob: Yup.string(),
});
