import * as Yup from 'yup';
import { GenderIdentities, Genders } from '../constants/gender';

export const ProfileGeneralSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too short').required('Required'),
  lastName: Yup.string().min(1, 'Too short'),
  dob: Yup.string(),
});

export const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too short').required('Required'),
  lastName: Yup.string().min(1, 'Too short'),
  dob: Yup.date(),
  gender: Yup.object().shape({
    gender: Yup.string()
      .oneOf([...Genders.map((gender) => gender.label)], 'Invalid selection')
      .required('Required'),
    identities: Yup.array()
      .when('gender.gender', {
        is: 'Man',
        then: Yup.string().oneOf([
          ...GenderIdentities.Man.map((gender) => gender.label),
        ]),
      })
      .when('gender.gender', {
        is: 'Woman',
        then: Yup.string().oneOf([
          ...GenderIdentities.Woman.map((gender) => gender.label),
        ]),
      })
      .when('gender.gender', {
        is: 'Nonbinary',
        then: Yup.string().oneOf([
          ...GenderIdentities.Nonbinary.map((gender) => gender.label),
        ]),
      }),
  }),
});
