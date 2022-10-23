import * as Yup from 'yup';
import { GenderIdentities, Genders } from '../../shared/constants/Gender';

export const CreateProfileStackSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too short').required('Required'),
  lastName: Yup.string().min(1, 'Too short'),
  dob: Yup.date(),
  gender: Yup.object().shape({
    gender: Yup.string()
      .oneOf([...Genders.map((gender) => gender.value)], 'Invalid selection')
      .required('Required'),
    identities: Yup.array()
      .when('gender.gender', {
        is: 'Man',
        then: Yup.string().oneOf([
          ...GenderIdentities.Man.map((gender) => gender.value),
        ]),
      })
      .when('gender.gender', {
        is: 'Woman',
        then: Yup.string().oneOf([
          ...GenderIdentities.Woman.map((gender) => gender.value),
        ]),
      })
      .when('gender.gender', {
        is: 'Nonbinary',
        then: Yup.string().oneOf([
          ...GenderIdentities.Nonbinary.map((gender) => gender.value),
        ]),
      }),
  }),
});
