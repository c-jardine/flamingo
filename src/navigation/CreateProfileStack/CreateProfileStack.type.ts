import { Buffer } from 'buffer';

export type CreateProfileStackParams = {
  Info: undefined;
  PersonalInfo: undefined;
  Birthdate: undefined;
  Gender: undefined;
  Pronouns: undefined;
  SexualOrientation: undefined;
  PersonalityType: undefined;
  IdVerification: undefined;
  PhotoVerification: { sourceImage: Buffer | null };
};
