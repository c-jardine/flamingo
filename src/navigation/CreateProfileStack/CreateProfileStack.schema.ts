import { intervalToDuration, isFuture } from 'date-fns';
import * as Yup from 'yup';
import {
  GenderIdentities,
  Genders,
  Pronouns,
} from '../../shared/constants/Gender';
import { PersonalityType } from '../../shared/constants/PersonalityType';
import { SexualOrientation } from '../../shared/constants/SexualOrientation';

export const CreateProfileStackSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too short').required('Required'),

  lastName: Yup.string().min(1, 'Too short'),

  dob: Yup.date().test('dob', 'Must be at least 18 years old', (value): any => {
    if (value && value && isFuture(value)) {
      return false;
    }
    const { years } = intervalToDuration({
      start: value as Date,
      end: new Date(),
    });
    if (years) {
      return years && years >= 18 && years <= 100;
    }
    return false;
  }),

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

  pronouns: Yup.array()
    .of(Yup.string())
    .test('pronouns', 'Invalid selection', (values: string[]) => {
      const arr = Pronouns.map((pronoun) => pronoun.value);
      return values.some((item) => arr.includes(item));
    })
    .max(2),

  sexualOrientation: Yup.array()
    .of(Yup.string())
    .test('sexualOrientation', 'Invalid selection', (values: string[]) => {
      const arr = SexualOrientation.map((orientation) => orientation.value);
      return values.some((item) => arr.includes(item)) || values.length === 0;
    })
    .max(3),

  personalityType: Yup.array()
    .of(Yup.string())
    .test('personalityType', 'Invalid selection', (values: string[]) => {
      const arr = PersonalityType.map((type) => type.value);
      return values.some((item) => arr.includes(item)) || values.length === 0;
    })
    .max(3),

  photos: Yup.array().of(Yup.string()),
});
